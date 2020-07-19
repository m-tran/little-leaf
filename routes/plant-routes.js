const express = require("express");
const router = express.Router();

const {
    createPlant,
    getPlant,
    getAllPlants,
    deletePlant,
  } = require("../controllers/plant-controllers");


router.post("/plant/new", createPlant);

router.get("/plant/all", getAllPlants);


router.get("/plant/find/:id", getPlant);


router.delete("/plant/delete/:id", deletePlant);

module.exports = router;
