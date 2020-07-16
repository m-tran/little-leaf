const express = require("express");
const router = express.Router();
const {
    getRoom,
    // getAllRooms,
    createRoom,
    // deleteRoom,
} = require("../controllers/room-controllers");

router.post("/profile/room/new", createRoom);

router.get("/profile/room/:id", getRoom);

// router.get("/profile/rooms", getAllRooms);

// router.delete("/profile/room/delete/:id", deleteRoom);

module.exports = router;