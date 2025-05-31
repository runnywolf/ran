<template>
	<component :is="c ? 'div' : 'span'" v-html="renderedExpHtml" class="vl"></component>
</template>

<script setup>
import { computed } from "vue";
import katex from "katex"; // Tex lib
import "katex/dist/katex.min.css"; // KaTex css

const props = defineProps({
	exp: { type: String, default: "?" }, // latex 表達式
	c: { type: Boolean, default: false } // 是否置中
});

const renderedExpHtml = computed( // 渲染 KaTex 語法
	() => katex.renderToString(props.exp, { displayMode: props.c, throwOnError: false })
);

</script>

<style scoped>
.vl {
	font-size: 16px;
}
span.vl {
	white-space: nowrap; /* 禁止換行 */
	margin: 0 3px; /* 讓 latex 標籤與內文的間距再大一點 */
}
</style>
