<template>
	<div class="ts-wrap is-vertical">
		
		<!-- 題目 -->
		<div class="ran-problem-font" :class="{ 'hide-problem-score': displayMode === 2 }">
			<component :is="sectionAsyncComp"></component>
		</div>
		
		<!-- 若顯示模式為 1, 會顯示綠框答案和詳解連結 -->
		<div v-if="isLinkMode()" class="ts-wrap">
			
			<!-- 答案 -->
			<Content colorStyle="green" collapsed>
				Ans:&nbsp;&nbsp;<vl :exp="answerLatex" />
			</Content>
			
			<!-- 詳解連結-->
			<RanLink class="problem-view-link" :to="`#/exam/${uni}-${year}/${no}`">
				詳解
			</RanLink>
			
		</div>
		
		<!-- 若顯示模式為 2, 會顯示綠框答案和詳解 -->
		<div v-else-if="isContentMode()" class="ts-wrap is-compact is-vertical content">
			
			<!-- 答案 -->
			<Content colorStyle="green" collapsed>
				Ans:&nbsp;&nbsp;<vl :exp="answerLatex" />
			</Content>
			
			<template v-for="(contentConfig, i) in problemConfig.contentConfigs">
				
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
import LoadingComp from "./problem-comp/Loading.vue"; // 題目加載組件
import SectionNotFoundComp from "./problem-comp/SectionNotFound.vue"; // 區塊載入失敗時, 顯示的錯誤訊息組件
import ContentNotFoundComp from "./problem-comp/ContentNotFound.vue"; // 題目的內容載入失敗時, 顯示的錯誤訊息組件

const props = defineProps({
	uni: String, // 題本的學校英文縮寫
	year: String, // 題本的民國年份
	no: { type: String, default: "" }, // 題號
	problemConfig: { type: Object, default: {} }, // 題目的設定檔, 位於 config.problemConfigs.<no> 內
	displayMode: { type: Number, default: 0 }, // 顯示模式: 0顯示題目+題號 1顯示題目+題號+答案+詳解連結 2顯示題目+答案+詳解(ProblemView專用)
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

// #region 若顯示模式為 1, 會顯示綠框答案和詳解連結
const isLinkMode = () => (props.displayMode === 1 && props.no[0] != "-"); // 若 section base 開頭為 "-", 不會顯示答案和連結

const answerLatex = computed(() => {
	const s_latex = props.problemConfig.answerLatex; // 題目的答案 (latex 字串)
	return s_latex ? s_latex : "?"; // 如果讀取不到, 預設為 "?"
});
// #endregion

// #region 若顯示模式為 2, 會顯示綠框答案和詳解
const isContentMode = () => (props.displayMode === 2 && props.no[0] != '-'); // 顯示模式為 2

const contentAsyncComps = shallowRef([]); // 內容組件 ; 避免 async 造成的效能問題, 使用 shallowRef

watch(() => [props.uni, props.year, props.no], async () => { // 題號改變時, 載入題目的解答和其他內容
	if (props.displayMode !== 2) return []; // 顯示模式必須是 2, 才會載入內容區塊組件
	
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
.hide-problem-score:deep(.problem-score) { /* 隱藏或顯示題目的配分 */
	display: none; /* 題目的 vue 檔內必須使用 *.problem-score 包裹配分才有效果 */
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
	line-height: 30px; /* 內容區塊的行距 (倍) */
}
</style>
