const express = require('express');
const app = express();
const socketio = require('socket.io');

let namespaces = require('./data/namespaces.js');
app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);
const io = socketio(expressServer);

io.on('connection', socket => {
    // build an array to send back with the img and endpoint of ns
    let nsData = namespaces.map(ns => {
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    // send the nsData back to the client. We need to use socket
    socket.emit('nsList', nsData);
})

// Loop the namespace
namespaces.forEach(namespace => {
    // console.log(namespace);
    io.of(namespace.endpoint).on('connection', nsSocket => {
        console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
        // a socket has connected to one of our chatgroup namespaces. send that ns group info back
        nsSocket.emit('nsRoomLoad', namespace.rooms)
        nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallback) => {
            // deal with history
            nsSocket.join(roomToJoin)
            io.of('/google').in(roomToJoin).clients((error, clients) => {
                console.log(clients.length);
                numberOfUsersCallback(clients.length);
            })
        })
        nsSocket.on('newMessageToServer', msg => {
            console.log(msg);
            // send this message to all the sockets
            console.log(nsSocket.rooms)
        })
    })
})