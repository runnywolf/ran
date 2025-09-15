<template>
	<component :is="asyncComp" ref="asyncCompWatcher"></component>
</template>

<script setup>
import { computed, defineAsyncComponent, ref, watch } from "vue";
import { walkAndRenderKatex } from "@/libs/vue-katex.js";
import LoadingComp from "./Loading.vue"; // 題目加載組件

const props = defineProps({
	asyncCompPromise: { type: Promise, default: null }, // 動態組件的 promise
	notFoundComp: { type: Object }, // 錯誤組件
});

const getAsyncComp = (promise) => defineAsyncComponent({ // 生成一個動態組件
	loader: () => promise.catch(err => {
		console.error(err.message); // 如果 import 失敗, 在 console 報錯
		return props.notFoundComp; // 回傳錯誤組件
	}),
	loadingComponent: LoadingComp,
	delay: 200, // 顯示"加載組件"前的延遲時間 (防抖動), 預設為 200ms
	errorComponent: props.notFoundComp,
	timeout: 5000, // 超時則顯示錯誤組件
});

const asyncComp = computed(() => { // 動態組件
	if (!props.asyncCompPromise) return null;
	return getAsyncComp(props.asyncCompPromise);
});

const asyncCompWatcher = ref(); // 用於監聽動態組件的元素是否被掛載到 DOM
watch(asyncCompWatcher, watcher => { // 嘗試在父組件得知動態子組件是否載入, 不應該依賴子組件的 onMounted 事件, 因為子組件都是題目模板
	walkAndRenderKatex(watcher?.$el?.parentNode); // 嘗試抓取動態組件的父節點, 若抓得到代表動態組件已掛載至 DOM tree, 接著渲染 katex
});
</script>
