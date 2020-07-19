const express = require("express");
const router = express.Router();


// Get all coffee logs
// Route: http://localhost:3000/logs/all
// Type: GET

// router.get("/logs/all", getAllLogs);

// Get all user coffee logs
// Route: http://localhost:3000/logs/user
// Type: GET

// router.get("/logs/user", getUserLogs);

// Create a new user log
// Route: http://localhost:3000/logs/new
// Type: POST

// router.post("/logs/new", newLog);


router.post("/query", (req, res) =>{
  console.log(req.query)
  res.send(req.query)
});

router.post("/params/:id/:name", (req, res) => {
 console.log( req.params.name)
 res.send(req.params)
})

router.post("/body", (req, res) => {
  console.log( req.body)
  res.send(req.body)
 })

module.exports = router;