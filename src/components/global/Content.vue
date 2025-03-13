<template>
	<div
		class="ts-box is-start-indicated box"
		:style="{ '--border-color': getBorderColor(), 'background-color': getBgColor() }"
	>
		<div class="ts-content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup> // 內容區塊的組件
const props = defineProps({
	borderColor: { type: String, default: "#aaa" }, // 邊框顏色, 預設為灰色
	bgColor: { type: String, default: "#eee" }, // 背景顏色, 預設為淺灰色
	error: { type: Boolean, default: false }, // 若"錯誤"風格啟用, 會將邊框和背景塗成紅色
});

const getBorderColor = () => { // 決定邊框和分隔線的顏色
	if (props.error) return "#f33"; // "錯誤"風格的邊框顏色
	return props.borderColor;
};

const getBgColor = () => { // 決定背景的顏色
	if (props.error) return "#fdd"; // "錯誤"風格的背景顏色
	return props.bgColor;
};
</script>

<style scoped>
.box {
	border-color: var(--border-color);
	font-family: "noto sans tc"; font-size: 16px;
}
.box:deep(.ts-divider) { /* 如果內容含有分隔線(ts-divider), 將分隔線塗成邊框的顏色 */
	border-color: var(--border-color);
}
</style>
