const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String, required: true },
  league: { type: String, required: true },
  players: { type: String },
  about: { type: String },
  date: { type: Date, default: Date.now }
});

const team = mongoose.model("team", teamSchema);

module.exports = team;
