<!-- 顯示在題目內的程式碼區塊, slot 內必須用 <pre> 包裹程式碼 -->

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
