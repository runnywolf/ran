<template>
	<component :is="c ? 'div' : 'span'" class="ran-vk" ref="katexNode"></component>
</template>

<script setup>
import { watch, ref } from "vue";
import { renderKatex } from "@/libs/vue-katex";

const props = defineProps({
	exp: { type: String, default: "?" }, // latex 表達式
	c: { type: Boolean, default: false } // 是否置中
});

const katexNode = ref(null);

watch(() => [katexNode.value, props.exp], ([node, exp]) => { // 如果 watch () => [props.exp, props.c] 會炸, wtf
	exp = exp.replace(/[\r\n\t]/g, ""); // 移除換行和 tab
	renderKatex(node, exp, props.c); // 渲染 katex
}, { deep: true });
</script>
