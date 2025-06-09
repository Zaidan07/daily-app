"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  CalendarCheck2,
  Trophy,
} from "lucide-react"

export default function SidebarAdmin() {
  const pathname = usePathname()

  const menu = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Leaderboard", href: "/admin/leaderboard", icon: <Trophy className="w-4 h-4" /> },
    { name: "Daily", href: "/admin/daily", icon: <CalendarCheck2 className="w-4 h-4" /> },
  ]

  return (
    <aside className="w-64 bg-white border-r h-full p-4">
      <div className="text-2xl font-bold mb-6">Admin</div>
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-gray-100 text-black"
                : "text-gray-600 hover:bg-gray-50 hover:text-black"
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
