const db = require("../models");
const {
  waterPlant,
  prunePlant,
  repotPlant,
  rotatePlant,
} = require("./nodemailer");

let userPlants = [];
let waterSchedule = [];
let rotateSchedule = [];
let pruneSchedule = [];
let repotSchedule = [];
let count = 0;
let newPlant;

module.exports = {
  createPlant: async (req, res) => {
    if (req.user) {
      try {
        newPlant = await db.Plant.create({
          commonName: req.body.commonName,
          size: req.body.size,
          water_amount: req.body.size * 0.25,
          water_frequency: req.body.water_frequency,
          prune: req.body.prune,
          prune_frequency: req.body.prune_frequency,
          rotate_frequency: req.body.rotate_frequency,
          repot_frequency: req.body.repot_frequency,
          // foreign ID to link user
          RoomId: req.params.RoomId,
          // UserID: req.user.id,
        });
        plantIntervals(req, res);
        res.send(newPlant);
      } catch (error) {
        console.log("That did not go well");
        throw error;
      }
    } else {
      res.redirect("/");
    }
  },

  getPlant: async (req, res) => {
    if (req.user) {
      try {
        const onePlant = await db.Plant.findOne({
          where: {
            id: req.params.id,
          },
          // include: [db.Plant],
        });
        res.send(onePlant);
      } catch (err) {
        res.send({ err_message: err });
      }
    } else res.send("error");
  },

  getAllPlants: async (req, res) => {
    if (req.user) {
      try {
        const allPlants = await db.Plant.findAll({
          where: {
            RoomId: req.params.RoomId,
          },
        });
        res.send(allPlants);
      } catch (err) {
        res.send({ err_message: err });
      }
    } else {
      res.redirect("/");
    }
  },

  getAllUserPlants: async (req, res) => {
    if (req.user) {
      try {
        const allUserPlants = await db.Plant.findAll({});
        res.send(allUserPlants);
      } catch (err) {
        res.send({ err_message: err });
      }
    } else {
      res.redirect("/");
    }
  },

  deletePlant: async (req, res) => {
    if (req.user) {
      try {
        db.Plant.destroy({
          where: { id: req.params.id },
        })
          .then(() => {
            console.log("plant deleted");
          })
          .then(() => {
            console.log("here");
            const intervalToStop = waterSchedule.find(
              (obj) => obj.id == req.body.id
            );
            clearInterval(intervalToStop.interval);
            console.log(intervalToStop);

            const intervalToStop2 = pruneSchedule.find(
              (obj) => obj.id == req.body.id
            );
            clearInterval(intervalToStop2.interval);
            console.log(intervalToStop2);

            const intervalToStop3 = rotateSchedule.find(
              (obj) => obj.id == req.body.id
            );
            clearInterval(intervalToStop3.interval);
            console.log(intervalToStop3);

            const intervalToStop4 = repotSchedule.find(
              (obj) => obj.id == req.body.id
            );
            clearInterval(intervalToStop4.interval);
            console.log(intervalToStop4);
            res.send("yay!!");
          }).catch((err) => console.log(err));
      } catch (err) {
        res.send({ err_message: err });
      }
    } else {
      res.send("error");
    }
  },
};

const plantIntervals = (req, res) => {
  count++;

  const Plant1 = {
    commonName: req.body.commonName,
    water_frequency: req.body.water_frequency,
    prune_frequency: req.body.prune_frequency,
    rotate_frequency: req.body.rotate_frequency,
    repot_frequency: req.body.repot_frequency,
    id: count,
  };
  userPlants.push(Plant1);
  // res.send(userPlants);

  // var dayInMilliseconds = 86400000;
  var dayInMilliseconds = 100000;
  const waterTimer = setInterval(
    () => waterPlant(req.user.email, newPlant.commonName),
    Math.min(dayInMilliseconds * newPlant.water_frequency, Math.pow(2, 31) - 1)
  );
  waterSchedule.push({ id: count, interval: waterTimer });

  const pruneTimer = setInterval(
    () => prunePlant(req.user.email, newPlant.commonName),
    Math.min(dayInMilliseconds * newPlant.prune_frequency, Math.pow(2, 31) - 1)
  );
  pruneSchedule.push({ id: count, interval: pruneTimer });

  const rotateTimer = setInterval(
    () => rotatePlant(req.user.email, newPlant.commonName),
    Math.min(dayInMilliseconds * newPlant.rotate_frequency, Math.pow(2, 31) - 1)
  );
  rotateSchedule.push({ id: count, interval: rotateTimer });

  const repotTimer = setInterval(
    () => repotPlant(req.user.email, newPlant.commonName),
    Math.min(dayInMilliseconds * newPlant.repot_frequency, Math.pow(2, 31) - 1)
  );
  repotSchedule.push({ id: count, interval: repotTimer });
};
