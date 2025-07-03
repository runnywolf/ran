<template>
	<div class="ts-wrap is-compact is-middle-aligned">
		<div v-for="(config, key) in numberStepperConfig"
			class="ts-wrap is-middle-aligned group-box"
			style="--gap: 2px;"
			:style="{ '--bg': config.bgColor }"
		>
			<!-- 減少數字的按鈕 -->
			<button
				class="ts-button is-circular is-icon is-ghost add-sub-button"
				@click="changeSettingValue(key, -1)"
				:disabled="isMinValue(key)"
			>
				<span class="ts-icon is-minus-icon"></span>
			</button>
			
			<!-- 參數名稱 -->
			<span>{{ config.name }}</span>
			
			<!-- 增加數字的按鈕 -->
			<button
				class="ts-button is-small is-circular is-icon is-ghost add-sub-button"
				@click="changeSettingValue(key, +1)"
				:disabled="isMaxValue(key)"
			>
				<span class="ts-icon is-plus-icon"></span>
			</button>
			
		</div>
	</div>
</template>

<script setup> // 本組件的功能為: 調整遞迴形式
import { ref, onMounted } from 'vue';

const emit = defineEmits([ "recurFormChanged" ]); // 上傳遞迴形式

const numberStepperConfig = { // 數值調整器的參數
	recurOrder: { name: "遞迴階數", bgColor: "#fcc", min: 1, max: 3 },
	polyDegree: { name: "多項式次數", bgColor: "#bfb", min: -1, max: 3 }, // 若多項式次數為 -1, 代表零多項式 f(x) = 0
	expTermNum: { name: "指數項數", bgColor: "#ccf", min: 0, max: 3 },
};

const recurFormSetting = ref({ recurOrder: 2, polyDegree: -1, expTermNum: 0 }); // 遞迴形式的參數, 預設為 2 階齊次遞迴

const isMinValue = (key) => recurFormSetting.value[key] <= numberStepperConfig[key].min; // 如果某個參數達到最小值, 禁用減少按鈕
const isMaxValue = (key) => recurFormSetting.value[key] >= numberStepperConfig[key].max; // 如果某個參數達到最大值, 禁用增加按鈕

const changeSettingValue = (key, value) => { // 將某個遞迴形式的參數 +1 或 -1, 取決於 value
	recurFormSetting.value[key] += value;
	emit("recurFormChanged", recurFormSetting.value); // 上傳遞迴的形式
};

onMounted(() => emit("recurFormChanged", recurFormSetting.value)); // 載入頁面時, 將輸入框改為預設遞迴形式
</script>

<style scoped>
.add-sub-button { /* + - 按鈕的樣式 */
	width: 28px; height: 28px; /* 比 tocas small 小一點 */
}
.add-sub-button:hover { /* + - 按鈕 hover 時, 會稍微變亮 */
	background-color: #fff6;
}
.group-box { /* 淺色背景的分組區域, 注意: 父組件 RecurInput 也有同名樣式 */
	border-radius: 4px;
	padding: 4px;
	background-color: var(--bg);
	display: flex;
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
</style>
