import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.businessSetting.deleteMany()
  await prisma.review.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.service.deleteMany()
  await prisma.barber.deleteMany()

  await prisma.businessSetting.createMany({
    data: [
      { key: "brand_name", value: "KRAL BARBER" },
      { key: "working_hours", value: "Hər gün: 09:00 – 21:00" },
    ],
  })

  const sac = await prisma.service.create({
    data: { name: "Saç Kəsimi", price: 20, duration: 30, category: "Hair" },
  })
  const saqqal = await prisma.service.create({
    data: { name: "Saqqal Təraşı", price: 10, duration: 20, category: "Beard" },
  })

  await prisma.barber.createMany({
    data: [
      { name: "Ustad Əli", specialty: "Saç və Stil Eksperti", image: "/images/barber-1.png" },
      { name: "Kənan Usta", specialty: "Saqqal və Royal Shave", image: "/images/barber-2.png" },
    ],
  })

  console.log('Seed data hazırlandı!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
