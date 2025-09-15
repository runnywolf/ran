<template>
	<div class="ts-wrap is-vertical" :class="{ 'hide-problem-score': hideProblemScore }">
		
		<!-- 題目 -->
		<div class="ran-problem-font">
			<AutoKatexRenderer :asyncCompPromise="sectionCompPromise" :notFoundComp="SectionNotFound">
			</AutoKatexRenderer>
		</div>
		
		<div v-if="props.no[0] !== '-'" class="ts-wrap is-compact is-vertical content"><!-- 開頭為 "-" 的 section 不是題目, 無詳解 -->
			
			<!-- 綠色答案框 & 詳解連結 -->
			<div class="ts-wrap">
				<AnswerBox v-if="showAnswer" :answerLatex="props.problemConfig.answerLatex"><!-- 綠色答案框 -->
				</AnswerBox>
				<RanLink v-if="showLink" class="problem-view-link" :to="`#/exam/${uni}-${year}/${no}`"><!-- 詳解連結-->
					詳解
				</RanLink>
			</div>
			
			<!-- 多個 content box (包含詳解) -->
			<template v-if="showContent" v-for="({ type, suffix }, i) in problemConfig.contentConfigs">
				
				<!-- 詳解類型的內容區塊 -->
				<Content v-if="type === 'answer'" colorStyle="blue">
					<details class="ts-accordion">
						<summary>詳解 {{ suffix }}</summary>
						<AutoKatexRenderer :asyncCompPromise="contentCompPromises[i]" :notFoundComp="ContentNotFound">
						</AutoKatexRenderer><!-- 詳解 -->
					</details>
				</Content>
				
				<!-- 預設的內容區塊 -->
				<Content v-else-if="type === 'default'">
					<AutoKatexRenderer :asyncCompPromise="contentCompPromises[i]" :notFoundComp="ContentNotFound">
					</AutoKatexRenderer>
				</Content>
				
				<!-- 若內容區塊的類型填錯, 顯示錯誤訊息 -->
				<Content v-else colorStyle="red">錯誤的內容區塊類型 ٩(ŏ﹏ŏ、)۶</Content>
				
			</template>
			
		</div>
		
	</div>
</template>

<script setup>
import { ref, watchEffect, computed } from "vue";
import { getSectionComp, getAllContentComps } from "@/exam-db/examLoader.js"; // 讀取題本資訊
import AnswerBox from "./problem-comp/AnswerBox.vue"; // 綠色答案框的組件
import AutoKatexRenderer from "./problem-comp/AutoKatexRenderer.vue"; // 產生動態組件, 並在組件載入時自動渲染 katex node
import SectionNotFound from "./problem-comp/SectionNotFound.vue";
import ContentNotFound from "./problem-comp/ContentNotFound.vue";

const props = defineProps({
	uni: String, // 題本的學校英文縮寫
	year: String, // 題本的民國年份
	no: { type: String, default: "" }, // 題號
	problemConfig: { type: Object, default: {} }, // 題目的設定檔, 位於 config.problemConfigs.<no> 內
	hideProblemScore: { type: Boolean, default: false }, // 是否顯示題目的配分
	showAnswer: { type: Boolean, default: false }, // 顯示綠框答案
	showLink: { type: Boolean, default: false }, // 顯示 "詳解" 按鈕
	showContent: { type: Boolean, default: false }, // 顯示內容區塊 (包含詳解)
});

const sectionCompPromise = computed(() => { // 區塊(題目)組件 (promise)
	const { uni, year, no } = props;
	if (!(uni && year && no)) return null;
	return getSectionComp(uni, year, no);
});

const contentCompPromises = ref([]); // 內容(解答)組件 (promise arr)
watchEffect(async () => {
	const { uni, year, no, problemConfig } = props;
	
	if (!(uni && year && no) || !props.showContent) { // 不顯示 contents, 不用載入
		contentCompPromises.value = [];
		return;
	}
	
	try {
		contentCompPromises.value = await getAllContentComps(uni, year, no, problemConfig);
	} catch (err) {
		console.error(err.message); // 在 console 報錯
		contentCompPromises.value = [];
	}
});
</script>

<style scoped>
.problem-view-link { /* 詳解連結按鈕 (為了實現中鍵另開分頁, 由 button 改為 RanLink) */
	border-radius: 6px;
	background-color: var(--ts-gray-800);
	width: 72px; height: 36px;
	font-size: 14px; font-weight: 500; color: white !important;
	display: flex; justify-content: center; align-items: center;
}
.problem-view-link:hover { /* 詳解連結按鈕 hover 時, 使按鈕稍微變亮 */
	background-color: var(--ts-gray-700);
}
.content {
	line-height: 30px; /* 內容區塊(解答) 文字的行距 */
}
.content .problem-view-link {
	line-height: 0px; /* 防止 line-height: 30px; 作用於 "詳解" 按鈕上 */
}
</style>
