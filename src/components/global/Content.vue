<template>
	<div
		class="ts-box is-start-indicated box" :class="{ 'is-collapsed': collapsed }"
		:style="{ '--border-color': borderColorShowed, '--bg-color': bgColorShowed }"
	>
		<div class="ts-content is-dense">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";

const style = {
	gray: { border: "#aaa", bg: "#eee" },
	blue: { border: "#7af", bg: "#def" },
	red: { border: "#f33", bg: "#fdd" },
	green: { border: "#4c4", bg: "#dfd" },
};

const props = defineProps({
	borderColor: { type: String, default: "#aaa" }, // 邊框顏色, 預設為灰色
	bgColor: { type: String, default: "#eee" }, // 背景顏色, 預設為淺灰色
	colorStyle: { type: String, default: null }, // 顏色風格
	collapsed: { type: Boolean, default: false }, // 若啟用, 內容區塊不會自動水平延伸
});

const borderColorShowed = computed(() => {
	if (props.colorStyle in style) return style[props.colorStyle].border; // 若風格存在, 會無視參數 borderColor 的邊框顏色
	return props.borderColor;
});

const bgColorShowed = computed(() => {
	if (props.colorStyle in style) return style[props.colorStyle].bg; // 若風格存在, 會無視參數 borderColor 的邊框顏色
	return props.bgColor;
});
</script>

<style scoped>
.box {
	border-color: var(--border-color);
	background-color: var(--bg-color);
	font-family: "noto sans tc"; font-size: 15px;
}
.box:deep(.ts-divider) { /* 如果內容含有分隔線(ts-divider), 將分隔線塗成邊框的顏色 */
	border-color: var(--border-color);
}
</style>
