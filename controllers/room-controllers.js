const db = require("../models");

module.exports = {

  createRoom: async (req, res) => { 
    if(req.user) {
      try {
        const newRoom = await db.Room.create({
          name: req.body.name,
          size: req.body.size,
          numPlants: req.body.numPlants,
          enoughPlants: req.body.size/req.body.numPlants > 30.0 ? false : true,
          sunlight: req.body.sunlight,
          // foreign ID to link user
          UserId: req.user.id,
        }, 

        )
        res.send(newRoom);
      } catch (err) {
        console.log("err");
        res.send(err);
      }
    } else {
      console.log("not working");
    }
  
  },

  getAllRooms: async (req, res) => {
    if(req.user) {
      try {
        const allRooms = await db.Room.findAll({
          where: {
            UserId: req.user.id,
          },
        });
        res.send(allRooms);
      } catch (err) {
        res.send({ err_message: err });
      }
    } else {
      res.send("error");
    }
 
  },

  getRoom: async (req, res) => {
    if(req.user) {
      db.Room.findOne({
        where: {
          id: req.params.id,
        },
        // include: [db.User],
      }).then((Room) => res.send(Room)).catch((err) => res.send(err))
    }else {
      res.send("error");
    }
  
  },

  deleteRoom: async (req,res) => {  
    if(req.user) {
      db.Room.destroy({
        where: { 
          id: req.params.id,
          UserId: req.body.id,
        },
      })
      .then(deletedRoom => {
        console.log(`Has the room been deleted? 1 means yes, 0 means no: ${deletedRoom}`);
        res.send("deleted");
      }).catch((err) => res.send(err))
    }  else {
      res.send("error");
    }
  },

};

