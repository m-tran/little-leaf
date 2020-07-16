const db = require("../models");
const {waterPlant, prunePlant, repotPlant, rotatePlant} = require("./nodemailer");

module.exports = {
  createPlant: async (req, res) => {
    if (req.body) {
      try {
        const newPlant = await db.Plant.create({
          commonName: req.body.commonName,
          size: req.body.size,
          water_amount: req.body.water_amount,
          water_frequency: req.body.water_frequency,
          prune: req.body.prune,
          prune_frequency: req.body.prune_frequency,
          rotate_frequency: req.body.rotate_frequency,
          repotPlant: req.body.repotPlant,
          // foreign ID to link user
          roomId: req.room.id,
        });
        const waterFrequency = 3;
        const pruneFrequency = 2;
        const rotateFrequency = 2;
      console.log("starting timer");
        var dayInMilliseconds = 1000 * 60 * 60 * 24;

         let interval  = setInterval(() => waterPlant(req.user.email), dayInMilliseconds * waterFrequency); //should be req.user.email
    
  
        let interval2 = setInterval(() => prunePlant(req.user.emai), dayInMilliseconds * pruneFrequency );
    
        let internval3 =  setInterval(() => repotPlant(req.user.emai), dayInMilliseconds * rotateFrequency );
    

        res.send("true"); //should be new plant
      } catch (err) {
        res.send(err);
      }
    // } else {
    //   res.redirect("/");
    // }
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
    db.Plants.destory({
      where: { id: req.params.id },
    })
    .then(deletedPlant => {
      console.log(`Has the plant been deleted? 1 means yes, 0 means no: ${deletedPlant}`);
    });
  }
  
};
