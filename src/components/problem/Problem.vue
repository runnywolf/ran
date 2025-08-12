<template>
	<div class="ts-wrap is-vertical" :class="{ 'hide-problem-score': hideProblemScore }">
		
		<!-- 題目 -->
		<div class="ran-problem-font">
			<component :is="sectionAsyncComp"></component>
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
			<template v-if="showContent" v-for="(contentConfig, i) in problemConfig.contentConfigs">
				
				<!-- 詳解類型的內容區塊 -->
				<Content v-if="contentConfig.type === 'answer'" colorStyle="blue">
					<details class="ts-accordion">
						<summary>詳解 {{ contentConfig.suffix }}</summary>
						<component :is="contentAsyncComps[i]"></component><!-- 詳解 -->
					</details>
				</Content>
				
				<!-- 預設的內容區塊 -->
				<Content v-else-if="contentConfig.type === 'default'">
					<component :is="contentAsyncComps[i]"></component>
				</Content>
				
				<!-- 若內容區塊的類型填錯, 顯示錯誤訊息 -->
				<Content v-else colorStyle="red">錯誤的內容區塊類型 ٩(ŏ﹏ŏ、)۶</Content>
				
			</template>
			
		</div>
		
	</div>
</template>

<script setup>
import { defineAsyncComponent, computed, watch, shallowRef } from "vue";
import AnswerBox from "./problem-comp/AnswerBox.vue"; // 綠色答案框的組件
import LoadingComp from "./problem-comp/Loading.vue"; // 題目加載組件
import SectionNotFoundComp from "./problem-comp/SectionNotFound.vue"; // 區塊載入失敗時, 顯示的錯誤訊息組件
import ContentNotFoundComp from "./problem-comp/ContentNotFound.vue"; // 題目的內容載入失敗時, 顯示的錯誤訊息組件

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

// #region 載入題目組件
const sectionAsyncComp = computed(() => { // 區塊組件 (題目或者是題本的說明區塊)
	const { uni, year, no } = props;
	if (!uni || !year || !no) return;
	return defineAsyncComponent({ // 動態載入區塊組件
		loader: () => import(`../../exam-db/${uni}/${year}/sections/${no}.vue`) // 載入
			.catch(handleSectionCompMissing),
		loadingComponent: LoadingComp,
		delay: 200, // 顯示加載組件前的延遲時間，默認為 200ms
		errorComponent: SectionNotFoundComp,
		timeout: 5000
	});
});

function handleSectionCompMissing() { // 當區塊組件載入失敗時
	const { uni, year, no } = props;
	console.error( // 在 console 報錯
		`Section comp is not exist. ${getErrorSectionMessage()}\n`+
		`-> Check if src/exam-db/${uni}/${year}/sections/${no}.vue exist?\n`+
		`-> If ${no}.vue exist, check the "${no}" is in sectionFileBaseNames: [...] in ${getErrorConfigPath()}`
	);
	return SectionNotFoundComp;
}

function getErrorSectionMessage() { // 錯誤發生在哪一題的訊息
	return `(section ${props.no} in exam ${props.uni}-${props.year})`;
}

function getErrorConfigPath() { // 有錯的設定檔路徑
	return `src/exam-db/${props.uni}/${props.year}/config.json`;
}
// #endregion

// #region 若需要顯示內容區塊 (解答)
const contentAsyncComps = shallowRef([]); // 內容組件 ; 避免 async 造成的效能問題, 使用 shallowRef

watch(() => [props.uni, props.year, props.no], async () => { // 題號改變時, 載入題目的解答和其他內容
	if (!props.showContent) return []; // showContent 必須是 true, 才會載入內容區塊組件
	
	const contentConfigs = props.problemConfig.contentConfigs; // 題目的內容區塊的設定
	if (contentConfigs === undefined || contentConfigs.length === 0) return handleContentEmpty();
	
	contentAsyncComps.value = await Promise.all( // 載入內容區塊的組件 (內容區塊有可能是解答, 文字區塊等等...)
		contentConfigs.map(async (contentConfig) => defineAsyncComponent({
			loader: () => import(`../../exam-db/${props.uni}/${props.year}/contents/${contentConfig.fileBaseName}.vue`)
				.catch(() => handleContentMissing(contentConfig.fileBaseName)), // 內容區塊組件載入失敗時, 顯示錯誤訊息組件
			errorComponent: ContentNotFoundComp
		}))
	);
});

function handleContentEmpty() { // key content 不存在於題目設定檔 (config.problem.<no>) 內, 回傳空的 promise arr
	console.error(
		`Problem contents is undefined or empty. ${getErrorSectionMessage()}\n`+
		`-> Add "contentConfigs": [ { "type": ?, "id": ? }, ... ] in `+
		`problemConfigs.${props.no}: {...} in ${getErrorConfigPath()}`
	);
	return [];
}

function handleContentMissing(contentId) { // 內容區塊組件載入失敗時
	const { uni, year, no } = props;
	console.error(
		`Content comp is not exist. ${getErrorSectionMessage()}\n`+
		`-> Check if src/exam-db/${uni}/${year}/contents/${contentId}.vue exist?\n`+
		`-> If ${contentId}.vue exist, check the elements in `+
		`problemConfigs.${no}.contentConfigs: [...] in ${getErrorConfigPath()} , `+
		`and one of element.fileBaseName must be "${contentId}".`
	);
	return ContentNotFoundComp; // 回傳錯誤訊息組件
}
// #endregion
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
