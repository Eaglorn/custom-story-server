import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import hs from "http";
import { Server } from "socket.io";
import { AppDataSource } from "./dataSource";

const app: Express = express();
const httpServer = hs.createServer(app);

AppDataSource.initialize()
  .then(async () => {
    console.log("AppDataSource initialize.");
  })
  .catch((error) => console.log(error));

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "dist")));

// User
import { UserAuthorization } from "./post/user/Authorization";
app.post("/api/user/authorization", UserAuthorization);

import { UserRegistration } from "./post/user/Registration";
app.post("/api/user/registration", UserRegistration);

const io = new Server(httpServer, {
  cors: {
    origin: ["https://localhost:8080", "https://localhost:5000"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(8080);

console.log("Server listen 8080 port.");
