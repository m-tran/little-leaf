const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  deleteUser,
} = require("../controllers/user-controllers");

router.post("/user/new", createUser);

router.get("/user/find/:id", getUser);

router.delete("/user/delete/:id", deleteUser);

module.exports = router;