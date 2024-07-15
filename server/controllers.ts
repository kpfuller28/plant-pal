import * as model from "./models";

export async function addPlant(req, res) {
  console.log("REQ BODY: ", req.body);
  try {
    const plant = await model.addPlant(
      req.body.plantName,
      req.body.daysToWater
    );
    console.log("DB CREATE: ", plant);
  } catch (err) {
    console.log("error in adding plant to db controller: ", err);
    res.sendStatus(501);
  }
}
