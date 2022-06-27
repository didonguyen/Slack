
const socket = io('http://localhost:8000');
socket.on('messageFromServer', dataFromServer => {
    console.log(dataFromServer);
    socket.emit('messageFromClient', {data: 'This is from the client'})
})