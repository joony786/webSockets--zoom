import http from 'http';
import express from 'express';

const app = express();

app.set('view engine', "pug");
app.set("views", `${__dirname}/views`)
app.use("/public", express.static(`${__dirname}/public`));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const handleListeners = () => console.log(`list on https://3000`);

const httpServer = http.createServer(app);



httpServer.listen(3000, handleListeners);
