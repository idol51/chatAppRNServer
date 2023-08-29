const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socket = require('./utils/socket');
const io = new Server(server);
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
  console.log( `Server running at http://localhost:${port}/`);
});

socket(io)