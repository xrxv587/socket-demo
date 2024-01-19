<template>
	<div class="inputArea">
		<textarea v-model="text"></textarea>
		<button @click="send">发送</button>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useSocketStore } from '../store/socket';

const socketStore = useSocketStore();

const text = ref("");
const send = () => {
	socketStore.sendMessage(text.value);
	text.value = "";
}
</script>
<style lang="less">
@import url(./inputArea.less);
</style>