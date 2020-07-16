const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  deleteUser,
} = require("../controllers/user-controllers");

router.post("/profile/new", createUser);

router.get("/profile", getUser);

<<<<<<< HEAD:routes/profile-routes.js
router.get("/profile", deleteUser);
=======
// router.delete("/profile", deleteProfile);
>>>>>>> e0a2df1eef2b04568eb913dda741bf3cf97d2900:routes/user-routes.js

module.exports = router;