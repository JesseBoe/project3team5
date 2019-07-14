const http = require('http');
const io = require('socket.io')();

const PORT = process.env.PORT || '52300';
const server = http.createServer();

io.attach(server);

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected.`);

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
    });
});

server.listen(PORT);
console.log("Socket Server is now listening on port: " + PORT);