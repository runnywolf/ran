<template>
	計算 <vl exp="a_n^{(p)}" /> 之中，指數項 <vl :exp="expData.mlExp()" />
	對應的 {{ expData.PjNum }} 個未知係數 <vl :exp="expData.mlSomePj()" />，<br>
	需要將 <vl :exp="expData.mlNRange()" /> 代入式 (1)，產生 {{ expData.PjNum }} 個式子的線性方程組，並解聯立：<br>
	<vl c :exp="expData.mlParticularLinearEquation()" />
	其中 <vl :exp="`F(n) = ${_mlExpTerm(false, 0)}`" />，<br>
	<vl :exp="`a_n^{(p)} = ${_mlExpTerm(true, extraNPow)}`" />，代入常數後得到：
	<vl c :exp="expData.mlPjLinearEquation()" />
	展開後得到：
	<vl c :exp="expData.mlSolvePjEquationSystem()" />
	使用高斯消去法解 <vl exp="p_j" /> 的聯立方程式，得到：
	<vl c :exp="expData.mlPjAnswer()" />
</template>

<script setup>
import { ref, toRaw, watch } from "vue";
import { F, Frac, Matrix, SCL, _mlTerm, _mlEquationSystem } from "@/libs/RanMath.js";
import { removePrefix } from "@/libs/StringTool.js";

const props = defineProps({
	recurCoef: { type: Array, default: [] }, // 齊次部分的係數, length 代表遞迴階數
	frac_b: { type: Frac, default: new Frac(0) }, // 指數項 b^n 的 b
	polyCoef: { type: Array, default: [] }, // 含有相同指數項的多項式係數
	extraNPow: { type: Number, default: 0 }, // 為保持特解的線性獨立性, 額外乘上去的 n^p
	startPj: { type: Number, default: 0 }, // 特解當中指數項 b^n 對應的多項式的未知係數 p_j 的最小 j
	_mlExpTerm: { type: Function, default: () => "{?}" }, // 來自 RecurNonHomog.vue 的閉包, 注意: s_frac_b 已被傳入, 只需給予 isUnknownCoef, extraNPow
});

const emit = defineEmits([
	"PjAnswer", // 非齊次部分的未知係數 p_j 的計算結果
]);

class SolveNonHomogExp { // 計算遞迴特解當中的某個指數部分 b^n 對應的未知係數 p_j (比較係數法允許這麼做)
	constructor(recurCoef = [], frac_b, polyCoef, extraNPow, startPj) {
		this.recurCoef = recurCoef;
		this.frac_b = frac_b;
		this.polyCoef = polyCoef;
		this.extraNPow = extraNPow;
		this.startPj = startPj;
		
		this.recurLevel = recurCoef.length; // 遞迴階數
		this.PjNum = polyCoef.length; // 未知係數的數量, 與多項式次數相同
		
		this._initPjLinearEquation(); // a_n^(p) 以 p_j 表示的線性關係
		this._initNonHomogFn(); // 將常數代入非齊次部分 F(n) 得到的值
		this._initPjEquationSystem(); // 生成 p_j 的聯立方程式
		this._initSolvePj(); // 解聯立求 p_j
	}
	
	_initPjLinearEquation() { // a_n^(p) 以 p_j 表示的線性關係
		const l = this.recurLevel; // 遞迴階數
		const pjn = this.PjNum; // 未知係數的數量
		const coef = (n, i) => F(n**(i + this.extraNPow)).mul(this.frac_b.pow(n)); // 回傳 a_n^{(p)} 內 p_{startPj + i} 的係數 n^(i+k) b^n
		this.matrix_PjLE = new Matrix(pjn+l, pjn, (n, i) => coef(n, i)); // a_n^(p) 代入自然數 n 產生 用於求特解未知數 p_j 所需的足量線性方程式
	}
	
	_initNonHomogFn() { // 將常數代入非齊次部分 F(n) 得到的值
		const F = (n) => { // 非齊次部分 F(n) 代入 n 的結果
			const fracArr = this.polyCoef.map((frac_c, i) => frac_c.mul(n**i)); // 代入 n 得到的常數 c0 , c1 n , c2 n^2 , ...
			return Frac.sum(fracArr).mul(this.frac_b.pow(n)) // (c0 + c1 n + c2 n^2 + ...) b^n
		};
		this.matrix_nonHomogFn = new Matrix(this.PjNum, 1, n => F(n + this.recurLevel)); // 將常數代入非齊次部分 F(n) 得到的值
	}
	
