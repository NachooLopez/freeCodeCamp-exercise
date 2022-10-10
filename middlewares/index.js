const { isValidObjectId } = require("mongoose");

module.exports = {
  paramsVerifier(req, res, next) {
    const { _id } = req.params;
    if (!isValidObjectId(_id)) return res.json({ error: "Invalid id" });

    const { description, duration, date } = req.body;
    if (!description || !duration)
      return res.json({
        error: "You must provide a valid description and duration",
      });

    if (typeof description !== "string")
      return res.json({ error: "Description must be a string" });

    if (isNaN(Number(duration)))
      return res.json({ error: "Duration must be a number" });
    req.body.duration = Number(duration);

    if (!date) req.body.date = new Date().toDateString();
    else req.body.date = new Date(date).toDateString();

    next();
  },
};
