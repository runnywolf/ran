<template>
	<BodyLayout>
		
		<!-- 左側的練習項目 -->
		<template #sidebar>
			<div class="ts-content is-compact ts-menu is-dense is-separated is-start-icon">
				<router-link v-for="optionInfo in navbarOptionList"
					class="item"
					:class="route.name == optionInfo.toRouteName ? 'is-active' : ''"
					:to="{ name: optionInfo.toRouteName }"
					:data-tooltip="optionInfo.tooltip"
					data-position="right"
				>
					<span :class="`ts-icon is-${optionInfo.iconName}-icon`"></span>
					<span>{{ optionInfo.label }}</span>
				</router-link>
			</div>
		</template>
		
		<!-- 右側的模擬室區域 -->
		<template #content>
			<div class="ts-content">
				<router-view></router-view>
			</div>
		</template>
		
	</BodyLayout>
</template>

<script setup>
import { useRoute } from "vue-router";
import BodyLayout from "@/components/BodyLayout.vue"; // 用於建構 body 的 sidebar 與內容

const route = useRoute(); // 路由

const navbarOptionList = [
	{
		iconName: "rotate-right",
		label: "遞迴",
		tooltip: "齊次 / 非齊次遞迴",
		toRouteName: "PracticeRecur"
	},
	/*
	{
		iconName: "arrow-down-short-wide",
		label: "GS 正交化",
		tooltip: "Gram-Schmidt 正交化",
		toRouteName: "PracticeGs"
	},
	{
		iconName: "not-equal",
		label: "矛盾方程組",
		tooltip: "矛盾方程組求近似解 (投影問題)",
		toRouteName: "PracticeInconsis"
	},
	{
		iconName: "border-top-left",
		label: "LU 分解",
		tooltip: "LU / LDU / PLU 分解",
		toRouteName: "PracticeLu"
	},
	{
		iconName: "border-top-left",
		label: "QR 分解",
		tooltip: "QR 分解",
		toRouteName: "PracticeQr"
	},
	{
		iconName: "border-top-left",
		label: "奇異值分解",
		tooltip: "SVD",
		toRouteName: "PracticeSvd"
	},
	{
		iconName: "border-top-left",
		label: "對角化",
		tooltip: "對角化 / 正交對角化 / Jordan Form",
		toRouteName: "PracticeDiag"
	},
	*/
];
</script>

<style scoped>
.ts-menu > a {
	padding: 0 9px;
	gap: 9px;
}
.ts-menu > a:not(.is-active):hover { /* 沒有被選取的項目被 hover 時, 將背景變灰 */
	background-color: #eee;
}
</style>
