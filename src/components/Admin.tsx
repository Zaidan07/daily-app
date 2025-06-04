import { getAllDailies } from "@/lib/actions/getAllDailies"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminDashboardPage() {
  const dailies = await getAllDailies()

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>

      {dailies.length === 0 && <p>Tidak ada data daily.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dailies.map((daily) => (
          <Card key={daily.id}>
            <CardHeader>
              <CardTitle>{daily.user.name} ({daily.user.email})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                Tanggal: {new Date(daily.createdAt).toLocaleString("id-ID")}
              </p>
              <p>{daily.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}