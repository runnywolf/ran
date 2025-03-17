<template>
	<div class="ts-wrap is-vertical">
		
		<!-- 題目 -->
		<component
			:is="problemAsyncComp"
			class="problem-font"
			:class="isScoreVisible ? '' : 'hide-problem-score'"
		></component>
		
		<!-- 顯示題目頁面的連結按鈕 -->
		<div v-if="contentType === 'link' && no[0] != '-'">
			<button class="ts-button" @click="router.push(`/exam/${uni}-${year}/${no}`)">解答</button>
		</div>
		
		<!-- 顯示多個內容區塊 -->
		<div v-else-if="contentType === 'content' && no[0] != '-' && problemConfig"
			class="ts-wrap is-compact is-vertical content"
		>
			<template v-for="(contentData, i) in problemConfig.content">
				
				<!-- 解答類型的內容區塊 -->
				<Content v-if="contentData.type === 'answer'" :borderColor="'#7af'" :bgColor="'#def'">
					<details class="ts-accordion">
						<summary>解答 {{ contentData.suffix }}</summary>
						<component :is="contentAsyncComps[i]"></component><!-- 解答 -->
					</details>
				</Content>
				
				<!-- 若內容區塊的類型填錯, 顯示錯誤訊息 -->
				<Content v-else error>錯誤的內容區塊類型 ٩(ŏ﹏ŏ、)۶</Content>
				
			</template>
		</div>
		
	</div>
</template>

<script setup>
import { shallowRef, watch, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import ProblemNotFoundComp from "@/components/exam/ProblemNotFound.vue"; // 題目載入失敗時, 顯示的錯誤訊息組件
import ContentNotFoundComp from "@/components/exam/ContentNotFound.vue"; // 內容區塊載入失敗時, 顯示的錯誤訊息組件

const props = defineProps({
  uni: String, // 學校英文縮寫
	year: String, // 題本年份
	no: String, // 題號
  problemConfig: Object, // 題目資訊
	contentType: String, // 題目下面內容區塊的類型, 不傳入則不生成 ( link: 題目的超連結按鈕 / content: 解答等等... )
	isScoreVisible: { type: Boolean, default: false }, // 是否要顯示題目中的配分
});

const emit = defineEmits([
	"loadingCompleted" // 元件載入完成的 event
]);

const router = useRouter(); // 路由器

const problemAsyncComp = shallowRef(null);
const contentAsyncComps = shallowRef([]);

watch(() => props.problemConfig, async () => { // 當題目改變時, 載入題目和內容區塊的組件
	problemAsyncComp.value = defineAsyncComponent(() => // 載入題目的組件
		import(`../exam/${props.uni}/${props.year}/problem/${props.no}.vue`)
			.catch(handleProblemCompMissing) // 題目組件載入失敗時, 顯示錯誤訊息組件
			.then(loadingCompleted) // 題目載入完成時, 要做的事
	);
	
	if (props.no[0] == "-") return; // 題號開頭若為 '-', 會被視為是題本的說明區塊, 沒有內容
	if (props.contentType != "content") return; // 內容區塊的類型必須是 content, 才會載入內容區塊組件
	if (!props.problemConfig) { // 如果題目設定檔不存在
		handleProblemConfigMissing();
		return;
	}
	if (!props.problemConfig.content || props.problemConfig.content.length == 0) {
		handleProblemContentEmpty(); // 題目設定檔定義的內容區塊組件不存在或留空
		return;
	}
	
	contentAsyncComps.value = await Promise.all( // 載入內容區塊的組件 (內容區塊有可能是解答, 文字區塊等等...)
		props.problemConfig.content.map(async (contentData) => defineAsyncComponent(() => 
			import(`../exam/${props.uni}/${props.year}/content/${contentData.id}.vue`) // 載入題目組件
				.catch(error => handleContentMissing(contentData.id)) // 內容區塊組件載入失敗時, 顯示錯誤訊息組件
		))
	);
}, { immediate: true });

function loadingCompleted(module) { // 題目載入完成時, 要做的事
	emit("loadingCompleted"); // 元件載入完成的 event
	return module;
};

function handleProblemCompMissing() { // 題目組件載入失敗時, 顯示錯誤訊息組件
	console.error( // 在 console 報錯
		`Problem comp is not exist. (problem ${props.no})\n`+
		`-> Check if @/components/exam/${props.uni}/${props.year}/problem/${props.no}.vue exist?\n`+
		`-> If ${props.no}.vue exist, check the "${props.no}" is in `+
		`@/components/exam/${props.uni}/${props.year}/config.json > section: [...]`
	);
	return ProblemNotFoundComp; // 回傳錯誤訊息組件
};

function handleProblemConfigMissing() { // 題目設定檔不存在
	console.error(
		`Problem config is not exist. (problem ${props.no})\n`+
		`-> Set the `+
		`@/components/exam/${props.uni}/${props.year}/config.json > problem.${props.no}: {...}`
	);
};

function handleProblemContentEmpty() { // 題目設定檔定義的內容區塊組件不存在或留空
	console.warn(
		`Problem content is undefined or empty. (problem ${props.no})\n`+
		`-> Add { "type": ?, "id": ? } in `+
		`@/components/exam/${props.uni}/${props.year}/config.json > problem.${props.no}.content: [...]`
	);
};

function handleContentMissing(contentId) { // 內容區塊組件載入失敗時
	console.error(
		`Content comp is not exist. (problem ${props.no}, content ${contentId})\n`+
		`-> Check if @/components/exam/${props.uni}/${props.year}/content/${contentId}.vue exist?\n`+
		`-> If ${contentId}.vue exist, check the elements in `+
		`@/components/exam/${props.uni}/${props.year}/config.json > problem.${props.no}.content: [...], `+
		`and one of element.id must be "${contentId}".`
	);
	return ContentNotFoundComp; // 內容區塊組件載入失敗時, 顯示錯誤訊息組件
};
</script>

<style scoped>
.hide-problem-score:deep(.problem-score) { /* 隱藏或顯示題目的配分 */
	display: none; /* 題目的 vue 檔內必須使用 *.problem-score 包裹配分才有效果 */
}
.content {
	line-height: 30px; /* 內容區塊的行距 (倍) */
}
</style>
