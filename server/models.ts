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
      daysTillWatering: 0,
    },
  });
}

export async function getPlant(id) {
  const plant = await prisma.plants.findUnique({
    where: {
      id: id,
    },
  });
  return plant;
}

export async function getAllPlants() {
  const plants = await prisma.plants.findMany({
    orderBy: [
      {
        plantName: "asc",
      },
    ],
  });
  return plants;
}

export async function updateWaterDays(
  id,
  daysSinceWatered,
  daysTillWatering,
  wateredToday
) {
  const plant = await prisma.plants.update({
    where: {
      id: id,
    },
    data: {
      daysSinceWatered: daysSinceWatered,
      daysTillWatering: daysTillWatering,
      wateredToday: wateredToday,
    },
  });
  console.log("updated plant in update water days model: ", plant);
  return plant;
}

export async function updateWatered(
  id,
  wateredToday,
  daysSinceWatered,
  daysTillWatering,
  lastWatered
) {
  const plant = await prisma.plants.update({
    where: {
      id: id,
    },
    data: {
      wateredToday: wateredToday,
      daysSinceWatered: daysSinceWatered,
      daysTillWatering: daysTillWatering,
      lastWatered: lastWatered,
    },
  });
  console.log("updated plant in update watered model: ", plant);
  return plant;
}
