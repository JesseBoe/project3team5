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
      if (gameExists(player)) {
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
    if (gameExists(player)) {
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
    //Game Exists
    if (gameExists(player)) {
      //Toggle Ready
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
    }
  })

  socket.on("requestUpdate", () => {
    socket.emit("recieveMyPlayerData", player);
    syncGameDetails(player.currentGame);
  })

  socket.on("requestSpinWheel", () => {
    //Game exists
    if (gameExists(player)) {
      //its our turn
      if (games[player.currentGame].getCurrentPlayerId() == player.id) 
      {
        //Game state is correct
        if (games[player.currentGame].gameState == "Selecting Action" || games[player.currentGame].gameState == "Spinning Wheel") {
          //Spin wheel
          games[player.currentGame].spinResolved = false;
          games[player.currentGame].spinCount++;
          let angle = Math.floor(Math.random() * 359)
          games[player.currentGame].gameState = "Wheel Is Spinning";
          games[player.currentGame].players.forEach(eachPlayer => {
            sockets[eachPlayer.id].emit("spin", angle);
            syncGameDetails(player.currentGame);
          })
        }
      }
    }
  })

  socket.on("spinResult", (data) => {
    //Game Exists
    if (gameExists(player)) {
      if (games[player.currentGame].getCurrentPlayerId() === player.id) 
      {
        if (!games[player.currentGame].spinResolved) {
          sendServerMessage(player.currentGame, "The wheel landed on " + data);
          if (data == "  BANKRUPT") {
            console.log("Bankrupt landed")
            player.cash = 0;
            games[player.currentGame].nextTurn();
          }
          else if (data == " LOSE TURN") {
            games[player.currentGame].nextTurn();
          }
          else {
            games[player.currentGame].curentWheelValue = data;
            games[player.currentGame].gameState = "Selecting Consonant";
          }
          games[player.currentGame].spinResolved = true;
          syncGameDetails(player.currentGame);
        }
      }
    }
  })

  socket.on("buyVowel", () => {
    //GameExists
    if(gameExists(player)) {
      //Its my turn
      if (games[player.currentGame].getCurrentPlayerId() === player.id) {
        //GameState is correct
        if (games[player.currentGame].gameState == "Selecting Action") {
          games[player.currentGame].gameState = "Buy Vowel";
          games[player.currentGame].onlyVowels = true;
          syncGameDetails(player.currentGame);
        }
      }
    }
  })

  socket.on("solvePuzzle", () => {
    //GameExists
    if (gameExists(player)) {
      //Its my turn
      if (games[player.currentGame].getCurrentPlayerId() === player.id) {
        //GameState is correct
        if (games[player.currentGame].gameState == "Selecting Action") {
          games[player.currentGame].gameState = "Solving";
          syncGameDetails(player.currentGame);
        }
      }
    }
  })

  socket.on("idLikeToSolveThePuzzle", (data) => {
    //GameExists
    if (gameExists(player)) {
      //Its my turn
      if (games[player.currentGame].getCurrentPlayerId() === player.id) {
        //GameState is correct
        if (games[player.currentGame].gameState == "Solving") {
          if (games[player.currentGame].puzzleGuessed(data)) {
            sendServerMessage(player.currentGame, player.username + " tried to guess the puzzle: " + data);
            sendServerMessage(player.currentGame, "They were correct!");
            roundOver();
          }
          else {
            sendServerMessage(player.currentGame, player.username + " tried to guess the puzzle: " + data);
            sendServerMessage(player.currentGame, "They were incorrect!");
            games[player.currentGame].nextTurn();
          }
          syncGameDetails(player.currentGame);
        }
      }
    }
  })

  socket.on("chooseLetter", (letter) => {
    //Game Exists
    if (gameExists(player)) {
      //Its my turn
      if (games[player.currentGame].getCurrentPlayerId() == player.id) { 
        //Game state is correct
        if (games[player.currentGame].gameState == "Selecting Consonant") { 
          let showAtIndex = games[player.currentGame].showLetter(letter);
          games[player.currentGame].gameState = "Showing Letters";
          if (showAtIndex.length > 0) {
            let interval = setInterval(
              () => {
                player.cash += parseInt(games[player.currentGame].curentWheelValue);
                console.log(player.cash);
                games[player.currentGame].popLetter(showAtIndex.shift());
                syncGameDetails(player.currentGame);
                if (showAtIndex.length <= 0) {
                  showingLettersDone(false);
                  clearInterval(interval);
                }
              }, 500
            );
          }
          else {
            showingLettersDone(true);
          }
        }
        if (games[player.currentGame].gameState == "Buy Vowel") {
          player.cash -= 250;
          let showAtIndex = games[player.currentGame].showLetter(letter);
          games[player.currentGame].gameState = "Showing Letters";
          if (showAtIndex.length > 0) {
            let interval = setInterval(
              () => {
                games[player.currentGame].popLetter(showAtIndex.shift());
                syncGameDetails(player.currentGame);
                if (showAtIndex.length <= 0) {
                  showingLettersDone(false);
                  clearInterval(interval);
                }
              }, 500
            );
          }
          else {
            showingLettersDone(true);
          }
        }
      }
    }
  })

  function showingLettersDone(passTurn) {
    games[player.currentGame].onlyVowels = false;
    if (games[player.currentGame].puzzleSolved()) {
      roundOver();
    }
    else if (passTurn) {
      games[player.currentGame].nextTurn();
    }
    else {
      games[player.currentGame].gameState = "Selecting Action";
    }
    syncGameDetails(player.currentGame);
  }

  function roundOver() {
    console.log("RoundOver");
    if (games[player.currentGame].round > 3) {
      console.log("END GAME");
      games[player.currentGame].endRound();
      games[player.currentGame].endGame();
    }
    else {
      games[player.currentGame].endRound();
      games[player.currentGame].getNewPuzzle();
    }
  }

  //update all clients with the latest game data! Used in many places
  function syncGameDetails(gameId) {
    //Game exists
    if (games[gameId]) {
      games[gameId].players.forEach(eachPlayer => {
        sockets[eachPlayer.id].emit("returnGameData", games[gameId]);
      });
    }
  }

  function gameExists(_player) {
    if (games[_player.currentGame]) {
      return true;
    }
    return false;
  }

  function sendServerMessage(gameId, str) {
    let message = {name: "Server", text: str};
    games[gameId].players.forEach(eachPlayer => {
      sockets[eachPlayer.id].emit("RecieveMessage", message);
    })
  }

  socket.on("SendMessage", data => {
    //Game exists
    if (gameExists(player)) {
      games[player.currentGame].players.forEach(eachPlayer => {
        if (eachPlayer.id != player.id) {
          sockets[eachPlayer.id].emit("RecieveMessage", data);
        }
      });
    }
  });
});
