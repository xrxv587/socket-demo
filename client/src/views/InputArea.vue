<template>
	<div class="inputArea">
		<textarea v-model="text"></textarea>
		<button>发送</button>
	</div>
</template>
<script lang="ts">
import { ref } from 'vue';

	const text = ref("");
	const send = () => {
		// TODO
	}
</script>
<style lang="less">
@import url(./inputArea.less);
</style>