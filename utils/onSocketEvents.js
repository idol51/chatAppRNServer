let rooms = [];
let users = {}

const handleJoinRoom = (socket, data) => {
    console.log('joined user', data);
    const { user_name, room_name } = data;

    if ( !rooms.includes(room_name) ) {
        rooms.push(room_name);
        users[room_name] = [];
    }

    users[room_name].push(user_name);

    console.log(rooms, users);

    socket.join(room_name);

    socket.emit('receive-message', {
        user_name: 'chatBot',
        message: `Welcome ${user_name}!`,
        created_at: Date.now() 
    })

    socket.to(room_name).emit('receive-message', {
        user_name: 'chatBot',
        message: `${user_name} has joined the chat.`,
        created_at: Date.now() 
    });

    socket.emit('active-users', users[room_name]);
    socket.to(room_name).emit('active-users', users[room_name]);
}

const handleSendMessage = (socket, data) => {
    console.log('send message', data);
    const { user_name, message, room_name, created_at } = data;

    socket.emit('receive-message', {
        user_name,
        message,
        created_at
    });

    socket.to(room_name).emit('receive-message', {
        user_name,
        message,
        created_at
    });
}

const handleLeaveRoom = (socket, data) => {
    const { user_name, room_name } = data;

    if ( users[room_name] ) {
        users[room_name] = users[room_name].filter((user) => user !== user_name);

        if ( users[room_name].length === 0 ) {
            delete users[room_name];
            rooms = rooms.filter((room) => room !== room_name)
        }

        socket.to(room_name).emit('active-users', users);

    }


};

module.exports = { handleJoinRoom, handleSendMessage, handleLeaveRoom };