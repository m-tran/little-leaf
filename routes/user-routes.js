const express = require("express");
const router = express.Router();
const {
  getProfile,
  createProfile,
  deleteProfile,
} = require("../controllers/user-controllers");

router.post("/profile/new", createProfile);

router.get("/profile", getProfile);

// router.delete("/profile", deleteProfile);

module.exports = router;