	_initPjEquationSystem() { // 生成 p_j 的聯立方程式
		const l = this.recurLevel; // 遞迴階數
		const pjn = this.PjNum; // 未知係數的數量
		const matrix_PLE = new Matrix(pjn, pjn+l, (i, j) => {
			for (const [k, frac_coef] of this.recurCoef.entries()) if (i+k === j) return frac_coef.mul(-1);
			if (i+l === j) return 1;
			return 0;
		});
		this.matrix_solvePj = matrix_PLE.mul(this.matrix_PjLE); // 與有很多 p_j 的聯立方程式相乘就會得到一個 n*n 方陣 (解 p_j 的聯立方程式)
	}
	
	_initSolvePj() { // 解聯立求 p_j
		const matrix_F = this.matrix_nonHomogFn;
		this.PjAnswer = this.matrix_solvePj.inverse().mul(matrix_F).arr.map(row => row[0].nf_a);
	}
	
	mlExp() { // 計算 a_n^(p) 之中, 指數項 "{b_i}^n" ... (latex)
		return removePrefix(_mlTerm(1, this.frac_b, 'n'), '+');
	}
	
	mlSomePj() { // 對應的 ? 個未知係數 "p_j, ... , p_{j+l-1}" (latex)
		if (this.PjNum <= 0) return "?";
		if (this.PjNum == 1) return `p_{${this.startPj}}`;
		if (this.PjNum == 2) return `p_{${this.startPj}} ~,~ p_{${this.startPj + 1}}`
		
		const endPj = this.startPj + this.PjNum - 1; // 未知係數 p_j 的最大編號 j
		return `p_{${this.startPj}} ~,~ \\cdots ,~ p_{${endPj}}`;
	}
	
	mlNRange() { // 需要將 "n = ? ~ ?" 代入式 (1), 產生... (latex)
		let s_latex = `n = ${this.recurLevel}`;
		if (this.PjNum > 1) s_latex += `\\sim ${this.recurLevel + this.PjNum - 1}`;
		return s_latex;
	}
	
	mlParticularLinearEquation() { // 產生 ? 個式子的線性方程組，並解聯立："..." (latex)
		const l = this.recurLevel; // 遞迴階數
		let s_latex = Array.from({ length: this.PjNum }, (_, n) => { // 需要求幾個未知係數 p_j, 就要生成幾個式子
			let s_equationLatex = this.recurCoef.map( // "- h_1 a_{n-1}^{(p)} - h_2 a_{n-2}^{(p)} - h_3 a_{n-3}^{(p)}" (latex)
				(frac_coef, i) => _mlTerm(frac_coef.mul(-1), `a_{${n+(l-1)-i}}^{(p)}`, 1, true, true)
			).join(" ");
			return `a_{${n+l}}^{(p)} ${s_equationLatex} = F(${n+l})`; // "a_n^{(p)} - h_1 a_{n-1}^{(p)} - h_2 a_{n-2}^{(p)} - h_3 a_{n-3}^{(p)} = F(n)" (latex)
		}).join(" \\\\ "); // 以換行符連接所有的式子
		
		return `\\begin{cases} ${s_latex} \\end{cases}`; // 加上聯立方程式的 latex 對齊規則
	}
	
	mlPjLinearEquation() { // 代入常數後得到："..." (latex)
		return _mlEquationSystem(
			this.recurLevel + this.PjNum,
			this.PjNum,
			(n, j) => this.matrix_PjLE.arr[n][j].nf_a,
			(n, j) => `p_{${this.startPj + j}}`,
			(n) => `a_{${n}}^{(p)}`,
			"left"
		);
	}
	
	mlSolvePjEquationSystem() { // 展開後得到: "p_j 的線性聯立方程式" (latex)
		return _mlEquationSystem(
			this.PjNum,
			this.PjNum,
			(i, j) => this.matrix_solvePj.arr[i][j].nf_a,
			(i, j) => `p_{${j+1}}`,
			(i) => `${this.matrix_nonHomogFn.arr[i][0].nf_a.toLatex()}`,
			"right"
		);
	}
	
	mlPjAnswer() { // 使用高斯消去法解 p_j 的聯立方程式，得到: "..." (latex)
		return this.PjAnswer.map(
			(frac_Pj, i) => `p_{${this.startPj + i}} = ${frac_Pj.toLatex()}`
		).join(` ${SCL} `);
	}
}

const expData = ref(null); // 未知係數 p_j 的計算結果

watch( // 遞迴式更新時, 重新計算未知係數 p_j
	() => [props.recurCoef, props.frac_b, props.polyCoef, props.extraNPow, props.startPj],
	([newRC, newB, newCE, newENP, newSPj]) => {
		expData.value = new SolveNonHomogExp(newRC, newB, newCE, newENP, newSPj);
		emit("PjAnswer", toRaw(expData.value.PjAnswer)); // 上傳係數 p_j 至 RecurNonHomog.vue
	},
	{ immediate: true, deep: true }
);
</script>
