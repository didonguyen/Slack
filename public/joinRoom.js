function joinRoom(roomName) {
    // Send this roomName to the server!
    document.querySelector('.title__room-name').innerHTML = roomName;
    nsSocket.on('joinRoom', roomName, (newNumerOfMembers) => {
        // we want to update number of users
        document.querySelector('.title__number-users').innerHTML = `${newNumerOfMembers} <i class="fa fa-user" aria-hidden="true"></i>`;
    });
}