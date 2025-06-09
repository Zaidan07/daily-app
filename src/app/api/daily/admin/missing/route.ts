import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { startOfDay, endOfDay } from "date-fns"
import { Role } from "@prisma/client"

export async function GET() {
  const todayStart = startOfDay(new Date())
  const todayEnd = endOfDay(new Date())

  // Ambil user ID yang sudah isi daily hari ini
  const dailiesToday = await prisma.daily.findMany({
    where: {
      createdAt: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
    select: {
      userId: true,
    },
  })

  const userIdsFilled = dailiesToday.map((entry) => entry.userId)

  // Ambil user (bukan admin) yang belum isi
  const usersNotFilled = await prisma.user.findMany({
    where: {
      id: {
        notIn: userIdsFilled,
      },
      role: Role.USER, // hanya role user
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  return NextResponse.json(usersNotFilled)
}
