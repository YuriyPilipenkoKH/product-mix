import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const users = [
    { email: 'admin@example.com', password: hashedPassword, role: 'admin' },
    { email: 'manager@example.com', password: hashedPassword, role: 'manager' },
    { email: 'user@example.com', password: hashedPassword, role: 'user' },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    })
  }

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })