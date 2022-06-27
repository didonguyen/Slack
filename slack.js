const express = require('express');
const app = express();
const socketio = require('socket.io');

let namespaces = require('./data/namespaces.js');
app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);
const io = socketio(expressServer);

io.on('connection', socket => {
    socket.emit('messageFromServer', {data: 'Welcome to socket io!'});
    socket.on('messageFromClient', msg => {
        console.log(msg);
    })
})