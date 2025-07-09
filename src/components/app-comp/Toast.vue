<template>
	<div
		class="ts-content is-dense toast" :class="{ 'is-active': display }"
		:style="{ '--color': toastData.color, '--bg-color': toastData.bgColor }"
	>
		<span v-if="toastData.icon"
			class="ts-icon is-end-spaced is-large" :class="`is-${toastData.icon}-icon`"
		></span>
		<span class="ts-text is-bold">{{ toastData.text }}</span>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useSessionStorage } from "@vueuse/core";

const SHOW_TOAST_EVERY_MS = 2000;
const TOAST_STAY_MS = 1600; // 扣除動畫時間, 訊息的顯示時間

const TOAST_STYLES = { // toast 的樣式
	default: { color: "#333", bgColor: "#eee", icon: null },
	info: { color: "#03b", bgColor: "#eef", icon: "circle-info" },
	success: { color: "#075", bgColor: "#efe", icon: "circle-check" },
	warning: { color: "#e80", bgColor: "#ffe", icon: "triangle-exclamation" },
	error: { color: "#d00", bgColor: "#fee", icon: "circle-xmark" },
};

const sessionToastParams = useSessionStorage("app-toast-params"); // 儲存在 session 的彈出訊息資訊
const display = ref(false); // 是否要顯示彈出訊息
const toastData = ref({}); // 彈出訊息的樣式

const toastQueue = []; // 因為短時間觸發的大量訊息無法同時顯示, 所以將 session 的彈出訊息移至這裡
let queueTimer = null; // 控制 queue 消耗的循環時鐘, 預設為 null (代表時鐘不存在)

watch(sessionToastParams, toastParamsText => { // 當 session storage 的提示訊息改變
	if (!toastParamsText) return; // 新訊息若為 null 則不彈出, 因彈出時間結束後會擦除 session 造成的
	
	addToastToQueue(JSON.parse(toastParamsText)); // 將 toast 推入 queue
	sessionToastParams.value = null;
	sessionStorage.removeItem("app-toast-params"); // 擦除 session 的彈出訊息資訊
}, { immediate: true });

function addToastToQueue(toastParams) { // 將需要顯示的訊息 push 到 queue 中, 並開始循環顯示訊息
	toastQueue.push(toastParams); // push queue
	
	if (queueTimer !== null) return; // 時鐘正在循環, 不新建時鐘
	
	showToast(); // setInterval 不會馬上執行, 所以要先顯示一次
	queueTimer = setInterval(() => {
		if (toastQueue.length === 0) deleteTimer(); // queue 為空, 刪除時鐘
		else showToast(); // 否則顯示一則彈出訊息
	}, SHOW_TOAST_EVERY_MS);
}

function showToast() { // 消耗一個 queue 元素, 顯示一則彈出訊息
	const toastParam = toastQueue.shift(); // pop queue
	const toastStyle = TOAST_STYLES[toastParam.type] ?? TOAST_STYLES.default; // 如果樣式不存在, 會使用預設樣式
	toastStyle.text = toastParam.text, // 新增彈出訊息
	toastData.value = toastStyle;
	
	display.value = true; // 顯示訊息
	setTimeout(() => display.value = false, TOAST_STAY_MS); // 開始將訊息框往上拉
}

function deleteTimer() { // 清除時鐘
	clearInterval(queueTimer); // 清除計時器的 interval id
	queueTimer = null; // 代表時鐘不存在
}
</script>

<style scoped>
.toast {
	position: fixed; /* 相對於瀏覽器視窗定位 */
	top: 10px; /* 距離頂部 20px */
	left: 50%; /* 水平置中 */
	transform: translate(-50%, -100px); /* 透過 transform 水平置中並移出畫面外 */
	border: 2px solid; border-color: var(--color); border-radius: 4px;
	background-color: var(--bg-color);
	text-align: center; color: var(--color);
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
	z-index: 9999; /* 確保在最上層 */
	transition: transform 200ms ease-in-out; /* 加入滑動動畫 */
	pointer-events: none; /* 不攔截滑鼠事件 */
}
.is-active {
	transform: translate(-50%, 0); /* 顯示時，移動到定位點 */
}
</style>
