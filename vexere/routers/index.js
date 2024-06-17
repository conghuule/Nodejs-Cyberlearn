const express = require("express");
const { stationRouter } = require("./station.router");
const { userRouter } = require("./user.router");
const { tripRouter } = require("./trip.router");
const rootRouter = express.Router();

rootRouter.use("/stations", stationRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/trips", tripRouter);

module.exports = {
  rootRouter,
};
