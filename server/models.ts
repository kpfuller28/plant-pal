import { prisma } from "./prisma.server";

export async function addPlant(name: string, frequency: string) {
  console.log("i run");
  await prisma.plants.create({
    data: {
      plantName: name,
      wateringFreq: Number(frequency),
      lastWatered: new Date(),
      daysSinceWatered: 0,
      wateredToday: true,
    },
  });
}
