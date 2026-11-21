import { createFileRoute } from '@tanstack/react-router'

import { getDbHealth } from '@/lib/server/db-health.server'

/**
 * Endpoint tes koneksi database untuk pemeriksaan pasca-deploy.
 *
 * Sengaja memakai handler route (bukan createServerFn): pemanggilnya
 * browser/Postman/cron yang hanya butuh JSON bersih, tanpa konteks RPC
 * router. Respons tidak pernah memuat connection string, password, atau
 * error detail database.
 */
export const Route = createFileRoute('/api/health')({
  server: {
    handlers: {
      GET: async () => {
        const health = await getDbHealth()

        if (!health.ok) {
          return Response.json(
            { status: 'error', message: health.message },
            { status: 503 },
          )
        }

        return Response.json({
          status: 'success',
          message: 'LaundryHub API is running',
          database: 'connected',
          serverTime: health.serverTime,
        })
      },
    },
  },
})
