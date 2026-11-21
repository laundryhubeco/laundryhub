import { createFileRoute } from '@tanstack/react-router'

import { checkDbHealth } from '@/lib/api/server-fns'

export const Route = createFileRoute('/')({
  loader: async () => await checkDbHealth(),
  component: Home,
})

function Home() {
  const health = Route.useLoaderData()

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-2xl font-bold">LaundryHub</h1>

      <p className="mt-4">
        {health.ok
          ? 'Database connected successfully!'
          : `Connection error: ${health.message}`}
      </p>

      {health.ok && health.services.length > 0 && (
        <ul className="mt-4 list-disc pl-5">
          {health.services.map((service) => (
            <li key={service.id}>{service.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
