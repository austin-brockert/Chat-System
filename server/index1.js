const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const app = express();
require('dotenv').config();
const { MongoDB_URL, PORT } = process.env;
const cookieParser = require('cookie-parser');
const authRoute = require("./Routes/AuthRoute");

const server = http.createServer(app);
const io = socketio(server);

mongoose.connect(MongoDB_URL)
.then(() => {
    console.log('MongoDB connected successfully')
})
.catch((error) => {
    console.error('Error connecting to MongoDB : ', error )
});

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected!`);

    socket.on('sendMessage', (message) => {
        console.log(message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`)
    })
})

const port = parseInt(PORT, 10) || 5000;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.use(cors({
    origin : "http://localhost:3000",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute);


