const db = require("../models");

module.exports = {
<<<<<<< HEAD
    createUser: async (req, res) => {
        if (req.user) {
            try {
                const newUser = await db.User.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.address,
                    password: req.body.passowrd,
                    // foreign ID to link user
                    UserId: req.user.id,
                });
=======
>>>>>>> e0a2df1eef2b04568eb913dda741bf3cf97d2900

    createProfile: async (req, res) => {
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

    getUser: async (req, res) => {
        db.User.findOne({
            where: {
                id: req.body.id,
            },
<<<<<<< HEAD
            include: [db.User],
        }).then((user) => res.send(user));
    },

   deleteUser: async (req, res) => {
        User.hasOne(models.Profile, {
            onDelete: "cascade",
        });
=======
        }).then((userProfile) => res.send(userProfile))
            .catch((err) => { res.send(err) });
>>>>>>> e0a2df1eef2b04568eb913dda741bf3cf97d2900
    },
};