import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10)

  await prisma.user.upsert({
    where: { email: "admin@thousanddream.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@thousanddream.com",
      password: hashedPassword,
      role: "ADMIN", 
    },
  })
}

main()
  .then(() => {
    console.log("✅ Admin user created.")
    return prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    return prisma.$disconnect()
  })
