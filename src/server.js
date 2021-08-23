import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + '/views')
app.use("/public", express.static(__dirname + 'public'));
app.get('/',(_,res)=>res.render('home'));
app.get('/*',(_,res)=>res.redirect('/'));

const handelListeners = () => console.log(`list on https://3000`);

const server = http.createServer(app);
const wsServer = new WebSocket.Server({server});

server.listen(3000,handelListeners);