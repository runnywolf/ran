<template>
	<component :is="c ? 'div' : 'span'" ref="katexElement" class="vl"></component>
</template>

<script setup>
import { watch, ref } from "vue";
import katex from "katex"; // Tex lib
import "katex/dist/katex.min.css"; // KaTex css

const props = defineProps({
	exp: { type: String, default: "?" }, // latex 表達式
	c: { type: Boolean, default: false } // 是否置中
});

const katexElement = ref(null); // 渲染 katex 語法的 dom 元素

watch(() => [katexElement.value, props.exp], ([katexElement, newExp]) => {
	newExp = newExp.replace(/[\r\n\t]/g, ""); // 移除換行和 tab
	katex.render(newExp, katexElement, { displayMode: props.c, throwOnError: false }); // 渲染 katex 元素
}, { deep: true });
</script>

<style scoped>
.vl {
	font-size: 16px;
}
span.vl {
	white-space: nowrap; /* 禁止換行 */
	margin: 0 3px; /* 讓 latex 標籤與內文的間距再大一點 */
}
div.vl { /* 當 vl c 內的 latex 語法超出父 div 的寬度時, 出現滾動條 */
	overflow-x: auto;
}
</style>
