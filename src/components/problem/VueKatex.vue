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
