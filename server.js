const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

//SocketIO
const http = require('http');
const io = require('socket.io')();
const server = http.createServer();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  console.log("PRODUCTION ALERT");
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

//SocketIO
io.attach(server);

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected.`);

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});

server.listen(PORT);
console.log("Socket Server is now listening on port: " + PORT);
