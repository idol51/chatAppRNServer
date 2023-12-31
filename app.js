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
    origin: true
  }
});
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
  res.send({
    port
  });
});

server.listen(port, () => {
  console.log( `Server running at http://localhost:${port}/`);
});

socket(io)