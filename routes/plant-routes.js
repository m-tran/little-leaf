const express = require("express");
const router = express.Router();
const {
    createPlant,
    getPlant,
    getAllPlants,
  } = require("../controllers/plant-controller");