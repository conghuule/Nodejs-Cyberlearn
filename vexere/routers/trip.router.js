const express = require("express");
const {
  createTrip,
  getAll,
  remove,
  update,
} = require("../controllers/trip.controller");

const tripRouter = express.Router();

tripRouter.post("/", createTrip);
tripRouter.get("/", getAll);
tripRouter.delete("/:id", remove);
tripRouter.put("/:id", update);

module.exports = {
  tripRouter,
};
