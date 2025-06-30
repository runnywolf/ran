<template>
	<div class="ts-wrap is-vertical is-compact">
		<RandomSetting @submit="handleRandomSettingSubmit"></RandomSetting>
		<RecurFormSetting @recurFormChanged="handleRecurFormChanged"></RecurFormSetting>
		
		<!-- 遞迴式 (紅綠藍輸入框) -->
		<div class="ts-wrap is-middle-aligned" style="--gap: 0;">
			<!-- 齊次部分 (遞迴) -->
			<vl exp="a_n = " />
			<div class="group-box" style="--bg: #fcc;">
				<template v-for="(coef, i) in recurCoefInput">
					<span contenteditable class="number-input" @input="handleInputChanged($event.target, recurCoefInput, i)">
						{{ coef }}
					</span>
					<vl :exp="`a_{n-${i}}` + (i === recurCoefInput.length-1 ? '' : '~+')" />
				</template>
			</div>
			
			<!-- 非齊次部分 (多項式) -->
			<vl exp="+" />
			<div class="group-box" style="--bg: #bfb;">
				<template v-for="(coef, i) in polyCoefInput">
					<span contenteditable class="number-input" @input="handleInputChanged($event.target, polyCoefInput, i)">
						{{ coef }}
					</span>
					<vl v-if="polyCoefInput.length > 1" :exp="getTermLatex(i)" />
				</template>
			</div>
			
			<!-- 非齊次部分 (指數) -->
			<vl exp="+" />
			<div class="group-box" style="--bg: #ccf;">
				<template v-for="(term, i) in expFuncInput">
					<span contenteditable class="number-input" @input="handleInputChanged($event.target, term, 0)">
						{{ term[0] }}
					</span>
					<vl exp="\cdot" />
					<span>n^</span>
					<span contenteditable class="number-input" @input="handleInputChanged($event.target, term, 1, true)">
						{{ term[1] }}
					</span>
					<vl exp="\cdot" />
					<span contenteditable class="number-input" @input="handleInputChanged($event.target, term, 2)">
						{{ term[2] }}
					</span>
					<vl exp="^n" />
					<vl v-if="i !== expFuncInput.length-1" exp="+" />
				</template>
			</div>
			
		</div>
		
		<!-- 遞迴初始條件 (灰色輸入框) -->
		<div class="ts-wrap is-compact is-middle-aligned">
			<div v-for="(c, i) in initConstInput" class="group-box" style="--bg: #ddd;">
				<vl :exp="`a_${i} =`" />
				<span contenteditable class="number-input" @input="handleInputChanged($event.target, initConstInput, i)">
					{{ c }}
				</span>
			</div>
		</div>
		
		<!-- 根據輸入框得到的遞迴式 -->
		<vl c :exp="'?'" />
		
		<div>
			<button class="ts-button" @click="emitRecur()">計算</button>
		</div>
		
	</div>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import { isInt, Frac } from "ran-math";
import RandomSetting from './RandomSetting.vue'; // 用於調整遞迴生成器的參數
import RecurFormSetting from './RecurFormSetting.vue'; // 用於調整遞迴形式

const emit = defineEmits([ "submit" ]); // 按下計算按鈕後, 上傳遞迴資訊至 RecurView

// 因為我想要讓輸入框寬度隨著內容改變只能用 contenteditable span
// 但 span 不支援 v-model, 因此只能用 @input="arr[i] = $event.target.innerText" 綁定
// 但普通的 ref 變數對 arr[i] 賦值會觸發模板更新 {{ coef }} , 當 span 被修改時, 我正在編輯的字串被覆寫導致光標會跑掉
// 所以在這邊使用 shallowRef, 因為只有修改 .value 才會觸發更新
const recurCoefInput = shallowRef([]); // 輸入框取得: 遞迴的係數 Array<string>, 元素個數 = 遞迴階數
const polyCoefInput = shallowRef([]); // 輸入框取得: 多項式的係數 Array<string>, 元素個數-1 = 多項式次數
const expFuncInput = shallowRef([]); // 輸入框取得: 指數部分的係數和底數 Array<[str, str, str]>, 元素個數 = 指數項數
const initConstInput = shallowRef([]); // 輸入框取得: 遞迴的初始條件 Array<string>, 元素個數 = 遞迴階數

