const express = require('express');

const app = express();

const PORT = process.env.PORT || 3231;

const server = app.listen(PORT, () => {
    console.log('connected to port: ' + PORT);
});

const io = module.exports.io = require('socket.io').listen(server);

const SocketManager = require('./SocketManager');

io.on('connection', SocketManager);
