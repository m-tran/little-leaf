const express = require("express");
const router = express.Router();

const {
    createPlant,
    getPlant,
    getAllPlants,
    deletePlant,
  } = require("../controllers/plant-controllers");

  // Get all plants
// Route: http://localhost:3000/logs/user
// Type: GET

router.get("/plant/all", getAllPlants);

// Get one plant
// Route: http://localhost:3000/logs/user
// Type: GET


router.get("/plant/find/:id", getPlant);

// Create a new plant
// Route: http://localhost:3000/logs/new
// Type: POST

router.post("/plant/new", createPlant);


router.delete("/plant/delete/:id", deletePlant);

module.exports = router;
