<!-- 用於渲染 katex 數學公式
與 Vl.vue 不同, 此組件會在頁面載入時對 slot 內遞迴渲染 $...$ 和 $$...$$ 內的語法 (只做一次)
-->

<template>
	<div ref="nodeRendered">
		<slot></slot>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { walkAndRenderKatex } from "@/libs/vue-katex";

const nodeRendered = ref(null);

onMounted(() => walkAndRenderKatex(nodeRendered.value));
</script>
