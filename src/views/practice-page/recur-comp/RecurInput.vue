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
		
	</div>
</template>

<script setup>
import { shallowRef } from 'vue';
import { isInt, gcd, getRandomInt, Frac, F, EF } from "ran-math";
import RandomSetting from './RandomSetting.vue'; // 用於調整遞迴生成器的參數
import RecurFormSetting from './RecurFormSetting.vue'; // 用於調整遞迴形式

const INPUT_MAX_CHAR_COUNT = 8; // 輸入框的最大字元數

const emit = defineEmits([ "submit" ]); // 按下計算按鈕後, 上傳遞迴資訊至 RecurView

// 因為我想要讓輸入框寬度隨著內容改變只能用 contenteditable span
// 但 span 不支援 v-model, 因此只能用 @input="arr[i] = $event.target.innerText" 綁定
// 但普通的 ref 變數對 arr[i] 賦值會觸發模板更新 {{ coef }} , 當 span 被修改時, 我正在編輯的字串被覆寫導致光標會跑掉
// 所以在這邊使用 shallowRef, 因為只有修改 .value 才會觸發更新
const recurCoefInput = shallowRef([]); // 輸入框取得: 遞迴的係數 Array<string>, 元素個數 = 遞迴階數
const polyCoefInput = shallowRef([]); // 輸入框取得: 多項式的係數 Array<string>, 元素個數-1 = 多項式次數
const expFuncInput = shallowRef([]); // 輸入框取得: 指數部分的係數和底數 Array<[str, str, str]>, 元素個數 = 指數項數
const initConstInput = shallowRef([]); // 輸入框取得: 遞迴的初始條件 Array<string>, 元素個數 = 遞迴階數

const handleRandomSettingSubmit = (numberRange, rootType) => { // 當生成器的設定改變時
	generateRandomRecurCoef(numberRange, rootType); // 生成隨機的齊次係數, 並複寫到輸入框
	gererateRandomPolyCoef(numberRange); // 生成隨機的多項式, 並複寫到輸入框
	gererateRandomExpFunc(numberRange); // 生成隨機的指數項, 並複寫到輸入框
	gererateRandomInitConst(numberRange); // 生成隨機的初始條件, 並複寫到輸入框
	emitRecur(); // 上傳遞迴資訊至 RecurView
};

const generateRandomRecurCoef = (range, rootType) => { // 生成隨機的齊次係數, 並複寫到輸入框
	const order = recurCoefInput.value.length; // 遞迴階數
	const randomInt = () => getRandomInt(-range, range); // 隨機整數
	const randomNonZeroInt = () => getRandomInt(1, range) * (getRandomInt(0, 1) * 2 - 1); // 隨機非零整數
	const randomNonSquarePosInt = () => { // 隨機正整數 (非平方數)
		let int = getRandomInt(2, range);
		while (Math.round(int ** 0.5) ** 2 === int) int = getRandomInt(2, range); // 若隨機到平方數, 重骰
		return int;
	};
	let eigenvalue = []; // Array<EF> ; 遞迴特徵根
	
	if (rootType === "int") { // 生成整數特徵值
		eigenvalue = Array.from({ length: order }, () => new EF(randomNonZeroInt())); // 非零隨機整數
	}
	else if (rootType === "int-multi") { // 生成整數重根特徵值 (1 階遞迴無視此模式)
		const ef_multiRoot = new EF(randomNonZeroInt()); // 隨機的重根特徵值
		if (order === 2 || order === 3) eigenvalue = [ef_multiRoot, ef_multiRoot]; // 如果是 2, 3 階遞迴, 生成二重根
		if (order === 1 || order === 3) eigenvalue.push(new EF(randomNonZeroInt())); // 如果是 1, 3 階遞迴, 補上額外的一根
	}
	else if (rootType === "frac") { // 生成分數特徵值
		eigenvalue = Array.from({ length: order }, () => { // 非零隨機分數
			const n = randomNonZeroInt(); // 隨機分子
			let d = randomNonZeroInt(); // 隨機分母
			while (n % d === 0) d = randomNonZeroInt(); // 隨機分母, 並且不是整數
			return new EF(F(n, d));
		});
	}
	else if (rootType === "sqrt") { // 生成有根號的特徵值 (1 階遞迴無視此模式)
		const ef_root = new EF(randomInt(), randomNonZeroInt(), randomNonSquarePosInt()); // 隨機的共軛根
		if (order === 2 || order === 3) eigenvalue = [ef_root, ef_root.conjugate()]; // 如果是 2, 3 階遞迴, 生成一對共軛根
		if (order === 1 || order === 3) eigenvalue.push(new EF(randomNonZeroInt())); // 如果是 1, 3 階遞迴, 補上額外的一根
	}
	else if (rootType === "complex") { // 生成複數特徵值 (1 階遞迴無視此模式)
		const rootList = [ // -i ; 1-√3i ; 1-i ; 3-√3i ; 3+√3i ; 1+i ; 1+√3i ; i
			[0, -1, -1], [1, -1, -3], [1, -1, -1], [3, -1, -3], [3, 1, -3], [1, 1, -1], [1, 1, -3], [0, 1, -1],
		];
		const ef_root = new EF(...rootList[getRandomInt(0, 7)]).mul(randomNonZeroInt()); // 隨機的共軛根, tan^-1 一定可以化為有理數 pi
		if (order === 2 || order === 3) eigenvalue = [ef_root, ef_root.conjugate()]; // 如果是 2, 3 階遞迴, 生成一對共軛根
		if (order === 1 || order === 3) eigenvalue.push(new EF(randomNonZeroInt())); // 如果是 1, 3 階遞迴, 補上額外的一根
	}
	
	while (eigenvalue.length < 3) eigenvalue.push(new EF(0)); // 1 或 2 階遞迴需要補 0, 不然無法用下面的公式計算係數
	const [a, b, c] = eigenvalue; // (t-a)(t-b)(t-c) = t^3 - (a+b+c)t^2 + (ab+bc+ca)t - abc
	let recurCoef = [ // Array<EF> ; 齊次係數: a_n = (a+b+c) a_{n-1} - (ab+bc+ca) a_{n-2} + abc a_{n-3}
		a.add(b).add(c), new EF(0).sub(a.mul(b)).sub(b.mul(c)).sub(c.mul(a)), a.mul(b).mul(c)
	];
	recurCoef.length = order; // 依照遞迴階數裁切齊次係數 (因為剛剛在尾端補 0)
	recurCoefInput.value = recurCoef.map(ef => `${ef.nf_a.toStr()}`); // 將 EF 型態的齊次係數轉為 string, 並複寫到輸入框
};

