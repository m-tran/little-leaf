const db = require("../models");

module.exports = {
  createRoom: async (req, res) => {
    if (req.user) {
      try {
        const newRoom = await db.Room.create({
        name: req.body.name,
        size: req.body.size,
        numPlants: req.body.numPlants,
        enoughPlants: req.body.enoughPlants,
        sunlight: req.body.sunlight,
          // foreign ID to link user
          userId: req.user.id,
        });

        res.send(newRoom);
      } catch (err) {
        res.send(err);
      }
    } else {
      res.redirect("/");
    }
  },

  getAllRooms: async (req, res) => {
    db.Room.findMany({
      where: {
        id: req.user.id,
      },
      include: [db.User],
    }).then((Rooms) => res.send(Rooms));
  },

  getRoom: async (req, res) => {
    db.Room.findOne({
      where: {
        id: req.body.id,
      },
      include: [db.User],
    }).then((Room) => res.send(Room));
  },


};