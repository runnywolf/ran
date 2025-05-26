<template>
	
	<!-- 考卷部分 -->
	<div
		class="ts-content exam"
		:style="{ filter: isProblemVisible ? 'none' : 'blur(10px)' } /* 模糊化題本 */"
	>
		<template v-for="(s_sectionId, i) in examConfig.section"><!-- 生成題本的每一題 -->
			
			<!-- 題目 -->
			<ol v-if="s_sectionId[0] !== '-'"
				:style="getOlStyle(s_sectionId)"
				:start="s_sectionId"
				:id="`exam-paper-p${s_sectionId}` /* 用於滾動至某一題 */"
			>
				<li class="ran-problem-font">
					<Problem
						:uni="uni" :year="year" :no="s_sectionId"
						:problemConfig="examConfig.problem[s_sectionId]"
						:displayMode="isContentVisible ? 'link': undefined"
						isScoreVisible
					></Problem>
				</li>
			</ol>
			
			<!-- 題本的說明區塊, 不是題目 -->
			<div v-else>
				<Problem :uni="uni" :year="year" :no="s_sectionId"></Problem><!-- 題號開頭若為 '-', 會隱藏題號, 且沒有解答 -->
			</div>
			
			<!-- 題目間的分隔線 -->
			<div v-if="i != examConfig.section.length - 1" class="ts-divider is-section"></div>
			
		</template>
	</div>
	
	<!-- 遮住考卷的 ui -->
	<template v-if="!isProblemVisible">
		
		<!-- 開始作答的 ui, 覆蓋於模糊的題目之上 -->
		<div v-if="!isExamOver" class="ts-wrap is-vertical is-middle-aligned exam-cover">
			
			<!-- 題本年份 -->
			<div class="ts-text is-huge is-bold">
				{{ config.uni[uni]?.shortName ?? "-" }}&nbsp;&nbsp;{{ year }}
			</div>
			
			<!-- 考試建議 -->
			<div class="ts-list is-unordered">
				<div class="item">
					快速看過全部題目後再開始作答，考試時間為 {{ Math.floor(examTimeSec / 60) }} 分鐘，請做好配速。
				</div>
				<div class="item">如果有給手寫答案紙，且題本沒有附註「只寫答案即可」，建議附上運算過程。</div>
				<div class="item">簡單題目請先做完，若時間夠，驗算一遍後再做剩餘題目。</div>
			</div>
			
			<!-- 開始作答的按鈕 -->
			<button class="ts-button is-start-icon" @click="emit('clickStartExam');">
				<span class="ts-icon is-pen-icon"></span>開始作答
			</button>
			
			<!-- 最下面的提示 -->
			<div class="ts-text is-small is-secondary is-italic">
				如果你只想翻閱一下歷屆試題，可以關閉左側選單中的「測驗模式」
			</div>
			
		</div>
		
		<!-- 考試結束的 ui -->
		<div v-else class="ts-wrap is-vertical is-middle-aligned exam-cover">
			<div class="ts-text is-huge is-bold">考試結束</div>
			<button class="ts-button is-start-icon" @click="emit('resetTimer');">
				<span class="ts-icon is-arrow-rotate-left-icon"></span>重新計時
			</button>
		</div>
		
	</template>
	
</template>

<script setup>
import { Hop } from "@/libs/RanMath"
import Problem from "@/components/problem/Problem.vue"; // 用於顯示題目與解答的組件
import config from "@/components/exam/config.json"; // 保存所有題本資訊的設定檔

const props = defineProps({
	uni: { type: String }, // 學校英文縮寫
	year: { type: String }, // 題本年份
	examConfig: { type: Object }, // 題本資料
	isContentVisible: { type: Boolean, default: false }, // 是否顯示題目之下的內容區塊 (例如答案)
	isProblemVisible: { type: Boolean, default: true }, // 是否顯示題目
	isExamOver: { type: Boolean, default: false }, // 考試是否結束
	examTimeSec: { type: Number, default: 0 }, // 考試時間 (秒)
});

const emit = defineEmits([
	"clickStartExam", // 按下開始作答的按鈕會觸發
	"resetTimer" // 按下重新計時的按鈕會觸發
]);

const getOlStyle = (s_sectionId) => { // 獲取某一題的題號樣式 (ui 由 <ol> 顯示)
	if (Hop.isPosInt(Number(s_sectionId))) { // 如果題號是整數, 顯示題號
		return { "padding-left": `${11 + 9 * s_sectionId.length}px`, "list-style": "decimal" };
	} // 因為 ol 的編號文字是右側對齊的, 需要向右偏移 (加上 padding-left)
	return { "padding-left": "0px", "list-style": "none" };	// 如果題號不是整數, 隱藏題號
};
</script>

<style scoped>
.exam-cover { /* 覆蓋於模糊的題目之上的 ui */
	position: absolute; /* 絕對定位 */
	top: 100px; /* 與考卷頂部的距離 */
	left: 50%; /* 水平置中 */
	transform: translate(-50%, 0); /* 調整 x 座標讓其水平置中 */
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
</style>
