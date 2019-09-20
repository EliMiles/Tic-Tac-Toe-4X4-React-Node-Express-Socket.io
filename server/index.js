const app = require('http').createServer()
const io = module.exports.io = require('socket.io')(app)

const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

///////////////////////////////////////////////////////////////////

// const express = require("express");

// const http = require("http");

// const socketIo = require("socket.io");

// const SocketManager = require('./SocketManager');

// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.options('*', cors());

// const server = http.createServer(app);

// const io = socketIo(server);

// io.on('connection', SocketManager);

//////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3231;

app.listen(PORT, () => {
    console.log('connected to port: ' + PORT);
})