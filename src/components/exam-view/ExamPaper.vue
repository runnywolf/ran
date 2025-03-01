<template>
	<div
		class="ts-content problem-font exam"
		:style="{ filter: isProblemVisible ? 'none' : 'blur(10px)'} /* 模糊化題本 */"
	>
		<template v-for="(problemId, i) in examData.problemCompId">
			<ol v-if="problemId[0] !== '-'"
				:style="{ 'padding-left': (11+9*problemId.length)+'px' }"
				:start="problemId"
			>
				<li><!-- ol: 根據題目編號的長度修正 ol 的 padding-left -->
					<component :is="problemAsyncComp[i]"></component>
				</li>
			</ol>
			<div v-else><!-- 題號開頭若為 '-', 會隱藏題號 -->
				<component :is="problemAsyncComp[i]"></component>
			</div>
			<div v-if="i != examData.problemCompId.length - 1" class="ts-divider is-section"></div><!-- 題目間的分隔線 -->
		</template>
	</div>
	<div v-if="!isProblemVisible && remainingSec > 0" class="ts-wrap is-vertical is-middle-aligned exam-cover"><!-- 開始作答的 ui, 覆蓋於模糊的題目之上 -->
		<div class="ts-text is-huge is-bold"><!-- 題本年份 -->
			{{ config[uni].shortName }}&nbsp;&nbsp;{{ examData.year }}
		</div>
		<div class="ts-list is-unordered"><!-- 考試建議 -->
			<div class="item">
				快速看過全部題目後再開始作答，考試時間為 {{ Math.floor(examTimeSec / 60) }} 分鐘，請做好配速。
			</div>
			<div class="item">如果有給手寫答案紙，且題本沒有附註「只寫答案即可」，建議附上運算過程。</div>
			<div class="item">簡單題目請先做完，若時間夠，驗算一遍後再做剩餘題目。</div>
		</div>
		<button class="ts-button is-start-icon" @click="emit('clickStartExam');">
			<span class="ts-icon is-pen-icon"></span>開始作答
		</button>
		<div class="ts-text is-small is-secondary is-italic">
			如果你只想翻閱一下歷屆試題，可以關閉左側選單中的「測驗模式」
		</div>
	</div>
	<div v-if="!isProblemVisible && remainingSec <= 0" class="ts-wrap is-vertical is-middle-aligned exam-cover"><!-- 考試結束的 ui -->
		<div class="ts-text is-huge is-bold">考試結束</div>
		<button class="ts-button is-start-icon" @click="emit('resetTimer');">
			<span class="ts-icon is-arrow-rotate-left-icon"></span>重新計時
		</button>
	</div>
</template>

<script setup>
import { shallowRef, watch, defineAsyncComponent, defineEmits } from "vue";
import config from "@/components/exam/config.json"; // 保存題本資訊的設定檔
import ProblemNotFoundComp from "@/components/exam/ProblemNotFound.vue"; // 題目載入失敗時, 顯示的錯誤訊息組件

const props = defineProps({
  uni: String, // 學校英文縮寫
  examData: Object, // 題本資料
	isProblemVisible: Boolean, // 是否顯示題目
	examTimeSec: Number, // 考試時間 (秒)
	remainingSec: Number, // 剩餘時間 (秒)
});

const emit = defineEmits([
	"clickStartExam", // 按下開始作答的按鈕
	"resetTimer" // 按下重新計時的按鈕
]);

const problemAsyncComp = shallowRef([]); // 目前顯示的題目組件. shallowRef 只有 .value 改變時更新元素

const loadProblemComp = (id) => defineAsyncComponent( // 異步載入編號為 id 的題目組件
	() => import(`../exam/${props.uni}/${props.examData.year}/${id}.vue`) // 載入題目組件
		.catch(() => ProblemNotFoundComp) // 題目組件載入失敗時, 顯示錯誤訊息組件
);
watch(() => props.examData, async (newExamData) => { // 如果選取的題本年份改變了, 要做的事
	if (!newExamData.problemCompId) { // 如果題目編號不存在於 config.json
		console.error("examData.problemCompId is not exist, check @/components/exam/config.json");
		problemAsyncComp.value = [];
		return;
	}
	problemAsyncComp.value = await Promise.all( // 並行載入所有題目組件
		newExamData.problemCompId.map(loadProblemComp) // 異步載入所有題目
	);
}, { immediate: true }); // 頁面載入時, 載入一次題目
</script>

<style scoped>
.exam > ol {
	padding-left: 20px; /* 題目編號與 box 左側邊緣的距離 */
}
.exam > ol > li {
	padding-left: 4px; /* 題目編號與題目的距離 */
}
.exam-cover { /* 覆蓋於模糊的題目之上的 ui */
	position: absolute; /* 絕對定位 */
	top: 100px; /* 與考卷頂部的距離 */
	left: 50%; /* 水平置中 */
	transform: translate(-50%, 0); /* 調整 x 座標讓其水平置中 */
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
</style>
