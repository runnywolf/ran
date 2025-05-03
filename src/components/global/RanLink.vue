<template>
	
	<!-- props.to 開頭帶有 "#" 會被當成路由路徑 -->
	<router-link v-if="isUrlInApp"
		:to="url"
		:target="newTab ? '_blank' : '_self'"
		:data-tooltip="tooltip"
		class="hyperlink"
	>
		<slot></slot>
	</router-link>
	
	<!-- props.to 開頭不是 "#" 會被視為一般網址, 且強制另開新分頁 -->
	<a v-else
		:href="url"
		target="_blank"
		:data-tooltip="tooltip"
		class="hyperlink"
	>
		<slot></slot>
	</a>
	
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
	to: { type: String, default: "/" }, // 跳轉網址
	tooltip: { type: String, default: null }, // 工具提示 (hover 會顯示的訊息)
	newTab: { type: Boolean, default: false }, // 是否另開新分頁 (外部連結會強制另開新分頁)
});

const isUrlInApp = ref(true); // 網址是否在 app 內
const url = ref("#/"); // 處理過後的網址

watch(() => props.to, (newUrl) => {
	if (typeof newUrl !== "string") newUrl = "#/"; // 當 to 的網址不為字串或為空字串, 會跳轉至 ran 首頁
	if (newUrl.length === 0) newUrl = "#/";
	
	isUrlInApp.value = (newUrl[0] === "#"); // url 首字母為 # 會被當成路由字串
	if (isUrlInApp.value) newUrl = newUrl.slice(1); // 去除 url 的首字母
	
	url.value = newUrl;
}, { immediate: true });
</script>

<style scoped>
.hyperlink { /* 超連結樣式 (藍色) */
	text-decoration: none; /* 隱藏超連結的底線 */
	color: #44f;
}
.hyperlink:hover { /* hover 變成紫色 */
	color: #f3f;
}
</style>
