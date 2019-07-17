const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
var server = require('http').createServer(app);
//SocketIO

const io = require('socket.io')();
io.attach(server);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  console.log("PRODUCTION ALERT");
  app.use(express.static("client/build"));
}

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected.`);

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
