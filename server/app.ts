import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import bodyParser from "body-parser";
import session from "express-session";

import router from "./routes";
import { errorHandler, message } from "./ioHandlers";

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

const io = new Server(httpServer, {
	cors: {
		origin: "*",
		credentials: true,
	}
});

// let socketIns: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
io.on("connection", (socket) => {
	socket.emit("hello", "world");
	socket.on("send", message);
})
io.on("connect_error", errorHandler);
// io.on("send", (mess) => {
// 	console.log("111", mess);
// });
app.use("/api", router);

httpServer.listen(9999);
