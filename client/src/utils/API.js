import axios from "axios";

export default {
  
  // Gets all players
  getplayers: function() {
    return axios.get("/api/players");
  },
  // Gets the player with the given id
  getplayer: function(id) {
    return axios.get("/api/players/" + id);
  },
  // Deletes the player with the given id
  deleteplayer: function(id) {
    return axios.delete("/api/players/" + id);
  },
  // Saves a player to the database
  saveplayer: function(playerData) {
    return axios.post("/api/players", playerData);
  },
   
};
