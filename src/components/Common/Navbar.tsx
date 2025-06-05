'use client'

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="w-full px-6 py-4 border-b shadow-sm flex justify-between items-center bg-white">
      <div className="text-xl font-bold">Thousand Dream</div>

      {session?.user ? (
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:underline">Daily</Link>
          <Link href="/profile" className="text-sm font-medium hover:underline">Profile</Link>
          <Button variant="outline" onClick={() => signOut()}>Logout</Button>
        </div>
      ) : (
        <Link href="/login" className="text-sm font-medium hover:underline">Login</Link>
      )}
    </nav>
  )
}
