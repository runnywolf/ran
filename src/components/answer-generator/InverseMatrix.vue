<template>
	<Content v-if="errorMessage" colorStyle="red" collapsed>
		<code>{{ errorMessage }}</code>
	</Content>
	<div v-else>
		<vl v-for="str in processLatexStrArr" c :exp="str" />
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { EF, Matrix, MakeLatex as ml } from "ran-math";

const props = defineProps({
	n: { type: Number, default: 0 }, // n 階方陣
	arr: { type: Array, default: [] }, // 要求逆矩陣的 arr
});

const errorMessage = ref(null); // 錯誤訊息
const processLatexStrArr = ref([]); // 逆矩陣的計算過程的多個 latex 字串

watch(() => [props.n, props.arr], ([n, arr]) => { // 當參數變化時, 重新生成詳解
	if (n <= 0) {
		errorMessage.value = "必須為 >= 1 階方陣。"; return;
	}
	
	let matrix = null; // 用於計算逆矩陣的 n*(2n) 矩陣
	try {
		const matrix_i = Matrix.createI(n); // 單位矩陣
		matrix = new Matrix(n, n*2, (i, j) => j < n ? arr[i][j] : matrix_i.arr[i][j-n]); // 將 arr 轉為 Matrix 物件, 並在右側增廣一個單位矩陣
	} catch (err) { // 只有元素型態錯誤才會引起報錯
		errorMessage.value = `輸入的 ${n}*${n} 矩陣 arr 的某些元素不是 number | Frac | EF。`; return;
	}
	
	processLatexStrArr.value = getProcessLatexStrArr(matrix);
}, { immediate: true, deep: true });

function mlAugmentedMatrix(matrix) { // 將 Matrix 型態的增廣矩陣轉為 latex 語法
	const n = matrix.n; // 增廣矩陣的列數
	let s_latex = matrix.arr.map(row => row.map(ef => ef.toLatex()).join("&")).join("\\\\"); // 將 Matrix 轉為 latex 矩陣語法
	s_latex = `\\begin{array}{${"c".repeat(n)}|${"c".repeat(n)}}${s_latex}\\end{array}`; // 加入增廣矩陣的分隔線
	s_latex = `\\left[${s_latex}\\right]`; // 加入兩側的矩陣 "[]" 符號
	return `\\def\\arraystretch{1.4}${s_latex}`; // 加大行距
}

function mlAugmentedMatrixAndOperation(matrix, ivArr) { // 在增廣矩陣右側新增矩陣列運算的描述; ivArr: Array<{ index: ?, latex: ? }>
	const describeLatexArr = Array(matrix.n).fill("{}"); // 若某一列沒有描述, 設為 "{}" 作為佔位符, 防止矩陣排版塌縮
	for (const { index, latex } of ivArr) describeLatexArr[index] = latex ? latex : "{}"; // 在矩陣第 i 列的右側新增描述
	const s_latex = `\\begin{matrix}${describeLatexArr.join("\\\\")}\\end{matrix}`; // 轉成矩陣的 latex 語法
	return mlAugmentedMatrix(matrix) + `\\!\\!${s_latex}`; // 在增廣矩陣右側新增矩陣列運算的描述
}

function mlSwapRow(matrix, i, j) { // 若矩陣因為對角線元素為 0 而需要交換兩列, 的解題步驟 latex
	const ivArr = [ // 描述為 "<- swap" (latex 語法)
		{ index: i, latex: "\\gets\\text{swap}" },
		{ index: j, latex: "\\gets\\text{swap}" },
	];
	return mlAugmentedMatrixAndOperation(matrix, ivArr);
}

function mlScaleRow(matrix, ivArr) { // 若矩陣需要列乘純量, 的解題步驟 latex; ivArr: Array<{ index: ?, scalar: ? }>
	const getLatex = ef => ef.equal(1) ? "" : `\\times(${ef.toLatex()})`; // 乘 0 不顯示
	ivArr = ivArr.map(({ index, scalar: ef }) => ({ index, latex: getLatex(ef) }));
	return mlAugmentedMatrixAndOperation(matrix, ivArr);
}

