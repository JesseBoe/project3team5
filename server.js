// Loading environmental variables here
if (process.env.NODE_ENV !== 'production') {
  console.log('loading dev environments')
  require('dotenv').config()
}
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./server/db') // loads our connection to the mongo database
const passport = require('./server/passport')
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT || 3001;

// ===== Middleware ====
app.use(morgan('dev'))
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
app.use(
  session({
    secret: process.env.APP_SECRET || 'this is the default passphrase',
    store: new MongoStore({
      mongooseConnection: dbConnection }),
      resave: false,
      saveUninitialized: false
  })
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

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
// if (process.env.NODE_ENV === 'production') {
//   const path = require('path')
//   console.log('YOU ARE IN THE PRODUCTION ENV')
//   app.use('/static', express.static(path.join(__dirname, '../build/static')))
//   app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/'))
//   })
// }

/* Express app ROUTING */
app.use('/auth', require('./server/auth'))

// ===== Error handler ====
app.use(function(err, req, res, next) {
  console.log('===== ERROR ======')
  console.error(err.stack)
  res.status(500)
})

server.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

var sockets = [];

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected.`);
    sockets.push(socket);

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
    });

    socket.on("SendMessage", (data) => {
        console.log(data);
        socket.broadcast.emit("RecieveMessage", data);
    })
});