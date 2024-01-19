import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import bodyParser from "body-parser";
import session from "express-session";

import router from "./routes";
import { errorHandler } from "./ioHandlers";

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
const ROOM = "ROOM";
io.on("connection", (socket) => {
	socket.join(ROOM);
	socket.on("message", (mess: any) => {
		console.log("receive message=>", mess);
		socket.to(ROOM).emit("message", mess);
	});
	socket.on("new_user", (mess: any) => {
		socket.to(ROOM).emit("notice", mess);
	});
})
io.on("connect_error", errorHandler);
app.use("/api", router);

httpServer.listen(9999);
