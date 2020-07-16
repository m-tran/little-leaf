const express = require("express");
const router = express.Router();
const {
    getRoom,
    getAllRooms,
    createRoom,
    deleteRoom,
} = require("../controllers/profile-controller");

router.post("/profile/new", createRoom);

router.get("/profile/:id", getRoom);

router.get("/profile", getAllRooms);

router.delete("/room/delete/:id", deleteRoom);

module.exports = router;