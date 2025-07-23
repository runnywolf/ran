<template>
	<div class="ts-box ts-wrap is-vertical is-center-aligned home-page">
		<div class="ts-text is-bold is-center-aligned title" style="gap: 0;">
			<div>
				<span>🦊</span>
				<span class="title-gradient-text" data-tooltip="Yakumo Ran (neta)" data-position="right">Ran</span>
			</div>
			<div class="ts-text is-medium">一款用於準備資工所數學的網頁 App</div>
		</div>
		<div class="ts-wrap">
			<div class="ts-box info-box" @click="router.push('/exam')">
				<div class="ts-content is-horizontally-padded">
					<div class="ts-text is-center-aligned box-info-icon-margin-fix">
						<span class="ts-icon is-huge is-file-icon"></span>
					</div>
					<div class="ts-list is-unordered is-left-aligned">
						<div class="item">收錄各校的歷屆試題</div>
						<div class="item">重新排版，閱讀更舒適</div>
						<div class="item">盡可能的提供詳解</div>
						<div class="item">帶有計時器的測驗模式</div>
					</div>
				</div>
			</div>
			<div class="ts-box info-box" @click="router.push('/practice')">
				<div class="ts-content is-horizontally-padded">
					<div class="ts-text is-center-aligned box-info-icon-margin-fix">
						<span class="ts-icon is-huge is-pen-icon"></span>
					</div>
					<div class="ts-list is-unordered is-left-aligned">
						<div class="item">常見題型的詳解生成器</div>
						<div class="item">隨機出題，加強訓練</div>
						<div class="item">前端即時運算，超低延遲</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter(); // 路由器
</script>

<style scoped>
.home-page {
	padding-bottom: 20px;
}
.title {
	padding: 30px 0;
	font-size: 50px;
}
.title-gradient-text {
	margin-left: 4px;
	background: linear-gradient(90deg, #ff9900, #804400);
	background-clip: text;
	-webkit-text-fill-color: transparent;
}
.info-box {
	background-color: #eee;
}
.info-box:hover {
	background-color: #def;
	transition: background-color 0.1s ease-in-out;
}
.box-info-icon-margin-fix {
	margin-top: -6px;
}
</style>
