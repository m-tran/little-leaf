const express = require("express");
const router = express.Router();
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated.js");
const axios = require("axios");

require("dotenv").config();

router.get("/", (req, res) =>
  !req.user
    ? res.sendFile(path.join(__dirname, "../client/members.html"))
    : res.sendFile(path.join(__dirname, "../client/dashboard.html"))
);

router.get("/dashboard", (req, res) =>
  !req.user
    ? res.sendFile(path.join(__dirname, "../client/members.html"))
    : res.sendFile(path.join(__dirname, "../client/dashboard.html"))
);


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

  let searchName = req.query.plant;

  // let updatedSearch = searchName.split(' ').join('_');

  let allPlantsUrl = `https://v0.trefle.io/api/plants?q=${searchName}&token=${process.env.KEY}`;

  axios
    .get(allPlantsUrl)
    // .then((response) => {

    //   let arr = response.data;

    //   let id = arr[0].id;
    //   let plantUrl = `https://trefle.io/api/v1/plants/${id}?token=${process.env.KEY}`;

    //   return axios.get(plantUrl);
    // })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send({ err });
    });
  });

module.exports = router;
