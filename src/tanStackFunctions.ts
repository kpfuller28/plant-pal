import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePlants() {
  return useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      const { data } = await axios.get("/getPlants");

      return data.map((plant) => {
        const now = new Date();
        const last = new Date(plant.lastWatered);
        const diffInMill = now.getTime() - last.getTime();
        const diffInDays = Math.floor(diffInMill / (1000 * 60 * 60 * 24));

        return {
          ...plant,
          daysSinceWatered: diffInDays,
          daysTillWatering: plant.wateringFreq - diffInDays,
          wateredToday: diffInDays === 0,
        };
      });
    },
  });
}
