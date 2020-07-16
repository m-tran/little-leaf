const db = require("../models");

module.exports = {
    // createProfile: async (req, res) => {
    //     console.log("test");
    //     if (req.body) {
    //         console.log("activate fxn");
    //         try {
    //             const newUser = await db.Users.create({
    //                 email: req.body.email,
    //                 password: req.body.password,
    //                 first_name: req.body.first_name,
    //                 last_name: req.body.last_name,
    //                 // foreign ID to link user
    //                 UserId: req.body.id,
    //             });

    //             res.send(newUser);
    //         } catch (err) {
    //             console.log("err");
    //             res.send(err);
    //         }
    //     } else {
    //         console.log("here");
    //         res.redirect("/");
    //     }
    // },
    createProfile: async (req, res) => {
        try {
            const newProfile = await db.Users.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password
            });
            res.send(newProfile);
        } catch (err) {
            console.log("err");
            res.send(err);
        }
    },

    getProfile: async (req, res) => {
        db.Users.findOne({
            where: {
                id: req.body.id,
            },
            include: [db.Users],
        }).then((userProfile) => res.send(userProfile))
            .catch((err) => { res.send(err) });
    },
};