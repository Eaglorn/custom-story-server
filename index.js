var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var http = require("http").createServer(app);

var corsOptions = {
  origin: "*",
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

http.listen(4000);
