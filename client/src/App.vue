<template>
	<div class="app-container">
  		<Chat />
		<InputArea />
	</div>
</template>
<style lang="less">
.app-container {
	width: 700px;
	height: 700px;
	background-color: #eee;
	box-shadow: 0 0 10px rgba(0, 0, 0, .5);
}
</style>
<script setup lang="ts">
import Chat from "./views/Chat.vue";
import InputArea from "./views/InputArea.vue";
import { onMounted } from 'vue';
import { io } from "socket.io-client";
import request from "./util/request";
import { MsgType, useSocketStore } from "./store/socket";
import { SocketMessage } from "./interfaces";

const store = useSocketStore();

onMounted(async () => {
	await request.post("/init").then(res => console.log(res));
	await request.get("/getUser").then(res => console.log(res));

	const socket = io("ws://localhost:9999", {
		extraHeaders: {
			"auth": "aaaaaa"
		}
	});
	store.setInstance(socket);
	
	socket.on("message", (mess: SocketMessage) => {
		console.log("新消息：", mess); 
		store.receiveMessage(mess);
	});
	socket.on("connect", () => {
		store.setSelf(socket.id);
		const content: SocketMessage = {
			sendId: socket.id,
			type: MsgType.NOTICE,
			content: "-新用户进入房间-"
		}
		socket.emit("new_user", content);
	});
	socket.on("notice", (mess: SocketMessage) => {
		store.receiveMessage(mess);
	})
})
</script>