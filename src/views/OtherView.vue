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
	{ iconName: "chart-simple", label: "統計", to: "/other/stat" },
];
</script>
