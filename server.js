const express = require('express');
const app = express();
const mongodb = require('mongodb');
const assert = require('assert');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const http = require('http').Server(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


// mongoose connection

const URL = process.env.URL;

const MongoClient = mongodb.MongoClient;

MongoClient.connect(URL, (err, db) => {
    if (err) console.log('Something went wrong. Error: ' + err);
    console.log('Connected succesfully');
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

const router = require('./routers/router');

app.use(router);

const server = app.listen(PORT, () => console.log('Sever created successfully'));
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        socket.broadcast.emit('fromServer', msg);
    });
});