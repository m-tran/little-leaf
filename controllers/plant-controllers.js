const db = require("../models");

module.exports = {
  createPlant: async (req, res) => {
    if (req.room) {
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

        res.send(newPlant);
      } catch (err) {
        res.send(err);
      }
    } else {
      res.redirect("/");
    }
  },

  getPlant: async (req, res) => {
    db.Plant.findOne({
      where: {
        id: req.bodyid,
      },
      include: [db.Plant],
    }).then((Plant) => res.send(Plant));
  },

  getAllPlant: async (req, res) => {
    db.Plant.findMany({
      where: {
        id: req.room.id,
      },
      include: [db.Room],
    }).then((Plants) => res.send(Plants));
  },


};