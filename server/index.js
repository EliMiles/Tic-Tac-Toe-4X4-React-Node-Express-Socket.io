const app = require('http').createServer()
const io = module.exports.io = require('socket.io')(app)

const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

///////////////////////////////////////////////////////////////////

// const express = require('express');

// const app = express();

// const http = require('http');

// const server = http.createServer(app);

// const socketIo = require('socket.io');

// const cors = require('cors');

// const SocketManager = require('./SocketManager');

// const io = socketIo(server);

// app.use(cors())

// io.on('connection', SocketManager);

//////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 3231;

app.listen(PORT, () => {
    console.log('connected to port: ' + PORT);
})