const gererateRandomPolyCoef = (range) => { // 生成隨機的多項式, 並複寫到輸入框
	polyCoefInput.value = polyCoefInput.value.map(() => `${getRandomInt(-range, range)}`); // 生成隨機整係數
};

const gererateRandomExpFunc = (range) => { // 生成隨機的指數項, 並複寫到輸入框
	const randomIntNot0 = () => getRandomInt(1, range) * (getRandomInt(0, 1) * 2 - 1); // 隨機非零整數
	const randomIntNot01 = () => { // 隨機非 0, 1 整數
		return getRandomInt(0, 1) ? getRandomInt(2, range) : getRandomInt(-range, -1);
	};
	expFuncInput.value = expFuncInput.value.map(() => {
		return [`${randomIntNot0()}`, "0", `${randomIntNot01()}`]; // 隨機的 c b^n 項
	});
};

const gererateRandomInitConst = () => { // 生成隨機的初始條件, 並複寫到輸入框
	const order = initConstInput.value.length; // 遞迴階數
	if (order === 1 && polyCoefInput.value.length === 0 && expFuncInput.value.length === 0) {
		initConstInput.value = ["1"]; // 將 1 階齊次遞迴的初始條件設為 a_0 = 1
	} else { // 將 1 / 2 / 3 階遞迴的初始條件設為 [0] / [0, 1] / [0, 1, 2]
		initConstInput.value = Array.from({ length: order }, (_, i) => `${i}`);
	}
};

const handleRecurFormChanged = ({ recurOrder, polyDegree, expTermNum }) => { // 當遞迴形式改變時
	resizeRefArray(recurCoefInput, recurOrder, () => "");
	resizeRefArray(polyCoefInput, polyDegree + 1, () => ""); // n 次多項式有 n+1 個係數
	resizeRefArray(expFuncInput, expTermNum, () => ["", "0", ""]);
	resizeRefArray(initConstInput, recurOrder, () => "");
	
	emitRecur(); // 上傳遞迴資訊至 RecurView
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
	if (inputStr.length > INPUT_MAX_CHAR_COUNT) { // 如果輸入框的字串大於 6 個字元
		inputStr = inputStr.slice(0, INPUT_MAX_CHAR_COUNT); // 移除多餘的字元
		element.innerText = inputStr; // 強制移除
	}
	
	updateArr[i] = inputStr; // shallowRef 不會觸發模板更新
	
	if (!isPowerInput && !isNumberInputValid(inputStr)) element.style.color = "red"; // 除了 n^p 輸入框以外的, 且輸入值非法, 會顯示紅色字
	else if (isPowerInput && !isPowerInputValid(inputStr)) element.style.color = "red"; // n^p 輸入框, 輸入值非法, 會顯示紅色字
	else element.style.color = "black"; // 合法輸入值為黑色
	
	emitRecur(); // 上傳遞迴資訊至 RecurView
};

const isNumberInputValid = (str) => { // 除了 n^p 輸入框以外的, 判定輸入值是否合法
	if (str === "" || str === "0") return true;
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

const emitRecur = () => { // 上傳遞迴資訊至 RecurView
	const recurCoef = recurCoefInput.value.map(str => Frac.fromStr(str));
	const nonHomogFunc = [
		...polyCoefInput.value.map((str, i) => [Frac.fromStr(str), i, 1]), // c n^i -> c n^i 1^n
		...expFuncInput.value.map(
			([str_c, str_k, str_b]) => [Frac.fromStr(str_c), Number(str_k), Frac.fromStr(str_b)] // c n^k b^n
		)
	];
	const initConst = initConstInput.value.map(str => Frac.fromStr(str));
	
	emit("submit", recurCoef, nonHomogFunc, initConst);
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
