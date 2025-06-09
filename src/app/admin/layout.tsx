import { ReactNode } from "react"
import Navbar from "@/components/Common/Navbar"
import SidebarAdmin from "@/components/Common/Sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}
