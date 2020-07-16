const db = require("../models");

module.exports = {

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

    getProfile: async (req, res) => {
        db.User.findOne({
            where: {
                id: req.body.id,
            },
        }).then((userProfile) => res.send(userProfile))
            .catch((err) => { res.send(err) });
    },
};