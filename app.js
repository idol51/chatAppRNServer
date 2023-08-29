const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socket = require('./utils/socket');

const io = new Server(server, {
  cors: {
    origin: 'http://192.168.3.125:8081'
  }
});
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
  console.log( `Server running at http://localhost:${port}/`);
});

socket(io)