// const express = require('express');
// const app = express();

// const server = app.listen(3001, function() {
//     console.log('server running on port 3001');
// });

// const io = require('socket.io')(server);

var socket = require('socket.io');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = socket.listen(server);
var port = 3001;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

io.on('connection', function (socket) {
    console.log(socket.id)

    socket.on('SEND_MESSAGE', function (data) {
        io.emit('MESSAGE', data)
    });
});