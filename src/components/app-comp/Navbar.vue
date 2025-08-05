<template>
	<div class="ts-app-navbar navbar">
		<router-link v-for="optionInfo in navbarOptionList"
			class="item"
			:class="{ 'is-active': route.path.split('/')[1] === optionInfo.toPath }"
			:to="`/${optionInfo.toPath}`"
		>
			<div :class="`ts-icon is-${optionInfo.iconName}-icon`"></div>
			<div class="label">{{ optionInfo.label }}</div>
		</router-link>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute(); // 路由

// 導覽列的每個選項的資訊
// iconName: 選項的圖示 id (font-awesome)
// label: 選項的文字
// toPath: 點擊後會切換到的第一層路徑
const navbarOptionList = [
	{ iconName: "house", label: "首頁", toPath: "" },
	{ iconName: "book", label: "筆記", toPath: "notes" },
	{ iconName: "file", label: "歷屆試題", toPath: "exam" },
	{ iconName: "magnifying-glass", label: "搜尋題目", toPath: "search" },
	{ iconName: "pen", label: "模擬室", toPath: "practice" },
	{ iconName: "ellipsis", label: "更多", toPath: "other" },
];
</script>

<style scoped>
.navbar {
	padding: 4px 0;
	background-color: #7af;
	display: flex; justify-content: center; /* 置中項目 */
}
.navbar > a {
	width: 80px; min-width: 80px; height: 60px;
	margin: 0 3px;
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
	color: #eef;
}
.navbar > a:hover {
	background-color: #fff2; /* 如果滑鼠懸停在項目按鈕上, 稍微變白 */
	border-radius: 4px;
}
.navbar > a.is-active {
	background-color: #fff4; /* 如果項目按鈕被選中, 變更白 */
	border-radius: 4px;
	color: #fff;
}
</style>
