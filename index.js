var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var httpServer = require("http").createServer(app);
const { Server } = require("socket.io");
const uuid = require("uuid");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "dist")));

var io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.engine.generateId = (req) => {
  return uuid.v4();
};

io.on("connection", (socket) => {
  socket.join("all");
});

global.io = io;

// User
const UserAuthorization = require("./post/user/authorization");
app.post("/api/user/authorization", UserAuthorization);

const UserRegistration = require("./post/user/registration");
app.post("/api/user/registration", UserRegistration);

httpServer.listen(3000);
