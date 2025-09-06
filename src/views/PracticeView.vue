<template>
	<MenuContent :optionConfigArr="optionConfigArr">
		<div class="ts-content">
			<router-view></router-view>
		</div>
	</MenuContent>
</template>

<script setup>
import MenuContent from "@/components/layout/MenuContent.vue"; // 側邊欄可以切換第二層路由

const optionConfigArr = [
	{ iconName: "rotate-right", label: "遞迴", to: "/practice/recur", tooltip: "齊次 / 非齊次遞迴" },
	/*
	{ iconName: "arrow-down-short-wide", label: "正交化", to: "/practice/gs", tooltip: "Gram-Schmidt 正交化" },
	{ iconName: "not-equal", label: "矛盾方程組", to: "/practice/ic", tooltip: "矛盾方程組求近似解 (投影問題)" },
	{ iconName: "border-top-left", label: "LU 分解", to: "/practice/lu", tooltip: "LU / LDU / PLU 分解" },
	{ iconName: "border-top-left", label: "QR 分解", to: "/practice/qr", tooltip: "QR 分解" },
	{ iconName: "border-top-left", label: "奇異值分解", to: "/practice/svd", tooltip: "SVD 分解" },
	{ iconName: "border-top-left", label: "對角化", to: "/practice/diag", tooltip: "對角化 / 正交對角化 / Jordan Form" },
	*/
];
</script>
