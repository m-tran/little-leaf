const db = require("../models");

module.exports = {

    createUser: async (req, res) => {
        try {
            const newProfile = await db.User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                // foreign ID to link user
                UserId: req.body.id,
            });
            res.send(newProfile);
        } catch (err) {
            console.log("err");
            res.send(err);
        }
    },
    onDelete: 'cascade',
    getUser: async (req, res) => {
        db.User.findOne({
            where: {
                id: req.body.id,
            },
        }).then((userProfile) => res.send(userProfile))
            .catch((err) => { res.send(err) });
    },

    deleteUser: async (req,res) => {    
        db.User.destory({
          where: { id: req.params.id },
        }),
        User.hasMany(models.Rooms, {
          onDelete: "cascade",
        })
        .then(deletedUser => {
          console.log(`Has the user been deleted? 1 means yes, 0 means no: ${deletedUser}`);
        });
      }

};
