import axios from "axios";
import { useState } from "react";

export default function PlantForm() {
  const [formData, setFormData] = useState({
    plantName: "",
    daysToWater: "",
  });
  const [plantList, setPlantList] = useState([]);
  function submitPlant(event) {
    event.preventDefault();
    console.log("FORM DATA: ", formData);
    setPlantList((prevState) => [...prevState, formData]);
    axios
      .post("http://localhost:3000/addPlant", formData)
      .then(function (response) {
        console.log(response);
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
        <label htmlFor="daysToWater">
          ssWatering Frequency &#40;Days&#41;:{" "}
        </label>
        <input
          required
          placeholder="How often to water..."
          type="number"
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
            const days = plant.daysToWater === "1" ? "day" : "days";
            return (
              <div key={plantList.indexOf(plant)}>
                <br></br>
                <div>Plant Name: {plant.plantName}</div>
                <div>
                  Water every {plant.daysToWater} {days}
                </div>
                <label htmlFor="watered">Have I been watered today?</label>
                <input type="checkbox" id="watered" name="watered"></input>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
