const db = require("../models");

module.exports = {
  login: (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  },

  register: async (req, res) => {

    try {
      await db.User.create({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      });

      res.redirect(307, "/auth/login");
    } catch (err) {
      res.status(401).json(err);
    }
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },

  getUser: async (req, res) => {

    if (req.user) {
      try {
        const user = await db.User.findOne({
          where: {
            id: req.user.id
          },
          include: [db.Room ],
        });

        res.send({
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          Rooms: user.Rooms
        });

      } catch (err) {
        res.send({
          err_msg: err
        });
      }
    } else {
      res.send({});
    }
  },
};