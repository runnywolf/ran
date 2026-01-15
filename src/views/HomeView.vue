<template>
	<div class="ts-box ts-wrap is-vertical is-center-aligned" style="gap: 0">
		
		<!-- 標題 -->
		<div class="title">
			<div class="ts-wrap is-center-aligned is-middle-aligned" style="gap: 16px;">
				<img class="title-logo" src="@/assets/ran.png">
				<span class="ts-text is-bold title-gradient-text" data-tooltip="Yakumo Ran (neta)" data-position="right">
					Ran
				</span>
			</div>
			<div class="ts-text is-medium is-bold">一款用於準備資工所數學的網頁 App</div>
		</div>
		
		<!-- 資訊欄 -->
		<div class="ts-wrap is-vertical is-center-aligned">
			<div v-for="boxGroup in boxGroups" class="ts-wrap">
				<div v-for="{ iconName, texts, clickTargetUrl } in boxGroup"
					class="ts-box info-box" @click="router.push(clickTargetUrl)"
				>
					<div class="ts-content is-horizontally-padded">
						<div class="ts-text is-center-aligned" style="margin-top: -6px;">
							<span :class="`ts-icon is-huge is-${iconName}-icon`"></span>
						</div>
						<div class="ts-list is-unordered is-left-aligned">
							<div v-for="text in texts" class="item">{{ text }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 底部的連結 -->
		<div class="footer">
			<template v-for="({ iconName, text, clickTargetUrl }, i) in footerLinks">
				<span v-if="i !== 0" class="footer-item-divider"></span>
				<span :class="`ts-icon is-end-spaced is-${iconName}-icon is-large`"></span>
				<RanLink :to="clickTargetUrl">{{ text }}</RanLink>
			</template>
		</div>
		
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter(); // 路由器

const boxGroups: { iconName: string, texts: string[], clickTargetUrl: string }[][] = [ // 顯示的多個資訊欄 (網站特點介紹)
	[
		{
			iconName: "file",
			texts: [ "收錄各校的歷屆試題", "重新排版，閱讀更舒適", "盡可能的提供詳解", "帶有計時器的測驗模式" ],
			clickTargetUrl: "/exam",
		},
		{
			iconName: "magnifying-glass",
			texts: [ "搜尋題目的文字片段", "搜尋特定標籤的題目", "搜尋特定學校和年份的題目" ],
			clickTargetUrl: "/search"
		},
		{
			iconName: "pen",
			texts: [ "常見題型的詳解生成器", "隨機出題，加強訓練", "前端即時運算，超低延遲" ],
			clickTargetUrl: "/practice",
		},
	],
];

const footerLinks = [ // 底部的連結
	{ iconName: "github", text: "GitHub", clickTargetUrl: "https://github.com/runnywolf/ran" },
	{ iconName: "discord", text: " 還沒創群組", clickTargetUrl: "#/" },
];
</script>

<style scoped>
.title {
	padding-top: 30px; padding-bottom: 46px;
}
.title-logo {
	width: 50px;
}
.title-gradient-text {
	font-size: 50px;
	background: linear-gradient(90deg, #f90, #840);
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
.footer {
	margin: 30px 0;
}
.footer-item-divider {
	margin: 0 16px;
	border-left: #ccc solid 1px;
}
</style>
