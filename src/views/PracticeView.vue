<template>
	<BodyLayout>
		
		<!-- 左側的練習項目 -->
		<template #sidebar>
			<div class="ts-content is-compact ts-menu is-dense is-separated is-start-icon">
				<router-link v-for="{ iconName, label, tooltip, toPath } in sidebarOptionList"
					class="item"
					:class="{ 'is-active': route.path === toPath }"
					:to="toPath"
					:data-tooltip="tooltip"
					data-position="right"
				>
					<span :class="`ts-icon is-${iconName}-icon`"></span>
					<span>{{ label }}</span>
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

const sidebarOptionList = [
	{ iconName: "rotate-right", label: "遞迴", tooltip: "齊次 / 非齊次遞迴", toPath: "/practice/recur" },
	/*
	{ iconName: "arrow-down-short-wide", label: "GS 正交化", tooltip: "Gram-Schmidt 正交化", toPath: "/practice/gs" },
	{ iconName: "not-equal", label: "矛盾方程組", tooltip: "矛盾方程組求近似解 (投影問題)", toPath: "/practice/ic" },
	{ iconName: "border-top-left", label: "LU 分解", tooltip: "LU / LDU / PLU 分解", toPath: "/practice/lu" },
	{ iconName: "border-top-left", label: "QR 分解", tooltip: "QR 分解", toPath: "/practice/qr" },
	{ iconName: "border-top-left", label: "奇異值分解", tooltip: "SVD 分解", toPath: "/practice/svd" },
	{ iconName: "border-top-left", label: "對角化", tooltip: "對角化 / 正交對角化 / Jordan Form", toPath: "/practice/diag" },
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
