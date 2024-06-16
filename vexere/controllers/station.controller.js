const { Station, sequelize } = require("../models");
const { Op } = require("@sequelize/core");

const createStation = async (req, res) => {
  const { name, address, province } = req.body;
  try {
    const newStation = await Station.create({ name, address, province });
    res.status(201).send(newStation);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllStations = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const allStations = await Station.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      res.status(200).send(allStations);
    } else {
      const allStations = await Station.findAll();
      res.status(200).send(allStations);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getStationById = async (req, res) => {
  const { id } = req.params;
  try {
    const station = await Station.findOne({
      where: {
        id,
      },
    });
    res.status(200).send(station);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateStation = async (req, res) => {
  const { id } = req.params;
  const { name, address, province } = req.body;
  try {
    const updated = await Station.update(
      { name, address, province },
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

const deleteStation = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = Station.destroy({ where: { id } });
    res.status(200).send(deleted);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
};
