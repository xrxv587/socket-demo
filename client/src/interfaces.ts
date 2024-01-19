export enum MsgType {
	NOTICE = "NOTICE",
	CHAT = "CHAT"
}

export interface SocketMessage {
	sendId?: string;
	type: MsgType,
	content: string;
}