<template>
	<div class="app-container">
  		<Chat />
		<InputArea />
	</div>
</template>
<style lang="less" scoped>
.app-container {
	box-shadow: rgba(0,0,0,.4) 0 0 20px;
	background-color: #f5f7fa;
	width: 750px;
	height: 650px;
	overflow-x: auto;
}
</style>
<script setup lang="ts">
import InputArea from "./views/InputArea.vue";
import Chat from "./views/Chat.vue";
import { onMounted } from 'vue';
import { io } from "socket.io-client";
import request from "./util/request";
import { useSocketStore } from "./store/socket";

const store = useSocketStore();

onMounted(() => {
	request.post("/init").then(res => console.log(res));
	request.get("/getUser").then(res => console.log(res));

	const socket = io("ws://localhost:9999", {
		extraHeaders: {
			"auth": "aaaaaa"
		}
	});
	store.setInstance(socket);
	socket.on("hello", (arg) => {
		console.log(arg); // world
	});
	// socket.on("message", (mess) => {
	// 	console.log(mess); 
	// });
})
</script>