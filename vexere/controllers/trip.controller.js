const { Trip } = require("../models");
const { Station } = require("../models");

const createTrip = async (req, res) => {
  const { fromStation, toStation, startTime, price } = req.body;
  const newTrip = await Trip.create({
    fromStation,
    toStation,
    startTime,
    price,
  });
  console.log(newTrip);
  res.status(201).send(newTrip);
};

const getAll = async (req, res) => {
  const tripList = await Trip.findAll({
    include: [
      {
        model: Station,
        as: "from",
      },
      {
        model: Station,
        as: "to",
      },
    ],
  });
  res.status(200).send(tripList);
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = Trip.destroy({ where: { id } });
    res.status(200).send(deleted);
  } catch (err) {
    res.status(500).send(err);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { fromStation, toStation, startTime, price } = req.body;
  try {
    const updated = await Trip.update(
      { fromStation, toStation, startTime, price },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createTrip,
  getAll,
  remove,
  update,
};
