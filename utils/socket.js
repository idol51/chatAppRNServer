const { handleJoinRoom, handleSendMessage, handleLeaveRoom } = require("./onSocketEvents");


function socket (io) {
    io.on('connection', (socket) => {
        console.log('User connected',socket.id);

        socket.on('join-room', (data) => handleJoinRoom(socket, data));

        socket.on('send-message', (data) => handleSendMessage(socket, data));

        socket.on('leave-room', (data) => handleLeaveRoom(socket, data));
    })
}

module.exports = socket;