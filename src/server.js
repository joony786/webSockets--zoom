import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + '/views')
app.use("/public", express.static(__dirname + '/public'));
app.get('/',(_,res)=>res.render('home'));
app.get('/*',(_,res)=>res.redirect('/'));

const handelListeners = () => console.log(`list on https://3000`);

const server = http.createServer(app);
const wsServer = new WebSocket.Server({server});

let Sockets = []
wsServer.on('connection',(socket)=>{
    Sockets.push(socket)
    console.log('connected to browser');
    socket.on('close',()=>{
        console.log(`disconnected from browser`);
    })
    
    socket.on('message',(data,isBinary)=>{
        const message = isBinary ? data : data.toString()
        Sockets.forEach((aSocket)=>aSocket.send(message))
    })
});
server.listen(3000,handelListeners);
