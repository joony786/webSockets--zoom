import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import socketIo from 'socket.io'

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + '/views')
app.use("/public", express.static(__dirname + '/public'));
app.get('/',(_,res)=>res.render('home'));
app.get('/*',(_,res)=>res.redirect('/'));

const handelListeners = () => console.log(`list on https://3000`);

const httpServer = http.createServer(app);

const wsServer = socketIo(httpServer)

wsServer.on('connection',(socket)=>{
    socket.on('enter_room',(msg,done)=>{
        console.log(msg)
        done()
    })
})


httpServer.listen(3000,handelListeners);
