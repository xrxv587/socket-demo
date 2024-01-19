<template>
	<div class="chat-container">
		<!-- <div class="receive">
			<p class="name">name</p>
			<div class="msg-container">
				<div class="inner">message: 立卡顺丰航空就很烦客户副科级很快就会橘黄色快递很快就</div>
			</div>
		</div> -->
		<!-- <div class="send">
			<p class="name">我</p>
			<div class="msg-container">
				<div class="inner">我-message</div>
			</div>
		</div> -->
		<div v-for="item in chatRecord">
			<div v-if="item.type === MsgType.CHAT" :class="item.sendId === self ? 'send' : 'receive'">
				<p class="name">{{ item.sendId === self ? "我" : item.sendId }}</p>
				<div class="msg-container">
					<div class="inner">{{ item.content }}</div>
				</div>
			</div>
			<p v-if="item.type === MsgType.NOTICE" class="notice">
				<span>{{ item.content }}</span>
			</p>
		</div>
	</div>
</template>
<style lang="less">
	@import url(./chat.less);
	.notice {
		text-align: center;
		color: #5d5d5d;
		font-size: 12px;
		span {
			display: inline-block;
			background-color: #ddd;
			border-radius: 5px;
			padding: 0 10px;
		}
	}
</style>
<script lang="ts" setup>
	import { MsgType } from '../interfaces';
	import { useSocketStore } from '../store/socket';
	import { storeToRefs } from 'pinia';
	
	const socketStore = useSocketStore();
	const { chatRecord, self} = storeToRefs(socketStore);
</script>