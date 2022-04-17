var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var httpServer = require("http").createServer(app);
const { Server } = require("socket.io");

var corsOptions = {
  origin: "https://localhost:8080",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "dist")));

// User
const UserAuthorization = require("./post/user/authorization");
app.post("/api/user/authorization", UserAuthorization);

const UserRegistration = require("./post/user/registration");
app.post("/api/user/registration", UserRegistration);

const io = new Server(httpServer, {
  cors: {
    origin: ["https://127.0.0.1:8080"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(3000);
