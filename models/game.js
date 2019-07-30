const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  score: { type: String, required: true },
  when: { type: String },
  notes: { type: String },
  date: { type: Date, default: Date.now }
});

const game = mongoose.model("game", gameSchema);

module.exports = game;
