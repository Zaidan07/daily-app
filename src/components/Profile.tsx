import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <pre className="bg-muted p-4 rounded-md text-sm">
        {JSON.stringify(session?.user, null, 2)}
      </pre>
    </div>
  )
}
