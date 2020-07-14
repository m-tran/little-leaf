const db = require("../models");

module.exports = {
    getCommonName: async (req, res) => {
        db.Plant.findMany({
            where: {
                id: req.room.id,
            },
            include: [db.Room],
        }).then((Plants) => res.send(Plants.commonName));
    },
    getSize: async (req, res) => {
        db.Plant.findMany({
            where: {
                id: req.room.id,
            },
            include: [db.Room],
        }).then((Plants) => res.send(Plants.size));
    },
    getWaterAmount: async (req, res) => {
        db.Plant.findMany({
            where: {
                id: req.room.id,
            },
            include: [db.Room],
        }).then((Plants) => res.send(Plants.water_amount));
    },
    getWaterFrequency: async (req, res) => {
        db.Plant.findMany({
            where: {
                id: req.room.id,
            },
            include: [db.Room],
        }).then((Plants) => res.send(Plants.water_frequency));
    },
    getPrune: async (req, res) => {
        db.Plant.findMany({
            where: {
                id: req.room.id,
            },
            include: [db.Room],
        }).then((Plants) => res.send(Plants.prune));
    },
    getPruneFrequency: async (req, res) => {
        db.Plant.findMany({
            where: {
                id: req.room.id,
            },
            include: [db.Room],
        }).then((Plants) => res.send(Plants.prune_frequency));
    },
    getRotateFrequency: async (req, res) => {
        db.Plant.findMany({
            where: {
                id: req.room.id,
            },
            include: [db.Room],
        }).then((Plants) => res.send(Plants.rotate_frequency));
    },
    getRepotFrequency: async (req, res) => {
        db.Plant.findMany({
            where: {
                id: req.room.id,
            },
            include: [db.Room],
        }).then((Plants) => res.send(Plants.repot_frequency));
    },

    newCommonName: async (req, res) => {
        if (req.user) {
            try {
                const newCommonName = await db.Plant.create({
                    ...req.body.commonName,
                    UserId: req.user.id,
                });
                res.send(newCommonName);
            } catch (err) {
                res.send({ err_message: err });
            }
        } else {
            res.redirect("/");
        }
    },
};