import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import bodyParser from "body-parser";
import session from "express-session";

import router from "./routes";

const app = express();
const httpServer = createServer(app);

app.set("trust proxy", 1);
app.use(session({
	secret: "chatroom",
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false
	}
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", (req, res, next) => {
	if (req.url === "/init") {
		console.log("yes!! initialing");
	}
	next();
}, router);

let socketList: any = {};


const io = new Server(httpServer, {
	cors: {
		origin: "*"
	}
});

// 整个应用只开启一个socket，所有人都在里面
let socketIns: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

io.on("connection", (socket) => {
  socketIns = socket;
  socket.emit("hello", "world");
  socket.emit("message", "socket");
  socket.on("send", (mess: any) => {
	  console.log(mess);
  });
});
// io.on("message", ())

httpServer.listen(9999);
