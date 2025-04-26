<template>
	<div class="ts-wrap is-vertical is-compact">
		
		<!-- 隨機生成器 -->
		<div class="ts-wrap is-compact is-middle-aligned">
			
			<!-- 隨機生成按鈕 -->
			<button class="ts-button is-outlined" @click="makeRandomRecur">隨機生成</button>
			
			<!-- 常數範圍 -->
			<div class="ts-select is-solid">
				<select v-model="randomRange">
					<option value="3">± 3&nbsp;&nbsp;以內</option>
					<option value="6">± 6&nbsp;&nbsp;以內</option>
					<option value="10">± 10&nbsp;&nbsp;以內</option>
				</select>
			</div>
			
			<!-- 常數型態 -->
			<div class="ts-select is-solid">
				<select v-model="randomType">
					<option value="z">整數</option>
					<option value="q">有理數</option>
				</select>
			</div>
			
			<span>的遞迴特徵值和非齊次常數</span>
			
			<!-- 有理係數的提示 -->
			<span
				class="ts-icon is-circle-question-icon"
				data-tooltip="「± 3 以內的有理數」<br>表示分子和分母均介於 ± 3 以內"
				data-html=true
			></span>
			
		</div>
		
		<!-- 調整遞迴式各區塊的按鈕 -->
		<div class="ts-wrap is-compact is-middle-aligned">
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
						@input="recurCoefInput[i-1] = checkFracInput($event.target.innerText)"
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
						@input="polyCoefInput[i-1] = checkFracInput($event.target.innerText)"
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
						@input="expFuncInput[i-1][0] = checkFracInput($event.target.innerText)"
					></span>
					<vl exp="\cdot" />
					<span
						contenteditable
						class="number-input"
						:class="(expFuncInput[i-1][1].isZero() ? 'number-input-error' : '')"
						@input="expFuncInput[i-1][1] = checkFracInput($event.target.innerText)"
					></span>
					<vl exp="^n \cdot" />
					<span>n^</span>
					<span
						contenteditable
						class="number-input"
						:class="(!isNatural(expFuncInput[i-1][2]) ? 'number-input-error' : '')"
						@input="expFuncInput[i-1][2] = checkPowerInput($event.target.innerText)"
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
					@input="initConstInput[i-1] = checkFracInput($event.target.innerText)"
				></span>
			</div>
		</div>
		
		<!-- 根據輸入框得到的遞迴式 -->
		<vl c :exp="recurLatex" />
		
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getRandomInt, isNatural, Frac } from "@/libs/RanMath.js";

const props = defineProps({
	recurLatex: { type: String, default: "?" }, // 遞迴關係式的 latex 字串
});

const emit = defineEmits([
	"input", // 遞迴式改變時, 上傳遞迴式資訊
]);

const randomRange = ref(3); // 隨機生成的常數範圍
const randomType = ref("z"); // 隨機生成整數/有理數

const getRandomNum = (range, isInt, nonZero = false) => { // 生成隨機數字, 回傳 Frac
	const denom = isInt ? 1 : getRandomInt(1, range); // 分母
	if (nonZero) return new Frac(getRandomInt(1, range) * (getRandomInt(0, 1) * 2 - 1), denom); // 回傳隨機非零數字
	return new Frac(getRandomInt(-range, range), denom); // 回傳隨機數字
};

