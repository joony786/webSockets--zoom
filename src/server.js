import http from 'http';
import express from 'express';
import socketIo from 'socket.io'

const app = express();

app.set('view engine', "pug");
app.set("views", `${__dirname}/views`)
app.use("/public", express.static(`${__dirname}/public`));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const handleListeners = () => console.log(`list on https://3000`);

const httpServer = http.createServer(app);

const wsServer = socketIo(httpServer);

function publicRooms() {
    const {sockets: {adapter: {rooms, sids}}} = wsServer
    const publicRoom = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            publicRoom.push(key)
        }
    })
    return publicRoom
}

function countRooms(roomName) {
    const a = wsServer.sockets.adapter.rooms.get(roomName)?.size
    console.log(a)
    return a
}

wsServer.on('connection', (socket) => {
    //log all sockets events happening
    socket.name = 'annoo';
    socket.onAny(event => console.log(`Socket Event: ${event}`));
    socket.on("disconnect", () => {
        console.log(`SocketDisconnected ${socket.id}`)
       wsServer.sockets.emit('room_changed', publicRooms())
    });
    //When someone Joins the room fire this event
    socket.on('enter_room', (room, done) => {
        console.log(room)
        console.log(socket.name)
        socket.join(room)
        done();
        socket.to(room).emit('welcome',socket.name,countRooms(room));
        wsServer.sockets.emit('room_changed', publicRooms())
    })
    // when someone leaves the room fire this event
    socket.on('disconnecting', () => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                socket.to(room).emit("left", socket.name, countRooms(room));
            }
        }
        wsServer.sockets.emit('room_changed', publicRooms())
        // socket.rooms.forEach(room => {
        //     socket.to(room).emit('left');
        // });
    })

    // send msg across rooms
    socket.on('send_message', (msg, room, done) => {
        socket.to(room).emit('send_message', msg);
        done();
    })
})


httpServer.listen(3000, handleListeners);
