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
import { useSocketStore } from "./store/socket";

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
	socket.on("hello", (arg) => {
		console.log(arg); // world
	});
	socket.emit("send", "heyhey")
	// socket.on("message", (mess) => {
	// 	console.log(mess); 
	// });
})
</script>