const makeRandomRecur = () => { // 生成隨機遞迴
	const r = randomRange.value; // 隨機生成的範圍
	const isInt = (randomType.value != "q"); // 生成的數字類型, 只要不為有理數, 就是整數
	
	const level = recurNum.value; // 遞迴階數, 隨機生成 齊次遞迴的特徵多項式的根
	const [r1, r2, r3] = Array.from({ length: level }, () => getRandomNum(r, isInt, true)); // 根必須非零, 不然遞迴會降階
	if (level == 1) { // (x-r1)=0  >>>  x = r1
		recurCoefInput.value = [ r1 ];
	} else if (level == 2) { // (x-r1)(x-r2)=0  >>>  x^2 = (r1+r2)x - r1r2
		recurCoefInput.value = [ r1.add(r2), r1.mul(r2).mul(-1) ];
	} else if (level == 3) { // (x-r1)(x-r2)(x-r3)=0  >>>  x^3 = (r1+r2+r3)x^2 - (r1r2+r2r3+r3r1)x + r1r2r3
		recurCoefInput.value = [
			r1.add(r2).add(r3), r1.mul(r2).add(r2.mul(r3)).add(r3.mul(r1)).mul(-1), r1.mul(r2).mul(r3)
		];
	}
	
	const pd = polyDegree.value; // 多項式次數
	polyCoefInput.value = Array.from({ length: pd+1 }, (v, i) => { // 隨機生成 多項式的係數
		if (i === pd) return getRandomNum(r, isInt, true); // 多項式最高項不為 0
		return getRandomNum(r, isInt);
	});
	
	const efn = expFuncNum.value; // 指數項數
	expFuncInput.value = Array.from({ length: efn }, () => { // 隨機生成 指數部分的係數和底數
		return [ getRandomNum(r, isInt, true), getRandomNum(r, isInt, true), 0 ];
	});
	
	initConstInput.value = Array.from({ length: level }, (v, i) => new Frac(i)); // 隨機生成 遞迴的初始條件
};

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
const polyDegree = ref(-1); // 多項式次數, 範圍: -1 ~ 3
const expFuncNum = ref(0); // 指數項數, 範圍: 0 ~ 3

const recurCoefInput = ref([]); // 輸入框取得: 遞迴的係數 Arr[Frac], 元素個數 = 遞迴階數
const polyCoefInput = ref([]); // 輸入框取得: 多項式的係數 Arr[Frac], 元素個數-1 = 多項式次數
const expFuncInput = ref([]); // 輸入框取得: 指數部分的係數和底數 Arr[[Frac, Frac, int]], 元素個數 = 指數項數
const initConstInput = ref([]); // 輸入框取得: 遞迴的初始條件 Arr[Frac], 元素個數 = 遞迴階數

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

const MAX_INPUT_LENGTH = 6; // 輸入框的最大字符限制
const MAX_EXP_POWER = 3; // c n^k b^n 項的 k 的最大值

const recurCoef = ref([]); // 去除 0 係數的遞迴
const nonHomoFunc = ref({}); // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 { "k,b.n/b.d": c , ... }
const initConst = ref([]); // 遞迴的初始條件, 會保持與 recurCoef 的大小相同

const getTermLatex = (n) => { // 生成多項式的特定冪次 (latex 字串), 用於多項式的輸入框
	const term = (n == 0 ? "" : (n == 1 ? "n" : `n^${n}`));
	const add = (n == polyDegree.value ? "" : (n == 0 ? "+" : "~+"));
	return term + add;
};

const checkFracInput = (inputText) => { // 檢查分數輸入
	if (inputText.length > MAX_INPUT_LENGTH) return new Frac(0); // 0 默認為不佳 (或是錯誤) 的輸入
	return Frac.fromStr(inputText);
};

const checkPowerInput = (inputText) => { // 檢查非齊次的 c n^k b^n 項的 k 的輸入, 是否在正常範圍
	const power = Number(inputText);
	if (isNatural(power) && 0 <= power && power <= MAX_EXP_POWER) return power;
	return -1; // -1 會被認為是錯誤的輸入 (會在 nonHomoFunc 建構時被忽略)
};

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

watch([recurCoef, nonHomoFunc, initConst], ([newRecurCoef, newNonHomoFunc, newInitConst]) => {
	emit("input", { // 當遞迴式改變時, 上傳遞迴式至 RecurView
		recurCoef: newRecurCoef,
		nonHomoFunc: newNonHomoFunc,
		initConst: newInitConst,
	});
});
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
