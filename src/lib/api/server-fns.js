import { createServerFn } from '@tanstack/react-start'

import { getDbHealth } from '@/lib/server/db-health.server'

/**
 * Server function tes koneksi database.
 *
 * Dipanggil dari loader route maupun komponen client — logikanya selalu
 * berjalan di server, jadi driver database tidak pernah masuk bundle
 * browser.
 */
export const checkDbHealth = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await getDbHealth()
  },
)
