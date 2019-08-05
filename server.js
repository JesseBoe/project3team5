// Loading environmental variables here
if (process.env.NODE_ENV !== "production") {
  console.log("loading dev environments");
  require("dotenv").config();
}
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dbConnection = require("./server/db"); // loads our connection to the mongo database
const passport = require("./server/passport");
const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var shortID = require('shortid');
const Player = require('./classes/player.js');
const Game = require('./classes/game.js')

const PORT = process.env.PORT || 3001;

// ===== Middleware ====
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.APP_SECRET || "this is the default passphrase",
    store: new MongoStore({
      mongooseConnection: dbConnection
    }),
    resave: false,
    saveUninitialized: false
  })
);

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// ===== testing middleware =====
// app.use(function(req, res, next) {
// 	console.log('===== passport user =======')
// 	console.log(req.session)
// 	console.log(req.user)
// 	console.log('===== END =======')
// 	next()
// })
// testing
// app.get(
// 	'/auth/google/callback',
// 	(req, res, next) => {
// 		console.log(`req.user: ${req.user}`)
// 		console.log('======= /auth/google/callback was called! =====')
// 		next()
// 	},
// 	passport.authenticate('google', { failureRedirect: '/login' }),
// 	(req, res) => {
// 		res.redirect('/')
// 	}
// )

// === if its production environment!
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  console.log("YOU ARE IN THE PRODUCTION ENV");
  app.use(
    "/static",
    express.static(path.join(__dirname, "client/build/static"))
  );
  app.get(["/", "/login", "/signup", "/gameplay", "/profile", "/players"], (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/"));
  });
}

/* Express app ROUTING */
app.use("/auth", require("./server/auth"));
app.use("/api", require("./routes/api"));

// ===== Error handler ====
app.use(function(err, req, res, next) {
  console.log("===== ERROR ======");
  console.error(err.stack);
  res.status(500);
});

server.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

var sockets = [];
var games = [];

io.on("connection", socket => {
  console.log(`Socket ${socket.id} connected.`);

  let player = new Player();
  sockets[player.id] = socket;

  socket.on("disconnect", () => {
    if (player) {
      if (games[player.currentGame]) {
        games[player.currentGame].leaveGame(player);
        syncGameDetails(player.currentGame);
      }
    }
    console.log(`Socket ${socket.id} disconnected.`);
  });

  //Make a game!
  socket.on("createGame", () => {
    let game = new Game();
    games[game.id] = game;
    socket.emit("createGameResponse", game.id);
    syncGameDetails(game.id);
  });

  //join a game!
  socket.on("joinGame", (gameid) => {
    //If the player is currently in a game, disconnect
    if (games[player.currentGame]) {
      games[player.currentGame].leaveGame(player);
      syncGameDetails(player.currentGame);
    }
    //If the game exists, join it
    if (games[gameid]) {
      games[gameid].joinGame(player);
      syncGameDetails(gameid);
    }
  });

  //Ready up!
  socket.on("toggleReady", () => {
    player.ready = !player.ready;
    socket.emit("recieveMyPlayerData", player);
    syncGameDetails(player.currentGame);

    //if all players are ready, start the game!~
    if (games[player.currentGame].allReady() == true) {
      games[player.currentGame].players.forEach(eachPlayer => {
        sockets[eachPlayer.id].emit("startGame", eachPlayer.currentGame);
      })
      games[player.currentGame].start();
    }
  })

  socket.on("requestUpdate", () => {
    socket.emit("recieveMyPlayerData", player);
    syncGameDetails(player.currentGame);
  })

  socket.on("requestSpinWheel", () => {
    //Game exists
    if (games[player.currentGame]) {
      //its our turn
      if (games[player.currentGame].getCurrentPlayerId() == player.id) 
      {
        let angle = Math.floor(Math.random() *359)
        games[player.currentGame].players.forEach(eachPlayer => {
          sockets[eachPlayer.id].emit("spin", angle);
        })
      }
    }
  })

  socket.on("spinResult", (data) => {
    if (games[player.currentGame]) {
      if (games[player.currentGame].getCurrentPlayerId() == player.id) {
        console.log(data);
      }
    }
  })

  //update all clients with the latest game data! Used in many places
  function syncGameDetails(gameId) {
    //Game exists
    if (games[gameId]) {
      games[gameId].players.forEach(eachPlayer => {
        sockets[eachPlayer.id].emit("returnGameData", games[gameId]);
      });
    }
  }

  socket.on("SendMessage", data => {
    if (games[player.currentGame]) {
      games[player.currentGame].players.forEach(eachPlayer => {
        if (eachPlayer.id != player.id) {
          sockets[eachPlayer.id].emit("RecieveMessage", data)
        }
      });
    }
  });
});
