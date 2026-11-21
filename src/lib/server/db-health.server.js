import { sql } from 'drizzle-orm'

import { db } from '../../../db/index.js'
import { services } from '../../../db/schema/services.js'

/**
 * Cek koneksi database lewat Drizzle + Postgres (server-side).
 *
 * Error lengkap (termasuk host) hanya dicatat ke log server agar tidak
 * membocorkan informasi internal ke browser. Respons ke klien selalu
 * pesan generik.
 */
export async function getDbHealth() {
  try {
    const result = await db.execute(sql`
      SELECT current_database() AS database_name, now() AS server_time
    `)

    const rows = await db
      .select({
        id: services.id,
        name: services.name,
        unit: services.unit,
        price: services.price,
      })
      .from(services)
      .limit(5)

    const meta = result[0] ?? {}

    return {
      ok: true,
      databaseName: meta.database_name ?? null,
      serverTime: meta.server_time ?? null,
      services: rows,
    }
  } catch (error) {
    console.error('[db-health] Koneksi database gagal:', error)
    return {
      ok: false,
      message: 'Gagal terhubung ke database',
      services: [],
    }
  }
}
