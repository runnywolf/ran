<template>
	<VueLatex :expression="exp" :displayMode="c" class="vue-latex" />
</template>

<script setup> // 壓縮 vatex 標籤字符數的組件
import { VueLatex } from "vatex";

const props = defineProps({
	exp: { type: String, default: "?" }, // latex 表達式
	c: { type: Boolean, default: false } // 是否置中
});
</script>

<style scoped>
.vue-latex:deep(.katex) { /* latex 文字的 override style */
	white-space: nowrap; /* 禁止換行 */
	margin: 0 3px; /* 讓 latex 標籤與內文的間距再大一點 */
}
</style>
