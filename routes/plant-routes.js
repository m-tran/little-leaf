const express = require("express");
const router = express.Router();
const {
    getPlant,
    createPlant,
} = require("../routes/controllers/plant-controllers");

router.post("/plant/new", createPlant);

router.get("/plant", getPlant);


module.exports = router;