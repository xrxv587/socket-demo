import { defineStore } from "pinia";
import { Socket } from "socket.io-client";
import { SocketMessage } from "../interfaces";

interface State {
	instance: Socket | null;
	chatRecord: SocketMessage[];
	self: string;
}

export enum MsgType {
	NOTICE = "NOTICE",
	CHAT = "CHAT"
};

export const useSocketStore = defineStore("socketStore", {
	state: (): State => ({
		self: "",
		instance: null,
		chatRecord: []
	}),
	actions: {
		setSelf(self: string) {
			this.self = self;
		},
		setInstance(socketInstance: Socket) {
			this.instance = socketInstance;
		},
		sendMessage(mess: any) {
			const message: SocketMessage = {
				sendId: this.self,
				type: MsgType.CHAT,
				content: mess,
			}
			this.instance?.emit("message", message);
			this.chatRecord.push(message);
		},
		receiveMessage(mess: SocketMessage) {
			this.chatRecord.push(mess);
		},
	}
})