<template>
	<div ref="bottomElement"></div><!-- 隱形元素, 用來判斷是否要載入元素 -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const emit = defineEmits<{
	(e: "onEntry"): void // 當隱形元素出現在頁面上, 則觸發
}>();

let observer: IntersectionObserver | null = null;
const bottomElement = ref<HTMLElement>(); // 題目清單尾端的隱形元素, 用來判斷是否要載入元素

onMounted(() => {
	observer = new IntersectionObserver(([entry]) => { // 當題目清單尾端的隱形元素顯示在螢幕上時, 增加顯示的題目數
		if (entry.isIntersecting) emit("onEntry"); // 當隱形元素出現在頁面上, 則觸發
	});
	if (bottomElement.value) observer.observe(bottomElement.value);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>
