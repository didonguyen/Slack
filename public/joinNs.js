function joinNs(endpoint) {
    nsSocket = io(`http://localhost:8000${endpoint}`)
    nsSocket.on('nsRoomLoad', nsRooms => {
        let roomList = document.querySelector('.room');
        roomList.innerHTML = '';
        nsRooms.forEach(room => {
            let fa = '';
            room.privateRoom ? fa = 'lock' : fa = 'hashtag'
            roomList.innerHTML += `<span class="room__title"><i class="fa fa-${fa}" aria-hidden="true"></i> ${room.roomTitle}</span>`
        })
        // Add click listener to the room
        let roomNodes = document.getElementsByClassName('room__title');
        Array.from(roomNodes).forEach(elem => {
            elem.addEventListener('click', e => {
                joinRoom(e.target.innerHTML)
            })
        })

        // add Room automatically
        const topRoom = document.querySelector('.room__title');
        const topRoomName = topRoom.innerHTML;
        joinRoom(topRoomName)
    })

    nsSocket.on('messageToClients', msg => {
        console.log(msg);
    })

    document.querySelector('#user-input').addEventListener('submit', event => {
        event.preventDefault();
        const newMessage = document.querySelector('.typing-input').value;
        nsSocket.emit('newMessageToServer', {text: newMessage});
    })
}