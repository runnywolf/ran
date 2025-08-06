<template>
	
	<!-- 考卷部分 -->
	<div class="ts-content" :class="{ 'exam-blurred': state === 1 || state === 3 }">
		<template v-for="(sectionBaseName, i) in examConfig.sectionFileBaseNames"><!-- 生成題本的每一題 -->
			
			<!-- 題目 (用有序清單模擬題號) -->
			<ol v-if="sectionBaseName[0] !== '-'"
				:class="`problem-no-${sectionBaseName}`"
				:id="`exam-paper-problem-${sectionBaseName}` /* 用於滾動至某一題 */"
			>
				<li class="ran-problem-font">
					<Problem
						:uni="uni"
						:year="year"
						:no="sectionBaseName"
						:problemConfig="examConfig.problemConfigs[sectionBaseName]"
						:displayMode="state === 0 ? 1 : 0"
					></Problem>
				</li>
			</ol>
			
			<!-- 題本的說明區塊, 不是題目 -->
			<div v-else>
				<Problem :uni="uni" :year="year" :no="sectionBaseName"></Problem><!-- 題號開頭若為 '-', 會隱藏題號, 且沒有解答 -->
			</div>
			
			<!-- 題目之間的分隔線 -->
			<div v-if="i != examConfig.sectionFileBaseNames.length - 1" class="ts-divider is-section"></div>
			
		</template>
	</div>
	
	<!-- 考卷模糊層之上的 ui (開始作答前) -->
	<div v-if="state === 1" class="ts-wrap is-vertical is-middle-aligned exam-cover-ui">
		
		<!-- 題本年份 -->
		<div class="ts-text is-huge is-bold">
			{{ dbConfig.uniConfigs[uni]?.shortName ?? "?" }}&nbsp;&nbsp;{{ year }}
		</div>
		
		<!-- 考試建議 -->
		<div class="ts-list is-unordered">
			<div class="item">
				快速看過全部題目後再開始作答，考試時間為 {{ examConfig.timeMinutes ?? "?" }} 分鐘，請做好配速。
			</div>
			<div class="item">如果有給手寫答案紙，且題本沒有附註「只寫答案即可」，建議附上運算過程。</div>
			<div class="item">簡單題目請先做完，若時間夠，驗算一遍後再做剩餘題目。</div>
		</div>
		
		<!-- 開始作答的按鈕 -->
		<button class="ts-button is-start-icon" @click="emit('click-start-button');">
			<span class="ts-icon is-pen-icon"></span>開始作答
		</button>
		
		<!-- 若題本的解答不完整, 會顯示這則訊息 -->
		<div v-if="!examConfig.isAnswerComplete" class="ts-text is-small is-bold exam-start-warning">
			<span class="ts-icon is-triangle-exclamation-icon"></span>
			這份題本的解答不完整，確定要繼續作答嗎？
		</div>
		
		<!-- 最下面的提示 -->
		<div class="ts-text is-small is-secondary is-italic">
			如果你只想翻閱一下歷屆試題，可以關閉左側選單中的「 測驗模式 」
		</div>
		
	</div>
	
	<!-- 考卷模糊層之上的 ui (考試時間結束) -->
	<div v-if="state === 3" class="ts-wrap is-vertical is-middle-aligned exam-cover-ui">
		<div class="ts-text is-huge is-bold">考試結束</div>
		<button class="ts-button is-start-icon" @click="emit('click-reset-button');">
			<span class="ts-icon is-arrow-rotate-left-icon"></span>重設計時器
		</button>
	</div>
	
</template>

<script setup>
import { watch } from "vue";
import dbConfig from "@/exam-db/config.json"; // 保存所有題本資訊的設定檔
import Problem from "@/components/problem/Problem.vue"; // 用於顯示題目與解答的組件

const props = defineProps({
	uni: String, // 題本的學校英文縮寫
	year: String, // 題本的民國年份
	examConfig: { type: Object, default: {} }, // 題本設定檔
	state: { type: Number, default: 1 }, // 題本的顯示狀態: 0顯示答案, 1作答前, 2正在考試, 3時間結束
});

const emit = defineEmits([
	"click-start-button", // 按下 "開始作答" 的按鈕會觸發
	"click-reset-button" // 按下 "重設計時器" 的按鈕會觸發
]);

const getTextWidth = (text) => { // 計算題號的寬度, 用於向右修正 (by gpt-4.1-mini)
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	ctx.font = '16px "Times New Roman", Times, serif';
	return ctx.measureText(text).width;
};

watch(() => props.examConfig.sectionFileBaseNames, baseNames => {
	if (!baseNames) return;
	
	const problemNoStyle = document.createElement("style"); // 用 js 建立一個用於顯示 marker 題號的 style 區塊 (因為 vue 不允許動態修改 marker)
	document.head.appendChild(problemNoStyle); // 插入至 <head>

	const sheet = problemNoStyle.sheet;
	const insertCss = (css) => sheet.insertRule(css, sheet.cssRules.length);
	baseNames.filter(name => name[0] !== "-").map(name => { // 非說明區塊才有題號
		const problemNoPaddingLeft = getTextWidth(name + ". ") + 5;
		insertCss(`.problem-no-${name} > li::marker { content: "${name}. " }`); // 將自訂的題號 marker 加入到 <style>
		insertCss(`.problem-no-${name} { padding-left: ${problemNoPaddingLeft}px }`); // 因為 li 的編號文字是右側對齊的, 需要向右偏移 (加上 padding-left)
	});
});
</script>

<style scoped>
.exam-blurred { /* 使題本被模糊化 */
	filter: blur(12px);
}
.exam-cover-ui { /* 覆蓋於模糊的題目之上的 ui */
	position: absolute; /* 絕對定位 */
	top: 80px; /* 與考卷頂部的距離 */
	left: 50%; /* 水平置中 */
	transform: translate(-50%, 0); /* 調整 x 座標讓其水平置中 */
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
.exam-start-warning { /* 若題本的解答不完整, 會顯示這則訊息 */
	color: #e90;
	margin-bottom: -16px;
}
</style>
