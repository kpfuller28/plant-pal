// todo
// refactor useffect into using tanstack query
// possibly folder or file full of tanstack functions
// refactor server code to handle calculations
// add undo functionality
// add datetime option to form for when plant was last watered
// potentially refactr server and/or db code to better handle last/next watering calcs

import axios from "axios";
import { useState } from "react";
import { usePlants } from "../tanStackFunctions";

export default function PlantForm() {
  const { data: plantList = [], isLoading, isError } = usePlants();
  const [clientWateredToday, setClientWateredToday] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // const [plantList, setPlantList] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("/getPlants")
  //     .then((response) => {
  //       for (const plant of response.data) {
  //         const now = new Date();
  //         const last = new Date(plant.lastWatered);
  //         const diffInMill = now.getTime() - last.getTime();
  //         const diffInDays = Math.floor(diffInMill / (1000 * 60 * 60 * 24));
  //         const daysUntil = plant.wateringFreq - diffInDays;
  //         const watered = diffInDays === 0 ? true : false;
  //         if (diffInDays !== plant.daysSinceWatered) {
  //           axios
  //             .put("/updateWaterDays", {
  //               id: plant.id,
  //               daysSinceWatered: diffInDays,
  //               daysTillWatering: daysUntil,
  //               wateredToday: watered,
  //             })
  //             .catch((error) => {
  //               console.log("error in axios put: ", error);
  //             });
  //         }
  //       }
  //     })
  //     .then(() => {
  //       axios.get("/getPlants").then((response) => {
  //         setPlantList(response.data);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("error in axios get plants 1: ", error);
  //     });
  // }, [clientWateredToday, submitted]);

  const [formData, setFormData] = useState({
    plantName: "",
    daysToWater: "",
  });

  function submitPlant(event) {
    event.preventDefault();
    axios
      .post("/addPlant", formData)
      .then(() => {
        setSubmitted(!submitted);
      })
      .catch(function (error) {
        console.log(error);
      });
    setFormData((prevState) => ({
      ...prevState,
      plantName: "",
      daysToWater: "",
    }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const watered = (plant) => {
    if (!plant.wateredToday) {
      axios
        .put("/updateWatered", {
          id: plant.id,
          wateredToday: true,
          daysSinceWatered: 0,
          daysTillWatering: plant.wateringFreq,
          lastWatered: new Date(),
        })
        .then(() => {
          setClientWateredToday(!clientWateredToday);
        })
        .catch((error) => {
          console.log("error in axios put update watered: ", error);
        });
    } else {
      console.log("to fix");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching plants</div>;
  return (
    <div className="mt-8 mx-auto max-w-3xl">
      {/* Add Plant Form */}
      <form
        onSubmit={submitPlant}
        className="max-w-md grid grid-cols-2 gap-4 bg-gradient-to-br from-primary to-secondary rounded-md shadow-lg shadow-black/60 p-6  border-shadow"
      >
        <div className="relative z-0 w-full group">
          <input
            required
            placeholder=""
            type="text"
            id="plantName"
            name="plantName"
            value={formData.plantName}
            onChange={handleChange}
            className="block w-full rounded-sm border-shadow bg-transparent border-0 border-b-2 border-background appearance-none px-3
          text-text focus:outline-none focus:ring-0 dark:focus:border-accent focus:border-secondary pt-4
                      peer"
          />
          <label
            htmlFor="plantName"
            className="peer-focus:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] peer-focus:font-medium absolute text-sm text-text duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary dark:peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Plant Name
          </label>
        </div>
        <div className="relative z-0 w-full group">
          <input
            required
            placeholder=""
            type="number"
            min={0}
            id="daysToWater"
            name="daysToWater"
            value={formData.daysToWater}
            onChange={handleChange}
            className="block w-full rounded-sm border-shadow bg-transparent border-0 border-b-2 border-background appearance-none px-3
          text-text focus:outline-none focus:ring-0 dark:focus:border-accent focus:border-secondary pt-4
                      peer"
          />
          <label
            htmlFor="daysToWater"
            className="peer-focus:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] peer-focus:font-medium absolute text-sm text-text duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary dark:peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Watering Frequency (Days)
          </label>
        </div>
        <div className="flex justify-center col-span-2">
          <button
            type="submit"
            className="w-auto rounded-md bg-secondary shadow-md shadow-black/50 hover:shadow-black/80 px-4 py-2 font-bold text-text dark:text-background
          dark:hover:brightness-90 hover:brightness-110 hover:scale-[1.03] transition duration-150 active:scale-95"
          >
            Add Plant
          </button>
        </div>
      </form>

      {plantList.length > 0 ? (
        <>
          <h2 className="text-center bg-primary text-text text-lg font-semibold mt-4 px-3 max-w-md py-1 rounded-sm shadow-md shadow-black/60 mb-4">
            Your Plants
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plantList.map((plant) => {
              const days = plant.wateringFreq === 1 ? "day" : "days";
              const checkBoxId = `watered-${plant.id}`;
              return (
                <div
                  key={plant.id || index}
                  className="relative rounded-md bg-gradient-to-tl dark:bg-gradient-to-br from-primary to-primary/80 p-5 shadow-md shadow-black/60 hover:shadow-lg hover:shadow-black/80 transition-transform hover:scale-[1.02] flex flex-col gap-3"
                >
                  {/* Badge (watered status) */}
                  <div
                    className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      plant.wateredToday
                        ? "bg-lime-600 text-background" // watered = ochre badge
                        : "bg-red-600 text-background" // not watered = accent badge
                    }`}
                  >
                    {plant.wateredToday ? "✓" : "💧"}
                  </div>

                  {/* Plant Name */}
                  <h3 className="text-xl font-extrabold text-accent">
                    {plant.plantName}
                  </h3>

                  {/* Watering Info */}
                  <div className="text-sm text-text space-y-1">
                    <p>
                      Water every {plant.wateringFreq} {days}
                    </p>
                    <p>Days since last watering: {plant.daysSinceWatered}</p>
                    <p>Days until next watering: {plant.daysTillWatering}</p>
                  </div>

                  {/* Watered Toggle */}
                  <label
                    htmlFor={checkBoxId}
                    className="mt-2 flex items-center gap-2 text-sm font-medium text-text"
                  >
                    <input
                      type="checkbox"
                      id={checkBoxId}
                      name="watered"
                      checked={plant.wateredToday}
                      onChange={() => watered(plant)}
                      className="h-4 w-4 rounded border-background text-text focus:ring-background transition-transform hover:scale-[1.02]"
                    />
                    Mark as watered
                  </label>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
