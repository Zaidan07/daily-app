import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl

      // Harus login
      if (!token) return false

      // Cek akses ke /admin -> hanya untuk ADMIN
      if (pathname.startsWith("/admin")) {
        return token.role === "ADMIN"
      }

      // Untuk halaman lain (dashboard), cukup asal login
      return true
    },
  },
})

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
