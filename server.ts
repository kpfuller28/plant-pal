import express from "express";
import ViteExpress from "vite-express";
import * as controller from "./server/controllers";

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded());

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));

app.post("/addPlant", (req, res) => {
  console.log(req.body);
  controller.addPlant(req, res);
});
