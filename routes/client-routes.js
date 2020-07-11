const express = require("express");
const router = express.Router();
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated.js");
const axios = require("axios");

require("dotenv").config();

router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../client/signup.html"));
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

router.get("/members", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/members.html"));
});

router.get("/search", (req, res) => {

  let searchName = req.body;

  let allPlantsUrl = `https://trefle.io/api/plants?token=${process.env.KEY}`;

  axios
    .get(allPlantsUrl)
    .then((res) => {
      let arr = res.data;
      let result = arr.filter(item => item["scientific_name"] == searchName);

      let id = result[0].id;
      let plantUrl = `https://trefle.io/api/plants/${id}?token=${process.env.KEY}`

      return axios.get(plantUrl);
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  });

module.exports = router;
