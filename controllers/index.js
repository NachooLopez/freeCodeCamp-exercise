const User = require("../models/User.js");

module.exports = {
  async createUser(req, res) {
    try {
      const { username } = req.body;
      const user = new User({
        username,
      });

      await user.save();

      const { _id } = user;
      res.json({ username, _id });
    } catch (e) {
      console.error(e);
    }
  },

  async getUsers(req, res) {
    try {
      const users = await User.find().select("-log");
      res.json(users);
    } catch (e) {
      console.error(e);
    }
  },

  async createExercise(req, res) {
    try {
      const { _id } = req.params;
      const { description, duration, date } = req.body;

      const user = await User.findById(_id).select("-log");
      if (!user) return res.status(400).json({ error: "No user found" });

      await user.update({ $push: { log: { description, duration, date } } });

      res.json({ ...user.toObject(), description, duration, date });
    } catch (e) {
      console.error(e);
    }
  },
  async getLogs(req, res) {
    try {
      const { _id: id } = req.params;
      let { from, to, limit } = req.query;
      const userFound = await User.findById(id);
      if (!userFound) return res.json({ error: "No user found" });
      const userObject = userFound.toObject();

      const { _id, username } = userObject;

      let { log } = userObject;

      if (from) {
        from = new Date(from);
        log = log.filter((el) => {
          const date = new Date(el.date);
          return date > from;
        });
      }
      if (to) {
        to = new Date(to);
        log = log.filter((el) => {
          const date = new Date(el.date);
          return date < to;
        });
      }
      if (limit) {
        log.length = limit;
      }

      const count = log.length;

      const response = {
        username,
        count,
        _id,
        log,
      };

      return res.json(response);
    } catch (e) {
      console.error(e);
    }
  },
};
