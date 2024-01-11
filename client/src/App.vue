<template>
  homepage
  <input type="text" v-model="msg">
  <button @click="send">send</button><br />
  <input type="text" v-model="text" />
  <button @click="sendText">添加记录到消息通道</button>
</template>
<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from 'vue';
import { io } from "socket.io-client";
let socket = null;

const msg = ref("");
const text = ref("");
const send = () => {
	console.log(msg.value);
	socket!.emit("send", msg.value);
}
const sendText = () => {
	axios.post("/api/say", { text: text.value });
}
onMounted(() => {
	axios("/api");
	socket = io("http://localhost:9999", {
		extraHeaders: {
			"auth": "aaaaaa"
		}
	});
	socket.on("hello", (arg) => {
		console.log(arg); // world
	});
	socket.on("message", (mess) => {
		console.log(mess); 
	});
})
</script>