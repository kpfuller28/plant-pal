import { capitalize } from "@mui/material";
import * as model from "./models";

export async function addPlant(req, res) {
  console.log("Data received in add plant: ", req.body);
  try {
    const plant = await model.addPlant(
      req.body.plantName,
      req.body.daysToWater
    );
    console.log("Plant created in add plant: ", plant);
  } catch (err) {
    console.log("error in adding plant to db controller: ", err);
    res.sendStatus(501);
  }
}

export async function getAllPlants(req, res) {
  try {
    const plants = await model.getAllPlants();
    res.send(plants);
  } catch (err) {
    console.log("error in getting all plants controller: ", err);
    res.sendStatus(501);
  }
}

export async function getPlant(req, res) {
  try {
    const plant = await model.getPlant(req.body.id);
    res.send(plant);
  } catch (err) {
    console.log("error in getting plant controller: ", err);
    res.sendStatus(501);
  }
}

export async function updateWaterDays(req, res) {
  try {
    const plant = await model.updateWaterDays(
      req.body.id,
      req.body.daysSinceWatered,
      req.body.daysTillWatering,
      req.body.wateredToday
    );
    // console.log("plant updated in update water days controller: ", plant);
    res.send(plant);
  } catch (err) {
    console.log("error in updating plant water days controller: ", err);
    res.sendStatus(501);
  }
}

export async function updateWatered(req, res) {
  try {
    const plant = await model.updateWatered(
      req.body.id,
      req.body.wateredToday,
      req.body.daysSinceWatered,
      req.body.daysTillWatering,
      req.body.lastWatered
    );
    console.log("plant updated in update watered controller: ", plant);
    res.send(plant);
  } catch (err) {
    console.log("error in updating plant watered controller: ", err);
    res.sendStatus(501);
  }
}
