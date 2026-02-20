<!-- 顯示在題目內的程式碼區塊

範例:
<CodeBlock topMargin bottomMargin><pre>
#define ever ;;
for (ever) {
	programming(); // 任何的縮排都會顯示出來, 所以必須貼齊左側
}
</pre></CodeBlock>

-->

<template>
	<div
		class="ts-wrap is-center-aligned ran-code-font"
		:style="{ 'margin-top': topMargin ? '20px' : '0', 'margin-bottom': bottomMargin ? '20px' : '0' }"
	>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
interface Props {
	topMargin?: boolean, // 頂部的額外間距
	bottomMargin?: boolean, // 底部的額外間距
};

const props = withDefaults(defineProps<Props>(), {
	topMargin: false,
	bottomMargin: false,
});
</script>

<style scoped>
:deep(pre) {
	tab-size: 4; /* \t = 4 space */
}
</style>
