const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
    console.log('a user connected', socket.id);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log('user loggin with user id: ', socket.id, '   meeting id: ', data);
    })
    socket.on("send_message", (data) => {
        console.log("incoming", data)
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});



server.listen(3001, () => {
    console.log('listening on :3001');
});