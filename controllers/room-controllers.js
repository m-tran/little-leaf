const db = require("../models");

module.exports = {
  createRoom: async (req, res) => {
    if (req.user) {
      try {
        const newRoom = await db.Room.create({
        name: req.body.name,
        size: req.body.size,
        numPlants: req.body.numPlants,
        enoughPlants: req.body.size/req.body.numPlants > 30.0 ? false : true,
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
        id: req.params.id,
      },
      include: [db.User],
    }).then((Room) => res.send(Room));
  },

  deleteRoom: async (req,res) => {    
    db.Room.destory({
      where: { id: req.params.id },
    }),
    Room.hasMany(models.Plants, {
      onDelete: "cascade",
    })
    .then(deletedRoom => {
      console.log(`Has the room been deleted? 1 means yes, 0 means no: ${deletedRoom}`);
    });
  }


};

