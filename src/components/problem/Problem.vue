<template>
	<div class="ts-wrap is-vertical">
		
		<!-- 題目 -->
		<div class="problem-font" :class="isScoreVisible ? '' : 'hide-problem-score'">
			<component :is="problemAsyncComp"></component>
		</div>
		
		<!-- 顯示題目頁面的連結按鈕 -->
		<div v-if="isLinkMode()" class="ts-wrap">
			
			<!-- 答案 -->
			<Content colorStyle="green" collapsed>
				Ans:&nbsp;&nbsp;<vl :exp="answerLatex" />
			</Content>
			
			<!-- 詳解連結-->
			<button class="ts-button" @click="router.push(`/exam/${uni}-${year}/${no}`)">詳解</button>
			
		</div>
		
		<!-- 顯示多個內容區塊 -->
		<div v-else-if="isContentMode()" class="ts-wrap is-compact is-vertical content">
			
			<!-- 答案 -->
			<Content colorStyle="green" collapsed>
				Ans:&nbsp;&nbsp;<vl :exp="answerLatex" />
			</Content>
			
			<template v-for="(contentData, i) in problemConfig.content">
				
				<!-- 詳解類型的內容區塊 -->
				<Content v-if="contentData.type === 'answer'" colorStyle="blue">
					<details class="ts-accordion" name="problem-answer">
						<summary>詳解 {{ contentData.suffix }}</summary>
						<component :is="contentAsyncComps[i]"></component><!-- 詳解 -->
					</details>
				</Content>
				
				<!-- 預設的內容區塊 -->
				<Content v-else-if="contentData.type === 'default'">
					<component :is="contentAsyncComps[i]"></component>
				</Content>
				
				<!-- 若內容區塊的類型填錯, 顯示錯誤訊息 -->
				<Content v-else colorStyle="red">錯誤的內容區塊類型 ٩(ŏ﹏ŏ、)۶</Content>
				
			</template>
		</div>
		
	</div>
</template>

