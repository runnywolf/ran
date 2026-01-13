<!-- 用來顯示題目的組件, 會附帶很多 ui 可以選擇要不要顯示

這些組件需要顯示的 ui:
| ExamPaper (exam mode)   |
| ExamPaper (!exam mode)  | showAnswer showLink
| ProblemView             | hideProblemScore showAnswer showContent
| SearchResult, SavedPage | hideProblemScore showLink topRow
| NotePage (future)       | hideProblemScore showLink topRow
-->

<template>
	<div class="ts-wrap is-vertical" :class="{ 'hide-problem-score': hideProblemScore }">
		
		<!-- topRow: 包含收藏按鈕, 題號, 題目的多個標籤 -->
		<div v-if="showTopRow" class="ts-grid is-top-aligned" style="margin-bottom: -5px;">
			
			<!-- 收藏按鈕 -->
			<SaveButton :uni="uni" :year="year" :no="no" />
			
			<!-- 題號 -->
			<div class="column problem-name ran-app-font">
				<span>{{ getUniShortName(uni) }} {{ year }} 第 {{ no }} 題</span>
			</div>
			
			<!-- 題目的多個標籤 -->
			<div class="column is-fluid ts-grid is-top-aligned" style="row-gap: 10px;">
				<Tag v-for="tag in (resolveProblemConfig?.tags ?? [])" :tag="tag"></Tag>
			</div>
			
		</div>
		
		<!-- 題目 -->
		<div class="ran-problem-font">
			<component :is="sectionComp"></component>
		</div>
		
		<!-- 答案框, 詳解連結, 收藏按鈕, 內容區塊(詳解) -->
		<div v-if="props.no && props.no[0] !== '-' && (showAnswer || showLink || showContent)"
			class="ts-wrap is-compact is-vertical content"
		><!-- 題號開頭為 "-" 的 section 不是題目, 不顯示這個區塊的答案詳解 -->
			
			<!-- 綠色答案框 & 詳解連結 -->
			<div class="ts-wrap">
				<AnswerBox v-if="showAnswer" :answerLatex="resolveProblemConfig.answerLatex"><!-- 綠色答案框 -->
				</AnswerBox>
				<RanLink v-if="showLink" class="problem-view-link" :to="`#/exam/${uni}-${year}/${no}`"><!-- 詳解連結-->
					詳解
				</RanLink>
			</div>
			
			<!-- 多個 content box (包含詳解) -->
			<template v-if="showContent" v-for="({ type, suffix }, i) in resolveProblemConfig.contentConfigs">
				
				<!-- 詳解類型的內容區塊 -->
				<Content v-if="type === 'answer'" colorStyle="blue">
					<details class="ts-accordion">
						<summary>詳解 {{ suffix }}</summary>
						<component :is="contentComps[i]"></component><!-- 詳解 -->
					</details>
				</Content>
				
				<!-- 預設的內容區塊 -->
				<Content v-else-if="type === 'default'">
					<component :is="contentComps[i]"></component>
				</Content>
				
				<!-- 若內容區塊的類型填錯, 顯示錯誤訊息 -->
				<Content v-else colorStyle="red">錯誤的內容區塊類型 ٩(ŏ﹏ŏ、)۶</Content>
				
			</template>
			
		</div>
		
	</div>
</template>

<script setup>
import { ref, shallowRef, watchEffect, defineAsyncComponent, computed } from "vue";
import { getUniShortName, getProblemConfig, getSectionComp, getAllContentComps } from "@lib/exam-db"; // 讀取題本資訊
import AnswerBox from "./problem-comp/AnswerBox.vue"; // 綠色答案框的組件
import SaveButton from "./SaveButton.vue"; // 收藏按鈕
import Tag from "./Tag.vue"; // 標籤
import LoadingComp from "./problem-comp/Loading.vue"; // 題目加載組件
import SectionNotFoundComp from "./problem-comp/SectionNotFound.vue"; // 區塊載入失敗時, 顯示的錯誤訊息組件
import ContentNotFoundComp from "./problem-comp/ContentNotFound.vue"; // 題目的內容載入失敗時, 顯示的錯誤訊息組件

const props = defineProps({
	uni: { type: String, default: null }, // 題本的學校英文縮寫
	year: { type: String, default: null }, // 題本的民國年份
	no: { type: String, default: null }, // 題號
	problemConfig: { type: Object, default: null }, // 題目的設定檔, 位於 config.problemConfigs.<no> 內, 若此值不傳會自己去抓
	hideProblemScore: { type: Boolean, default: false }, // 隱藏題目的配分. 因為配分已存在於題目組件檔, 所以只有這個參數是 hide (某種定義?)
	showTopRow: { type: Boolean, default: false }, // 是否顯示 top row, 包含收藏按鈕, 題號, 題目的多個標籤
	showAnswer: { type: Boolean, default: false }, // 顯示綠框答案
	showLink: { type: Boolean, default: false }, // 顯示 "詳解" 按鈕
	showContent: { type: Boolean, default: false }, // 顯示內容區塊 (包含詳解)
});

const getAsyncComp = (promise, notFoundComp) => defineAsyncComponent({ // 生成一個動態組件
	loader: () => promise.catch(err => {
		console.error(err.message); // 如果 import 失敗, 在 console 報錯
		return notFoundComp; // 回傳錯誤組件
	}),
	loadingComponent: LoadingComp,
	delay: 200, // 顯示"加載組件"前的延遲時間 (防抖動), 預設為 200ms
	errorComponent: notFoundComp,
	timeout: 5000
});

const resolveProblemConfig = ref({});
const sectionComp = shallowRef(null); // shallowRef 優化效能 (因為題目組件是動態載入的)
const contentComps = shallowRef([]);

watchEffect(async () => {
	let { uni, year, no, problemConfig } = props;
	
	resolveProblemConfig.value = {}; // 當 uni year no 改變時, 會清除題目設定和所有題目相關的動態組件 (因為題目變了)
	sectionComp.value = null;
	contentComps.value = [];
	
	if (!uni || !year || !no) return; // 如果 uni year no 其中一個傳入不合法, 直接提前回傳結束
	
	try {
		if (no[0] !== "-") { // "-" 開頭的不是題目, 不需要抓 config
			resolveProblemConfig.value = problemConfig ?? await getProblemConfig(uni, year, no); // 若題目設定沒傳入, 自己抓
		}
	} catch (err) {
		console.error(err.message); // 在 console 報錯
		return; // 如果 uni year no 對應的題目設定不存在, 代表這題不存在
	}
	
	sectionComp.value = getAsyncComp(getSectionComp(uni, year, no), SectionNotFoundComp); // 動態載入區塊組件
	
	if (!props.showContent) return; // 不顯示 contents, 不用載入內容(解答)組件
	
	try {
		contentComps.value = getAllContentComps(uni, year, no, resolveProblemConfig.value).map( // 讀取內容(解答)組件
			promise => getAsyncComp(promise, ContentNotFoundComp)
		);
	} catch (err) { // 只抓 getAllContentComps error
		console.error(err.message); // 在 console 報錯
		contentComps.value = [];
	}
});
</script>

<style scoped>
.hide-problem-score:deep(.problem-score) { /* 用於控制題目的配分是否要顯示 */
	display: none;
}
.problem-name { /* 藍色框的題目名稱 */
	margin-left: -4px; /* 縮短與右側收藏按鈕的距離 */
	padding: 0 6px;
	background-color: #bdf;
	border-radius: 4px;
	font-size: 15px;
}
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
