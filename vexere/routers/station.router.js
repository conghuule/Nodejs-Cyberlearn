const express = require("express");
const {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
} = require("../controllers/station.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const stationRouter = express.Router();

stationRouter.post(
  "/",
  authenticate,
  authorize(["ADMIN", "SUPPERADMIN"]),
  createStation
);
stationRouter.get("/", getAllStations);
stationRouter.get("/:id", getStationById);
stationRouter.put("/:id", updateStation);
stationRouter.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPPERADMIN"]),
  deleteStation
);

module.exports = { stationRouter };