function mlAddRow(matrix, i, ivArr) { // 若需要用列 i 乘純量消去下方的多個列, 的解題步驟 latex; ivArr: Array<{ index: ?, scalar: ? }>
	const getLatex = ef => {
		if (ef.equal(0)) return ""; // 乘 0 不顯示
		const s_latex = ml.term(ef, `r_{${i+1}}`, 1);
		return s_latex[0] === "-" ? s_latex	: `+${s_latex}`; // 開頭不是 "-" 要補 "+" 符號
	};
	ivArr = ivArr.map(({ index, scalar: ef }) => ({ index, latex: getLatex(ef) }));
	ivArr.push({ index: i, latex: `\\boxed{r_{${i+1}}}` }); // 如果不需要消去, 不需要加這個 "[a_i]"
	return mlAugmentedMatrixAndOperation(matrix, ivArr);
}

function getProcessLatexStrArr(matrix) { // 生成逆矩陣的計算過程
	const n = matrix.n; // 矩陣的列數
	const latexArr = []; // 逆矩陣的計算過程的多個 latex 字串
	
	for (let i = 0; i <= n-2; i++) { // 消去原矩陣的下三角部分
		let swapI = i;
		while (matrix.arr[swapI][i].equal(0)) { // 若對角線元素為 0, 尋找適合交換的列編號
			swapI++;
			if (swapI >= n) throwErr("Matrix.inverse", "Matrix is not invertible."); // 若找不到適合交換的列, 矩陣為奇異矩陣, 不可逆
		}
		if (swapI !== i) { // 需要交換
			latexArr.push(mlSwapRow(matrix, i, swapI)); // 生成計算步驟的 latex
			matrix.swapRow(i, swapI); // 交換兩列
		}
		
		const ivArr = []; // 需要消去的倍數和列編號
		for (let j = i+1; j <= n-1; j++) {
			const ef_s = matrix.arr[j][i].div(matrix.arr[i][i]).mul(-1); // 列 i 乘 -s 倍加到列 j, 逐漸消去原矩陣的下三角部分
			if (!ef_s.equal(0)) ivArr.push({ index: j, scalar: ef_s }); // 紀錄計算步驟 (乘常數加到另一列)
		}
		if (ivArr.length > 0) latexArr.push(mlAddRow(matrix, i, ivArr)); // 如果有需要 add row, 則生成計算步驟的 latex
		ivArr.forEach(({ index, scalar }) => matrix.addRow(i, index, scalar)); // 列 i 乘 -s 倍加到列 j
	}
	
	for (let i = n-1; i >= 1; i--) { // 消去原矩陣的上三角部分
		const ivArr = []; // 需要消去的倍數和列編號
		for (let j = i-1; j >= 0; j--) {
			const ef_s = matrix.arr[j][i].div(matrix.arr[i][i]).mul(-1); // 列 i 乘 -s 倍加到列 j, 逐漸消去原矩陣的下三角部分
			if (!ef_s.equal(0)) ivArr.push({ index: j, scalar: ef_s }); // 紀錄計算步驟 (乘常數加到另一列)
		}
		if (ivArr.length > 0) latexArr.push(mlAddRow(matrix, i, ivArr)); // 如果有需要 add row, 則生成計算步驟的 latex
		ivArr.forEach(({ index, scalar }) => matrix.addRow(i, index, scalar)); // 列 i 乘 -s 倍加到列 j
	}
	
	const ivArr = [];
	for (let i = 0; i < n; i++) {
		ivArr.push({ index: i, scalar: new EF(1).div(matrix.arr[i][i]) }); // 同除對角線
	}
	if (ivArr.length > 0) latexArr.push(mlScaleRow(matrix, ivArr)); // 如果有需要 scale row, 則生成計算步驟的 latex
	ivArr.forEach(({ index, scalar }) => matrix.scaleRow(index, scalar)); // 同除對角線
	
	latexArr.push(mlAugmentedMatrix(matrix)); // 計算結果
	latexArr.forEach((latex, i, arr) => { if (i > 0) arr[i] = `\\sim${latex}` }); // 第二個步驟開始, 需要加 "~" 符號
	return latexArr;
}
</script>
