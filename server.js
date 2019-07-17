var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require("path");
const PORT = process.env.PORT || 3001;

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

server.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected.`);

    socket.on("tweet", function (tweet) {
      // we received a tweet from the browser
      console.log(tweet);
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
    });
});