'use strict';

const port = 11100;
const host = '0.0.0.0'; // 0.0.0.0 instead of localhost !

const app = require('express')();
const socket = require('socket.io');

app.get('/check', (req, res) => res.send('Hello World'));

const server = app.listen(port, host, () => {
    console.log('Listening on port ' + port);
});

var io = socket(server, {
    pingInterval: 5000,
    pingTimeout: 3000,
});

/*
io.use((socket, next) => {
    if (socket.handshake.query.token === "UNITY") {
        next();
    } else {
        next(new Error("Authentication error"));
    }
});*/

io.on('connection', socket => {
    console.log('connection');

    setTimeout(() => {
        socket.emit('connection', { date: new Date().getTime(), data: "Hello Unity" })
    }, 1000);

    socket.on('hello', (data) => {
        console.log('hello', data);
        socket.emit('hello', { date: new Date().getTime(), data: data });
    });

    socket.on('spin', (data) => {
        console.log('spin');
        socket.emit('spin', { date: new Date().getTime(), data: data });
    });

    socket.on('class', (data) => {
        console.log('class', data);
        socket.emit('class', { date: new Date().getTime(), data: data });
    });
});
