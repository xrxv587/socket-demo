import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export type SocketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export const errorHandler = (err: any) => {
	console.error("socket connect error:", err);
}
