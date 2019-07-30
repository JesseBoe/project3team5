var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require("path");
const PORT = process.env.PORT || 3001;
const socketioAuth = require("socketio-auth");
var passport = require("passport");
app.use(passport.initialize());
require("./config/passport");

// Connect to the database
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const mongoOpts = { useNewUrlParser: true };
const mongoUrl = "mongodb://localhost/socketio-react";
io.use((socket, next) => {
  mongoose
    .connect(mongoUrl, mongoOpts)
    .then(() => next())
    .catch(e => console.error(e.stack));
});

// Authenticate
const User = require("./User");
const authenticate = async (client, data, callback) => {
  const { username, password, register } = data;
  try {
    if (register) {
      const user = await User.create ({ username, password });
      callback(null, !!user);
    } else {
      const user = await User.findOne({ username });
      callback(null, user && user.validPassword(password));
    }
  } catch (error) {
    callback(error);
  }
};

// Register actions
const postAuthenticate = client => {
  console.log("authenticated");
  client.emit("wendy");
};

// Configure Authentication
socketioAuth(io, { authenticate, postAuthenticate, timeout: "none" });

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  console.log("PRODUCTION ALERT");
  app.use(express.static("client/build"));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add routes, both API and view
app.use(routes);

server.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});