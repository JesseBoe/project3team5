var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require("path");
const PORT = process.env.PORT || 3001;
// var reactConfetti = require("react-confetti");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  console.log("PRODUCTION ALERT");
  app.use(express.static("client/build"));
}

server.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});