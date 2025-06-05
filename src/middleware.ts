import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl


      if (!token) return false


      if (pathname.startsWith("/admin")) {
        return token.role === "ADMIN"
      }

      return true
    },
  },
})

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/user/:path*"],
}
