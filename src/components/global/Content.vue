<template>
	<div
		class="ts-box is-start-indicated box"
		:class="collapsed ? 'is-collapsed' : ''"
		:style="{ '--border-color': getBorderColor(), 'background-color': getBgColor() }"
	>
		<div class="ts-content is-dense">
			<slot></slot>
		</div>
	</div>
</template>

<script setup> // 內容區塊的組件
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

const getBorderColor = () => { // 決定邊框和分隔線的顏色
	if (props.colorStyle in style) return style[props.colorStyle].border; // "錯誤"風格的邊框顏色
	return props.borderColor;
};

const getBgColor = () => { // 決定背景的顏色
	if (props.colorStyle in style) return style[props.colorStyle].bg; // "錯誤"風格的背景顏色
	return props.bgColor;
};
</script>

<style scoped>
.box {
	border-color: var(--border-color);
	font-family: "noto sans tc"; font-size: 15px;
}
.box:deep(.ts-divider) { /* 如果內容含有分隔線(ts-divider), 將分隔線塗成邊框的顏色 */
	border-color: var(--border-color);
}
</style>
