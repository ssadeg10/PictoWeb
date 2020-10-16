const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const formatMssg = require('./public/utils/messages');
const formatColor = require('./public/utils/colors');
const {userJoin, getCurrentUser} = require('./public/utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//static folder (html)
app.use(express.static(path.join(__dirname, 'public')));

//run on client connection
io.on('connection', (socket)=>{

    socket.on('joinChat', ({username, color})=> {
        const user = userJoin(socket.id, username, color);

        socket.join();

        //user welcome message
        socket.emit('mssg', 'Welcome to PictoWeb!');
        socket.emit('canvasProp', getCurrentUser(socket.id), formatColor(user.color));

        //broadcast on user connection
        socket.broadcast.emit('mssg', `Now entering: ${user.username}`);
    });

    //listen for emit canvasMssg
    socket.on('canvasMssg', (mssg)=>{
        const user = getCurrentUser(socket.id);
        io.emit('canvasMssg', formatMssg(user.username, user.color, mssg));
    });

    //run on client disconnect
    socket.on('disconnect', ()=>{
        const user = getCurrentUser(socket.id);
        io.emit('mssg', `Now leaving: ${user.username}`);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));