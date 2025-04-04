<template>
	<div class="ts-wrap is-vertical is-compact">
		
		<!-- 隨機生成按鈕, 調整遞迴式各區塊的按鈕 -->
		<div class="ts-wrap is-compact is-middle-aligned">
			
			<!-- 隨機生成按鈕 -->
			<button class="ts-button is-icon is-outlined">
				<span class="ts-icon is-dice-icon"></span>
			</button>
			
			<!-- 調整遞迴式各區塊的按鈕 -->
			<div v-for="regionInfo in regionList"
				class="ts-wrap is-middle-aligned group-box"
				style="--gap: 2px;"
				:style="{ '--bg': regionInfo.bgColor }"
			>
				<!-- 減少的按鈕 -->
				<button
					class="ts-button is-circular is-icon is-ghost add-sub-button"
					@click="regionInfo.add(-1)"
					:disabled="regionInfo.isMin()"
				>
					<span class="ts-icon is-minus-icon"></span>
				</button>
				
				<!-- 區塊名稱 -->
				<span>{{ regionInfo.name }}</span>
				
				<!-- 增加的按鈕 -->
				<button
					class="ts-button is-small is-circular is-icon is-ghost add-sub-button"
					@click="regionInfo.add(1)"
					:disabled="regionInfo.isMax()"
				>
					<span class="ts-icon is-plus-icon"></span>
				</button>
			</div>
			
		</div>
		
		<!-- 遞迴式 (有超多輸入框) -->
		<div class="ts-wrap is-middle-aligned" style="--gap: 0;">
			
			<vl exp="a_n = " />
			
			<!-- 齊次部分 (遞迴) -->
			<div class="group-box" style="--bg: #fcc;">
				<template v-for="i in recurNum">
					<span
						contenteditable
						class="number-input"
						:class="(recurCoefInput[i-1].isZero() ? 'number-input-error' : '')"
						@input="recurCoefInput[i-1] = Frac.fromStr($event.target.innerText)"
					></span>
					<vl :exp="`a_{n-${i}}` + (i == recurNum ? '' : '~+')" />
				</template>
			</div>
			<vl exp="+" />
			
			<!-- 非齊次部分 (多項式) -->
			<div class="group-box" style="--bg: #bfb;">
				<template v-for="i in polyDegree+1">
					<span
						contenteditable
						class="number-input"
						:class="(polyCoefInput[i-1].isZero() ? 'number-input-error' : '')"
						@input="polyCoefInput[i-1] = Frac.fromStr($event.target.innerText)"
					></span>
					<vl v-if="polyDegree != 0" :exp="getTermLatex(i-1)" />
				</template>
			</div>
			<vl exp="+" />
			
			<!-- 非齊次部分 (指數) -->
			<div class="group-box" style="--bg: #ccf;">
				<template v-for="i in expFuncNum">
					<span
						contenteditable
						class="number-input"
						:class="(expFuncInput[i-1][0].isZero() ? 'number-input-error' : '')"
						@input="expFuncInput[i-1][0] = Frac.fromStr($event.target.innerText)"
					></span>
					<vl exp="\cdot" />
					<span
						contenteditable
						class="number-input"
						:class="(expFuncInput[i-1][1].isZero() ? 'number-input-error' : '')"
						@input="expFuncInput[i-1][1] = Frac.fromStr($event.target.innerText)"
					></span>
					<vl exp="^n \cdot" />
					<span>n^</span>
					<span
						contenteditable
						class="number-input"
						:class="(!isNatural(expFuncInput[i-1][2]) ? 'number-input-error' : '')"
						@input="expFuncInput[i-1][2] = Number($event.target.innerText)"
					>0</span>
					<vl v-if="i != expFuncNum" exp="+" />
				</template>
			</div>
			
		</div>
		
		<!-- 遞迴初始條件 (有一些輸入框) -->
		<div class="ts-wrap is-compact is-middle-aligned">
			<div v-for="i in recurNum" class="group-box" style="--bg: #ddd;">
				<vl :exp="`a_${i-1} =`" />
				<span
					contenteditable
					class="number-input"
					@input="initConstInput[i-1] = Frac.fromStr($event.target.innerText)"
				></span>
			</div>
		</div>
		
		<!-- 根據輸入框得到的遞迴式 -->
		<vl c :exp="getLatex()" />
		
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { isNatural, Frac, makeRecurLatex } from "@/libs/RanMath.js";

const emit = defineEmits([
	"input", // 遞迴式改變時, 上傳遞迴式資訊
]);

const regionList = [ // 用於生成三個區塊: 遞迴階數, 多項式次數, 指數項數 的調整按鈕
	{
		name: "遞迴階數", // 區塊名稱
		bgColor: "#fcc", // 區塊的背景顏色
		add: (n) => { recurNum.value += n; }, // 將區塊對應的變數 +1 或 -1
		isMin: () => recurNum.value <= 1, // 區塊對應的變數是否到下限
		isMax: () => recurNum.value >= 3, // 區塊對應的變數是否到上限
	},
	{
		name: "多項式次數",
		bgColor: "#bfb",
		add: (n) => { polyDegree.value += n; },
		isMin: () => polyDegree.value <= -1,
		isMax: () => polyDegree.value >= 3,
	},
	{
		name: "指數項數",
		bgColor: "#ccf",
		add: (n) => { expFuncNum.value += n; },
		isMin: () => expFuncNum.value <= 0,
		isMax: () => expFuncNum.value >= 3,
	},
];

const recurNum = ref(2); // 遞迴階數, 範圍: 1 ~ 3
const polyDegree = ref(-1); // 多項式次數, 範圍: -1 ~ 2
const expFuncNum = ref(0); // 指數項數, 範圍: 0 ~ 2

