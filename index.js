const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>');

    res.sendFile(__dirname + '/index.html');
});

server.listen(8080, () => {
    console.log('listening on *:8080');
});

var id = 1;

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chatMessage', (message) => {
        console.log('received message:');
        console.log(message);

        io.emit('chatMessage', message, id++);
    });
});
