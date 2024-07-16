import axios from "axios";
import { useEffect, useState } from "react";

export default function PlantForm() {
  const [clientWateredToday, setClientWateredToday] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [plantList, setPlantList] = useState([]);
  useEffect(() => {
    axios
      .get("/getPlants")
      .then((response) => {
        console.log("axios get plants: ", response.data);
        for (const plant of response.data) {
          const now = new Date();
          const last = new Date(plant.lastWatered);
          const diffInMill = now.getTime() - last.getTime();
          const diffInDays = Math.floor(diffInMill / (1000 * 60 * 60 * 24));
          const daysUntil = plant.wateringFreq - diffInDays;
          const watered = diffInDays === 0 ? true : false;
          if (diffInDays !== plant.daysSinceWatered) {
            axios
              .put("/updateWaterDays", {
                id: plant.id,
                daysSinceWatered: diffInDays,
                daysTillWatering: daysUntil,
                wateredToday: watered,
              })
              .then((response) => {
                console.log("put response: ", response);
                axios
                  .get("/getPlant", { params: { id: plant.id } })
                  .then((response) => {
                    console.log("single plant: ", response.data);
                    setPlantList((prevState) => {
                      [...prevState, response.data];
                    });
                  });
              })
              .catch((error) => {
                console.log("error in axios put: ", error);
              });
          } else {
            axios
              .get("/getPlant", { params: { id: plant.id } })
              .then((response) => {
                console.log("single plant: ", response.data);
                setPlantList((prevState) => {
                  [...prevState, response.data];
                });
              });
          }
        }
      })
      .catch((error) => {
        console.log("error in axios get plants 1: ", error);
      });
    // axios
    //   .get("/getPlants")
    //   .then((response) => {
    //     console.log("post update get: ", response.data);
    //     setPlantList(response.data);
    //   })
    //   .catch((error) => {
    //     console.log("error in axios get plants 2: ", error);
    //   });
  }, [clientWateredToday, submitted]);

  const [formData, setFormData] = useState({
    plantName: "",
    daysToWater: "",
  });

  function submitPlant(event) {
    event.preventDefault();
    console.log("FORM DATA: ", formData);
    axios
      .post("http://localhost:3000/addPlant", formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setSubmitted(!submitted);
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
    let clientDaysSinceWatered;
    let clientWateredToday;
    if (!plant.wateredToday) {
      clientDaysSinceWatered = 0;
      clientWateredToday = true;
      axios
        .put("/updateWatered", {
          id: plant.id,
          wateredToday: clientWateredToday,
          daysSinceWatered: clientDaysSinceWatered,
          daysTillWatering: plant.wateringFreq,
          lastWatered: new Date(),
        })
        .then((response) => {
          console.log("axios put response update watered: ", response);
        })
        .catch((error) => {
          console.log("error in axios put update watered: ", error);
        });
    } else {
      console.log("to fix");
    }
    setClientWateredToday(!clientWateredToday);
  };

  return (
    <div>
      <form onSubmit={submitPlant}>
        <label htmlFor="plantName">Plant Name: </label>
        <input
          required
          placeholder="Plant Name Here..."
          type="text"
          id="plantName"
          name="plantName"
          value={formData.plantName}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <br></br>
        <br></br>
        <label htmlFor="daysToWater">Watering Frequency &#40;Days&#41;: </label>
        <input
          required
          placeholder="How often to water..."
          type="number"
          min={0}
          id="daysToWater"
          name="daysToWater"
          value={formData.daysToWater}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <button type="submit">Add Plant</button>
      </form>
      {plantList.length > 0 ? (
        <div>
          <br></br>
          Your Plants
          {plantList.map((plant) => {
            const days = plant.wateringFreq === 1 ? "day" : "days";
            return (
              <div key={plantList.indexOf(plant)}>
                <br></br>
                <div>Plant Name: {plant.plantName}</div>
                <div>
                  Water every {plant.wateringFreq} {days}
                </div>
                <div>Days since last watering: {plant.daysSinceWatered}</div>
                <div>Days until next watering: {plant.daysTillWatering}</div>
                <label htmlFor="watered">Have I been watered today?</label>
                <input
                  type="checkbox"
                  id="watered"
                  name="watered"
                  checked={plant.wateredToday}
                  onChange={() => {
                    watered(plant);
                  }}
                ></input>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
