import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export type SocketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export const errorHandler = (err: any) => {
	console.error("socket connect error:", err);
}

export const message = (message: any) => {
	console.log("收到消息：", message);
};
