const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const db = require("./models");
const PORT = process.env.PORT || 3005;
const cors = require('cors');
const path = require('path');

require("dotenv").config();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("./client"));
app.use(express.static(path.join(__dirname, "./client")));

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/auth-routes.js");
app.use(authRoutes);

const clientRoutes = require("./routes/client-routes.js");
app.use(clientRoutes);

// const userRoutes = require("./routes/user-routes.js");
// app.use(userRoutes);

const roomRoutes = require("./routes/room-routes.js");
app.use(roomRoutes);

const plantRoutes = require("./routes/plant-routes.js");
app.use(plantRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
});