const recurCoefInput = ref([]); // 遞迴的係數 Arr[Frac], 元素個數 = 遞迴階數
const polyCoefInput = ref([]); // 多項式的係數 Arr[Frac], 元素個數-1 = 多項式次數
const expFuncInput = ref([]); // 指數部分的係數和底數 Arr[[Frac, Frac, int]], 元素個數 = 指數項數
const initConstInput = ref([]); // 遞迴的初始條件 Arr[Frac], 元素個數 = 遞迴階數

const recurCoef = ref([]); // 去除 0 係數的遞迴
const nonHomoFunc = ref({}); // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 { "k,b.n/b.d": c , ... }
const initConst = ref([]); // 遞迴的初始條件, 會保持與 recurCoef 的大小相同

const getTermLatex = (n) => { // 生成多項式的特定冪次 (latex 字串), 用於多項式的輸入框
	const term = (n == 0 ? "" : (n == 1 ? "n" : `n^${n}`));
	const add = (n == polyDegree.value ? "" : (n == 0 ? "+" : "~+"));
	return term + add;
};

watch(recurNum, (newRecurNum) => { // 當遞迴階數改變時
	while (recurCoefInput.value.length < newRecurNum) recurCoefInput.value.push(new Frac(0)); // array 長度不夠就補 0
	while (recurCoefInput.value.length > newRecurNum) recurCoefInput.value.pop(); // array 長度過長就刪除尾端
	while (initConstInput.value.length < newRecurNum) initConstInput.value.push(new Frac(0)); // array 長度不夠就補 0
	while (initConstInput.value.length > newRecurNum) initConstInput.value.pop(); // array 長度過長就刪除尾端
}, { immediate: true });

watch(polyDegree, (newPolyDegree) => { // 當多項式次數改變時
	while (polyCoefInput.value.length < newPolyDegree+1) polyCoefInput.value.push(new Frac(0)); // array 長度不夠就補 0
	while (polyCoefInput.value.length > newPolyDegree+1) polyCoefInput.value.pop(); // array 長度過長就刪除尾端
}, { immediate: true });

watch(expFuncNum, (newExpFuncNum) => { // 當指數項數改變時
	while (expFuncInput.value.length < newExpFuncNum) { // array 長度不夠就補 [0, 0]
		expFuncInput.value.push([new Frac(0), new Frac(0), 0]);
	}
	while (expFuncInput.value.length > newExpFuncNum) expFuncInput.value.pop(); // array 長度過長就刪除尾端
}, { immediate: true });

watch(recurCoefInput, (newInput) => { // 遞迴部分被修改
	let coef = [...newInput];
	while (coef.length > 0 && coef[coef.length-1].isZero()) coef.pop(); // 去除 0 係數遞迴
	recurCoef.value = coef;
	initConst.value = initConstInput.value.slice(0, coef.length); // 遞迴的初始條件, 會保持與 recurCoef 的大小相同
}, { immediate: true, deep: true });

watch([polyCoefInput, expFuncInput], ([newPolyCoefInput, newExpFuncInput]) => { // 當非齊次部分被修改
	let expFunc = {}; // 使用 dict 來合併重複的指數
	const addTerm = (frac_c, k, frac_b) => { // 將 c n^k b^n 項加入到 expFunc
		if (frac_c.isZero() || frac_b.isZero()) return; // 係數為 0 或底數為 0 -> 可忽略
		
		const key = `${k},${frac_b.n}/${frac_b.d}`; // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 { "k,b.n/b.d": c , ... }
		if (key in expFunc) expFunc[key] = expFunc[key].add(frac_c); // key 存在
		else expFunc[key] = frac_c; // key 不存在就建立新的
	};
	
	for (const [i, coef] of newPolyCoefInput.entries()) addTerm(coef, i, new Frac(1)); // 讀取多項式部分輸入
	
	for (const [frac_c, frac_b, k] of newExpFuncInput) if (isNatural(k)) addTerm(frac_c, k, frac_b); // 讀取指數部分的輸入
	
	for (const [key, frac_c] of Object.entries(expFunc)) if (frac_c.isZero()) delete expFunc[key]; // 刪除係數為 0 的項
	
	nonHomoFunc.value = expFunc;
}, { immediate: true, deep: true });

watch(initConstInput, (newInput) => { // 當遞迴的初始條件被修改
	initConst.value = newInput.slice(0, recurCoef.value.length); // 遞迴的初始條件, 會保持與 recurCoef 的大小相同
}, { immediate: true, deep: true });

const getLatex = () => { // 顯示在遞迴產生器下方的遞迴式的 latex 字串
	emit("input", { // 當遞迴式改變時, 上傳遞迴式至 RecurView
		recurCoef: recurCoef.value,
		nonHomoFunc: nonHomoFunc.value,
		initConst: initConst.value,
	});
	return makeRecurLatex(recurCoef.value, nonHomoFunc.value, initConst.value);
};
</script>

<style scoped>
.add-sub-button { /* + - 按鈕的樣式 */
	width: 28px; height: 28px; /* 比 tocas small 小一點 */
}
.add-sub-button:hover { /* + - 按鈕 hover 時, 會稍微變亮 */
	background-color: #fff6;
}
.group-box { /* 淺色背景的分組區域 */
	border-radius: 4px;
	padding: 4px;
	background-color: var(--bg);
	display: flex;
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
.number-input { /* 參數的輸入框 */
	border: none; border-radius: 4px;
	outline: none; /* 選取時不出現黑框 */
	padding: 0 4px;
	min-width: 20px;
	background-color: #fff;
	text-align: center;
	line-height: 1.8;
	white-space: nowrap; /* 禁止換行 */
}
.number-input-error { /* 不合法的輸入值會變成紅色 */
	color: #f00;
}
</style>
