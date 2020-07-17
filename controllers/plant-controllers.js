const db = require("../models");
const {waterPlant, prunePlant, repotPlant, rotatePlant} = require("./nodemailer");

let userPlants = [];
let waterSchedule = [];
let rotateSchedule = [];
let pruneSchedule = [];
let repotSchedule = [];
let count = 0;

module.exports = {
  createPlant: async (req, res) => {
      try {
        const newPlant = await db.Plant.create({
          commonName: req.body.commonName,
          size: req.body.size,
          water_amount: req.body.water_amount,
          water_frequency: req.body.water_frequency,
          prune: req.body.prune,
          prune_frequency: req.body.prune_frequency,
          rotate_frequency: req.body.rotate_frequency,
          repot_frequency: req.body.repot_frequency,
          // foreign ID to link user
          roomId: req.room.id,
        });
      
  console.log("starting timer");
  count++;
  const Plant1 = { commonName: req.body.commonName, water_amount: req.body.water_amount, water_frequency: req.body.water_frequency, prune: req.body.prune, prune_frequency: req.body.prune_frequency, rotate_frequency: req.body.rotate_frequency, repot_frequency: req.body.repot_frequency, roomid: req.room.id, id: count };
  userPlants.push(Plant1);
  res.send(userPlants);

  var dayInMilliseconds = 1000 * 60 * 60 * 24;
  const waterTimer = setInterval(
    () => waterPlant(req.user.email), dayInMilliseconds * water_frequency
  );
  waterSchedule.push({ id: count, interval: waterTimer });

  const pruneTimer = setInterval(
    () => prunePlant(req.user.email), dayInMilliseconds * prune_frequency
  );
  pruneSchedule.push({ id: count, interval: pruneTimer });

  const rotateTimer = setInterval(
    () => rotatePlant(req.user.email), dayInMilliseconds * rotate_frequency
  );
  rotateSchedule.push({ id: count, interval: rotateTimer });

  const repotTimer = setInterval(
    () => repotPlant(req.user.email), dayInMilliseconds * repot_frequency
  );
  repotSchedule.push({ id: count, interval: repotTimer });

        res.send(newPlant); //should be new plant
      } catch (err) {
        res.send(err);
      }

  },


  getPlant: async (req, res) => {
    db.Plant.findOne({
      where: {
        id: req.body.id,
      },
      include: [db.Plant],
    }).then((Plant) => res.send(Plant));
  },

  getAllPlants: async (req, res) => {
    db.Plant.findMany({
      where: {
        id: req.room.id,
      },
      include: [db.Room],
    }).then((Plants) => res.send(Plants));
  },

  deletePlant: async (req,res) => {    
    db.Plants.destroy({
      where: { id: req.params.id },
    })
    .then(deletedPlant => {
      console.log(`Has the plant been deleted? 1 means yes, 0 means no: ${deletedPlant}`);
    }).then(() => {
      console.log(req.body.id);
      const intervalToStop = waterSchedule.find((obj) => obj.id == req.body.id);
      clearInterval(intervalToStop.interval);
      console.log(intervalToStop);

      const intervalToStop2 = pruneSchedule.find((obj) => obj.id == req.body.id);
      clearInterval(intervalToStop2.interval);
      console.log(intervalToStop2);

      const intervalToStop3 = rotateSchedule.find((obj) => obj.id == req.body.id);
      clearInterval(intervalToStop3.interval);
      console.log(intervalToStop3);

      const intervalToStop4 = repotSchedule.find((obj) => obj.id == req.body.id);
      clearInterval(intervalToStop4.interval);
      console.log(intervalToStop4);
      res.send("yay!!");
    })
  }
  
};

