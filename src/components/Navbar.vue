<template>
	<div class="ts-app-navbar navbar">
		<router-link v-for="optionInfo in navbarOptionList"
			class="item"
			:class="getClass(optionInfo.activeRouteNames)"
			:to="{ name: optionInfo.toRouteName }"
		>
			<div :class="`ts-icon is-${optionInfo.iconName}-icon`"></div>
			<div class="label">{{ optionInfo.label }}</div>
		</router-link>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute(); // 路由

/* 導覽列的每個選項的資訊
 * iconName: 選項的圖示 id (font-awesome)
 * label: 選項的文字
 * toRouteName: 點擊後會切換到的路由名稱
 * activeRouteName: 若目前的路由名稱在這個 array 裡, 會使選項變成淺色 (看起來被選取)
 */
const navbarOptionList = [
	{ iconName: "house", label: "首頁", toRouteName: "Home", activeRouteNames: [ "Home" ] },
	{ iconName: "book", label: "筆記", toRouteName: "Notes", activeRouteNames: [ "Notes" ] },
	{ iconName: "file", label: "歷屆試題", toRouteName: "ExamMenu", activeRouteNames: [ "ExamMenu", "Exam" ] },
	{ iconName: "magnifying-glass", label: "搜尋題目", toRouteName: "Search", activeRouteNames: [ "Search" ] },
	{ iconName: "pen", label: "模擬室", toRouteName: "Practice", activeRouteNames: [ "Practice" ] },
	{ iconName: "ellipsis", label: "更多", toRouteName: "Other", activeRouteNames: [ "Other" ] },
];

const getClass = (activeRouteNames) => { // 根據目前的路由名稱讓特定選項看起來被選中
	if (activeRouteNames.includes(route.name)) return "is-active";
	if (activeRouteNames[0] == "Practice" && route.name.includes("Practice")) return "is-active"; // Practice 子頁面的例外處理
	return "";
};
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
