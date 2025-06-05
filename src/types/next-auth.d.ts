import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "USER" | "ADMIN"
      name: string
      email: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: "USER" | "ADMIN"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: "USER" | "ADMIN"
  }
}