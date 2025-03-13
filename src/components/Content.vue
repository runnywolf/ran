<template>
	<div
		class="ts-box is-start-indicated box"
		:style="{
			'border-color': borderColor,
			'background-color': bgColor,
			'--divider-color': borderColor
		}"
	>
		<div class="ts-content a1">
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

<style scoped>
.box {
	font-family: "noto sans tc"; font-size: 16px;
}
.box:deep(.ts-divider) { /* 如果內容含有分隔線(ts-divider), 將分隔線塗成邊框的顏色 */
	border-color: var(--divider-color); /* 分隔線顏色會比邊框淡一點 */
}
</style>
