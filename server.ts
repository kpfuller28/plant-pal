import express from "express";
import ViteExpress from "vite-express";
import * as controller from "./server/controllers";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));

app.post("/addPlant", (req, res) => {
  console.log(req.body);
  controller.addPlant(req, res);
});

app.get("/getPlants", (req, res) => {
  controller.getAllPlants(req, res);
});

app.put("/updateWaterDays", (req, res) => {
  controller.updateWaterDays(req, res);
});

app.put("/updateWatered", (req, res) => {
  console.log("updating watered today");
  controller.updateWatered(req, res);
});

app.get("/getPlant", (req, res) => {
  console.log("get plant request: ", req);
  controller.getPlant(req, res);
});
