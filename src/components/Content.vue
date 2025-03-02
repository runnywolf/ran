<template>
	<div
		class="ts-box is-start-indicated"
		style="font-family: 'noto sans tc'; font-size: 16px;"
		:style="{ 'border-color': borderColor, 'background-color': bgColor }"
	>
		<div class="ts-content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup> // 可折疊內容的組件
const props = defineProps({
	borderColor: String, // 邊框顏色
	bgColor: String, // 背景顏色
});
</script>
