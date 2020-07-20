const express = require("express");
const router = express.Router();

const {
    createPlant,
    getPlant,
    getAllPlants,
    getAllUserPlants,
    deletePlant,
} = require("../controllers/plant-controllers");


router.post("/plant/new/:RoomId", createPlant);

router.get("/plant/all/:RoomId", getAllPlants);

router.get("/plant/all", getAllUserPlants);

router.get("/plant/find/:id", getPlant);


router.delete("/plant/delete/:id", deletePlant);

module.exports = router;
