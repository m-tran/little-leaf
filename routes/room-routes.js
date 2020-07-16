const express = require("express");
const router = express.Router();
const {
<<<<<<< HEAD
  getRoom,
  getAllRooms,
  createRoom,
  deleteRoom,
} = require("../controllers/room-controllers");

router.post("/room/new", createRoom);

router.get("/room/:id", getRoom);

router.get("/room/all", getAllRooms);
=======
    getRoom,
    // getAllRooms,
    createRoom,
    // deleteRoom,
} = require("../controllers/room-controllers");

router.post("/profile/room/new", createRoom);

router.get("/room/:id", getRoom);

>>>>>>> e0a2df1eef2b04568eb913dda741bf3cf97d2900

// router.get("/profile/rooms", getAllRooms);

// router.delete("/profile/room/delete/:id", deleteRoom);

module.exports = router;