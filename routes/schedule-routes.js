const express = require("express");
const router = express.Router();
const {
    getCommonName,
    getSize,
    getWaterAmount,
    getWaterFrequency,
    getPrune,
    getPruneFrequency,
    getRotateFrequency,
    getRepotFrequency,
    newCommonName,
    newSize,
    newWaterAmount,
    newWaterFrequency,
    newPrune,
    newPruneFrequency,
    newRotateFrequency,
    newRepotFrequency,
} = require("../routes/controllers/schedule-controllers.js");



//GET
router.get("/schedule/common-name", getCommonName);

router.get("/schedule/size", getSize);

router.get("/schedule/water-amount", getWaterAmount);

router.get("/schedule/water-frequency", getWaterFrequency);

router.get("/schedule/prune", getPrune);

router.get("/schedule/prune-frequency", getPruneFrequency);

router.get("/schedule/rotate-frequency", getRotateFrequency);

router.get("/schedule/repot-frequency", getRepotFrequency);

//POST
router.post("/schedule/common-name", newCommonName);

router.post("/schedule/size", newSize);

router.post("/schedule/water-amount", newWaterAmount);

router.post("/schedule/water-frequency", newWaterFrequency);

router.post("/schedule/prune", newPrune);

router.post("/schedule/prune-frequency", newPruneFrequency);

router.post("/schedule/rotate-frequency", newRotateFrequency);

router.post("/schedule/repot-frequency", newRepotFrequency);

module.exports = router;