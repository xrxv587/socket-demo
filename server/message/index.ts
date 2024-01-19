type MsgType = "notice" | "chat";
interface Message {
	type: MsgType;
	id: string;
	content: string
}