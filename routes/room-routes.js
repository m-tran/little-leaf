const express = require("express");
const router = express.Router();
const {
    getRoom,
    getAllRooms,
    createRoom,
    deleteRoom,
} = require("../controllers/room-controllers");

router.post("/room/new", createRoom);

router.get("/room/:id", getRoom);

router.get("/rooms", getAllRooms);

router.delete("/room/delete/:id", deleteRoom);

module.exports = router;