<script setup>
import { ref, shallowRef, watch, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import ProblemNotFoundComp from "@/components/problem/error-comp/ProblemNotFound.vue"; // 題目載入失敗時, 顯示的錯誤訊息組件
import ContentNotFoundComp from "@/components/problem/error-comp/ContentNotFound.vue"; // 內容區塊載入失敗時, 顯示的錯誤訊息組件

const props = defineProps({
	uni: String, // 學校英文縮寫
	year: String, // 題本年份
	no: String, // 題號
	problemConfig: Object, // 題目的設定檔, 位於 config.problem.<no> 內
	displayMode: String, // 顯示模式: 題目下面內容區塊的類型, 不傳入則不生成 ( link: 題目的超連結按鈕 / content: 解答等等... )
	isScoreVisible: { type: Boolean, default: false }, // 是否要顯示題目中的配分
});

const router = useRouter(); // 路由器

const isLinkMode = () => (props.displayMode === "link" && props.no[0] != "-"); // 顯示模式為 link
const isContentMode = () => (props.displayMode === 'content' && props.no[0] != '-' && props.problemConfig); // 顯示模式為 content

const problemAsyncComp = shallowRef(null); // 題目的動態組件
const answerLatex = ref("?"); // 答案的 latex 語法, 預設值為 "?"
const contentAsyncComps = shallowRef([]); // 內容區塊的動態組件

watch(() => props.problemConfig, async () => { // 當題目改變時, 載入題目和內容區塊的組件
	problemAsyncComp.value = defineAsyncComponent({
		loader: () => import(`../exam/${props.uni}/${props.year}/problem/${props.no}.vue`)
			.catch(handleProblemCompMissing), // 載入題目的組件
		errorComponent: ProblemNotFoundComp
	});
	
	if (props.no[0] == "-") return; // 題號開頭若為 '-', 會被視為是題本的說明區塊, 只有題目區塊
	if (!props.problemConfig) { // 如果題目設定檔不存在, 報錯並取消載入答案和內容區塊
		handleProblemConfigMissing();
		return;
	}
	
	loadAnswerLatex(); // 載入答案的 latex
	loadContents(); // 載入內容區塊的組件
}, { immediate: true });

function loadAnswerLatex() { // 載入答案的 latex
	const ansLatex = props.problemConfig.answerLatex; // 題目設定檔 (config.problem.<no>) 的答案 (answerLatex)
	
	if (ansLatex === undefined) { // key answerLatex 不存在於題目設定檔 (config.problem.<no>) 內
		handleAnswerUndefined();
		return;
	}
	if (typeof ansLatex !== "string" || ansLatex === "") { // answerLatex 的值應為長度 > 0 的字串
		handleAnswerError();
		return;
	}
	
	answerLatex.value = ansLatex;
}

async function loadContents() { // 載入內容區塊的組件
	if (props.displayMode != "content") return; // 顯示模式必須是 content, 才會載入內容區塊組件
	
	const contentConfig = props.problemConfig.content; // 題目的內容區塊的設定 (config.problem.<no>.content)
	if (contentConfig === undefined) { // key content 不存在於題目設定檔 (config.problem.<no>) 內
		handleContentEmpty();
		return;
	}
	if (contentConfig.length === 0) { // config.problem.<no>.content 必須為 [ { "type": ?, "id": ? }, ... ]
		handleContentEmpty();
		return;
	}
	
	contentAsyncComps.value = await Promise.all( // 載入內容區塊的組件 (內容區塊有可能是解答, 文字區塊等等...)
		contentConfig.map(async (contentData) => defineAsyncComponent({
			loader: () => import(`../exam/${props.uni}/${props.year}/content/${contentData.id}.vue`)
				.catch(error => handleContentMissing(contentData.id)), // 內容區塊組件載入失敗時, 顯示錯誤訊息組件
			errorComponent: ContentNotFoundComp
		}))
	);
}

function handleProblemCompMissing() { // 題目組件載入失敗時, 顯示錯誤訊息組件
	console.error( // 在 console 報錯
		`Problem comp is not exist. ${_getErrorProblemMessage()}\n`+
		`-> Check if @/components/exam/${props.uni}/${props.year}/problem/${props.no}.vue exist?\n`+
		`-> If ${props.no}.vue exist, check the "${props.no}" is in section: [...] in ${_getErrorConfigPath()}`
	);
	return ProblemNotFoundComp; // 回傳錯誤訊息組件
}

function handleProblemConfigMissing() { // 題目設定檔不存在
	console.error(
		`Problem config is not exist. ${_getErrorProblemMessage()}\n`+
		`-> Add "${props.no}": {} in problem: {...} in ${_getErrorConfigPath()}`
	);
}

function handleAnswerUndefined() { // key answerLatex 不存在於題目設定檔 (config.problem.<no>) 內
	console.error(
		`Answer latex string is undefined. ${_getErrorProblemMessage()}\n`+
		`-> Add "answerLatex": "..." in problem.${props.no}: {...} in ${_getErrorConfigPath()}`
	);
}

function handleAnswerError() { // answerLatex 的值應為長度 > 0 的字串
	console.warn(
		`Answer latex string must be a non-empty string. ${_getErrorProblemMessage()}\n`+
		`-> Set problem.${props.no}.answerLatex: "..." in ${_getErrorConfigPath()}`
	);
}

function handleContentEmpty() { // key content 不存在於題目設定檔 (config.problem.<no>) 內
	console.error(
		`Problem contents is undefined or empty. ${_getErrorProblemMessage()}\n`+
		`-> Add "content": [ { "type": ?, "id": ? }, ... ] in problem.${props.no}: {...} in ${_getErrorConfigPath()}`
	);
}

function handleContentMissing(contentId) { // 內容區塊組件載入失敗時
	console.error(
		`Content comp is not exist. ${_getErrorProblemMessage()}\n`+
		`-> Check if @/components/exam/${props.uni}/${props.year}/content/${contentId}.vue exist?\n`+
		`-> If ${contentId}.vue exist, check the elements in problem.${props.no}.content: [...] in ${_getErrorConfigPath()} ,`+
		` and one of element.id must be "${contentId}".`
	);
	return ContentNotFoundComp; // 回傳錯誤訊息組件
}

function _getErrorProblemMessage() { // 錯誤發生在哪一題的訊息
	return `(problem ${props.no} in exam ${props.uni}-${props.year})`;
}

function _getErrorConfigPath() { // 有錯的設定檔路徑
	return `@/components/exam/${props.uni}/${props.year}/config.json`;
}
</script>

<style scoped>
.hide-problem-score:deep(.problem-score) { /* 隱藏或顯示題目的配分 */
	display: none; /* 題目的 vue 檔內必須使用 *.problem-score 包裹配分才有效果 */
}
.content {
	line-height: 30px; /* 內容區塊的行距 (倍) */
}
</style>
