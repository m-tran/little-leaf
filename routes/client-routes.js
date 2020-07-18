const express = require("express");
const router = express.Router();
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated.js");
const axios = require("axios");

require("dotenv").config();


// All routes will redirect to member page if authenticated, signup otherwise

router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../client/signup.html"));
});

// client side route to login page
router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../client/login.html"));
});

// client side route to members page
router.get("/members", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/members.html"));
});

// client side route to myplants page
router.get("/myplants", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/plants.html"));
});

// client side route to search page
router.get("/search", (req, res) => {
  let searchName = req.query.plant;

  let allPlantsUrl = `https://v0.trefle.io/api/plants?q=${searchName}&token=${process.env.KEY}`;

  axios
    .get(allPlantsUrl)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send({
        err
      });
    });
});

router.get("/search/plant", (req,res) => {
  let searchName = req.query.plant;
  let allPlantsUrl = `https://v0.trefle.io/api/plants?q=${searchName}&token=${process.env.KEY}`;
  
  axios
    .get(allPlantsUrl)
      .then((response) => {
        let arr = response.data;

          let id = arr[0].id;
          let plantUrl = `https://trefle.io/api/v1/plants/${id}?token=${process.env.KEY}`;

          return axios.get(plantUrl);
      })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send({
        err
      });
    });
});

module.exports = router;