const recurCoef = ref([]); // Array<nf> ; 齊次部分的係數, length 代表遞迴階數
const nonHomogFunc = ref([]); // Array<[nf, int, nf]> ; 非齊次的 frac_c n^k (frac_b)^n 項會表示為 [ [frac_c, k, frac_b], ... ]
const initConst = ref([]); // Array<nf> ; 遞迴的初始條件, 長度與 recurCoef 的大小相同

const handleRandomSettingSubmit = (numberRange, rootType) => { // 當生成器的設定改變時
	console.log(numberRange, rootType)
	// 寫入輸入框
	makeRecurData();
};

const handleRecurFormChanged = ({ recurOrder, polyDegree, expTermNum }) => { // 當遞迴形式改變時
	resizeRefArray(recurCoefInput, recurOrder, () => "");
	resizeRefArray(polyCoefInput, polyDegree + 1, () => ""); // n 次多項式有 n+1 個係數
	resizeRefArray(expFuncInput, expTermNum, () => ["", "0", ""]);
	resizeRefArray(initConstInput, recurOrder, () => "");
};

const resizeRefArray = (refArray, newLength, newElement) => { // 調整 ref Array 的 length, 增加長度會在 Array 尾端補 0
	const arr = refArray.value; // 取出 Array 的參考
	if (newLength < arr.length) arr.length = newLength; // 截斷多餘的部分
	while (newLength > arr.length) arr.push(newElement()); // 尾端補 0 或 [0, 0, 0], 使用箭頭函式防止指向同個 object
	refArray.value = [...arr]; // 修改 .value 觸發 shallowRef 使 ui 更新
};

const handleInputChanged = (element, updateArr, i, isPowerInput = false) => {
	let inputStr = element.innerText; // 輸入框的字串
	
	if (inputStr.includes("\n")) { // 如果輸入框的字串有換行符
		inputStr = inputStr.replace("\n", ""); // 移除換行符
		element.innerText = inputStr; // 強制移除, 避免輸入框高度變高
	}
	
	updateArr[i] = inputStr; // shallowRef 不會觸發模板更新
	
	if (!isPowerInput && !isNumberInputValid(inputStr)) element.style.color = "red"; // 除了 n^p 輸入框以外的, 且輸入值非法, 會顯示紅色字
	else if (isPowerInput && !isPowerInputValid(inputStr)) element.style.color = "red"; // n^p 輸入框, 輸入值非法, 會顯示紅色字
	else element.style.color = "black"; // 合法輸入值為黑色
	
	makeRecurData();
};

const isNumberInputValid = (str) => { // 除了 n^p 輸入框以外的, 判定輸入值是否合法
	if (str === "0") return true;
	return !Frac.fromStr(str).isZero(); // Frac.fromStr 如果輸入值無法轉為分數, 會回傳 F(0)
}

const isPowerInputValid = (str) => { // n^p 輸入框, 判定輸入值是否合法
	const p = Number(str);
	return isInt(p) && 0 <= p && p <= 3; // 只接受 0 ~ 3
};

const getTermLatex = (n) => { // 生成多項式的特定冪次 (latex 字串), 用於多項式的輸入框
	const term = (n === 0 ? "" : (n == 1 ? "n" : `n^${n}`));
	const add = (n === polyCoefInput.value.length-1 ? "" : (n == 0 ? "+" : "~+"));
	return term + add;
};

const makeRecurData = () => { // 將輸入框的字串轉為 Recur.vue 接受的參數
	recurCoef.value = recurCoefInput.value.map(str => Frac.fromStr(str));
	nonHomogFunc.value = [
		...polyCoefInput.value.map((str, i) => [Frac.fromStr(str), i, 1]), // c n^i -> c n^i 1^n
		...expFuncInput.value.map(
			([str_c, str_k, str_b]) => [Frac.fromStr(str_c), Number(str_k), Frac.fromStr(str_b)] // c n^k b^n
		)
	];
	initConst.value = initConstInput.value.map(str => Frac.fromStr(str));
};

const emitRecur = () => { // 上傳遞迴資訊至 RecurView
	emit("submit", recurCoef.value, nonHomogFunc.value, initConst.value);
};
</script>

<style scoped>
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
	min-width: 20px; height: 28px;
	background-color: #fff;
	text-align: center;
	line-height: 1.8;
	white-space: nowrap; /* 禁止換行 */
}
</style>
