<template>
	<vk>
		<div class="ts-wrap is-vertical is-compact">
			
			<!-- 預設的題目區塊 (會包含配分) -->
			<div v-if="$slots.problem || (scoreText && !isProblemScoreHided)">
				<span v-if="scoreText" class="problem-score">{{ scoreText }}</span>
				<slot name="problem"></slot>
			</div>
			
			<!-- 額外的題目區塊 -->
			<div v-for="slotName in extraSlotNames">
				<slot :name="slotName"></slot>
			</div>
			
			<!-- 有序列表 (通常用作子題或選擇題) -->
			<template v-if="orderListLabels.length > 0">
				<div v-if="useSpanList" class="ts-grid is-compact grid-extra-y-gap">
					<span v-for="slotName in orderListLabels">
						<span>{{ `(${slotName}) ` }}</span>
						<slot :name="slotName"></slot>
					</span>
				</div>
				<ol v-else class="ran-order-list" :class="orderListStyle">
					<li v-for="(slotName, i) in orderListLabels">
						<span class="problem-score extra-margin">{{ listItemScoreTexts[i] + " " }}</span>
						<slot :name="slotName"></slot>
					</li>
				</ol>
			</template>
			
		</div>
	</vk>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
	scoreText: { type: String, default: null }, // 配分字串
	extraSlotNames: { type: Array, default: [] }, // 額外的題目區塊名 (會顯示在預設題目區塊下, 選項之上)
	listEndLabel: { type: String, default: null }, // 有序列表的最後一個編號, 主要用於子題或多選題的選項
	listItemScoreTexts: { type: Array, default: [] }, // 列表的配分字串 (不適用於 span list)
	useSpanList: { type: Boolean, default: false }, // 如果為 false, 使用 ul 來排版有序清單; 反之則用 grid 排版 (例如某些選項長度很短的選擇題)
});

// 當配分被隱藏, 同時 slot.problem 是空的 -> 不顯示預設的題目區塊.
// 主要是解決題目只有配分的時候, 隱藏配分不會讓題目區塊的 div 消失, 導致 ts-wrap 仍然添加了額外的間隔.
const isProblemScoreHided = computed(() => document.querySelector('.hide-problem-score') !== null);

const orderListStyle = ref(""); // ol 列表的編號樣式
const orderListLabels = computed(() => { // 根據最後一個編號, 判斷有序列表的編號 arr
	const end = props.listEndLabel; // 最後一個編號
	
	if (!end) return [];
	
	if (Number.isInteger(Number(end))) { // 整數列表: 1, 2, 3, ...
		orderListStyle.value = "is-number";
		return Array.from({ length: Number(end) }, (_, i) => 1 + i);
	}
	
	const endAscii = end.charCodeAt(0); // 列表最後一個編號的 ascii 編碼
	if (65 <= endAscii && endAscii <= 90) { // 大寫字母列表: A, B, C, ...
		orderListStyle.value = "is-upper-alpha";
		return Array.from({ length: endAscii - 64 }, (_, i) => String.fromCharCode(65 + i));
	}
	if (97 <= endAscii && endAscii <= 122) { // 小寫字母列表: a, b, c, ...
		orderListStyle.value = "is-lower-alpha";
		return Array.from({ length: endAscii - 96 }, (_, i) => String.fromCharCode(97 + i));
	}
	
	return []; // 不是這三種樣式的編號, 不顯示列表
});
</script>

<style scoped>
.grid-extra-y-gap { /* 增加水平選項的間距 */
	column-gap: 16px; /* 8 -> 16 */
}
</style>
