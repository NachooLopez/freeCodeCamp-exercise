const mongoose = require("mongoose");

const { Schema } = mongoose;

const ExerciseSchema = new Schema(
  {
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { versionKey: false, _id: false }
);

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    log: [ExerciseSchema],
  },
  { versionKey: false }
);

module.exports = User = mongoose.model("User", UserSchema);
