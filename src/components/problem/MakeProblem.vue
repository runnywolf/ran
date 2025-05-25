<template>
	<div class="ts-grid is-stacked is-compact">
		
		<!-- 預設的題目區塊 (會包含配分) -->
		<div class="column">
			<span v-if="scoreText" class="problem-score">{{ scoreText }}</span>
			<span>
				<slot name="problem"></slot>
			</span>
		</div>
		
		<!-- 新增的題目區塊 -->
		<div v-for="slotName in extraProblemSlotNames" class="column">
			<span>
				<slot :name="slotName"></slot>
			</span>
		</div>
		
		<!-- 選項 -->
		<template v-if="optionSlotNames.length > 0">
			<ul v-if="useUlToListOptions"
				class="ran-order-list"
				:class="[ optionSlotNames[0] === 'A' ? 'is-upper-alpha' : 'is-lower-alpha' ]"
			>
				<li v-for="slotName in optionSlotNames">
					<slot :name="slotName"></slot>
				</li>
			</ul>
			<div v-else class="column ts-grid is-compact options-extra-gap">
				<span v-for="slotName in optionSlotNames">
					<span>({{ slotName }})&nbsp;</span>
					<slot :name="slotName"></slot>
				</span>
			</div>
		</template>
		
	</div>
</template>

<script setup>
const props = defineProps({
	scoreText: { type: String, default: "" }, // 配分字串
	extraProblemSlotNames: { type: Array, default: [] }, // 額外的題目區塊名 (會顯示在預設題目區塊下, 選項之上)
	optionSlotNames: { type: Array, default: [] }, // 選項插槽名稱
	useUlToListOptions: { type: Boolean, default: false }, // 如果為 true, 會使用 ul 來排版選項
});
</script>

<style scoped>
.options-extra-gap { /* 增加水平選項的間距 */
	column-gap: 16px; /* 8 -> 16 */
}
</style>
