<template>
	<div v-if="1 <= recurCoef.length && recurCoef.length <= 3"><!-- 必須為 1 ~ 3 階遞迴 -->
		遞迴關係式和初始條件為
		<vl c :exp="recurLatex" />
		
		<span class="ts-text is-large is-bold">Step1：求齊次解的形式</span><br>
		遞迴的齊次部分為 <vl :exp="getLatexRecurHomog(recurCoef)" /><br>
		<vl exp="\Rightarrow" /> 特徵方程式為 <vl :exp="recur.makeLatexCharPoly()" /><br>
		<vl :exp="`\\Rightarrow ~ t = ${recur.makeLatexChar()}`" />
		<span v-if="recur.showNoRationalRoot()" style="color: #eb0; margin-left: 10px;">
			<span class="ts-icon is-circle-exclamation-icon"></span>
			不存在有理數根
		</span>
		<div style="height: 12px;"></div>
		<span v-if="recur.multiRootNum > 1">
			有{{ recur.multiRootNum == 2 ? "二" : "三" }}重根
			<vl :exp="recur.frac_multiRoot.toLatex()" />，需要設
			<vl :exp="recur.makeLatexMultiRootHomog()" /> 保證線性獨立。<br>
		</span>
		<span v-else>
			無重根，<br>
		</span>
		因此將齊次解設為
		<vl c :exp="`a_n^{(h)} = ${recur.makeLatexHomogForm()}`" />
		
		<span class="ts-text is-large is-bold">Step2：求特解</span><br>
		<div v-if="Object.keys(nonHomoFunc).length > 0">
			遞迴的非齊次部分為
			<vl c :exp="getLatexRecurNonHomog(nonHomoFunc)" />
			合併相同的指數項：
			<vl c :exp="recur.makeLatexCombinedExp()" />
			猜測特解的形式為：
			<vl c :exp="recur.makeLatexParticularForm()" />
			其中多項式 <vl exp="g_i(n)" /> 的次數應與 <vl exp="f_i(n)" /> 相同。<br>
			<br>
			檢查齊次解 <vl exp="a_n^{(h)}" /> 和特解 <vl exp="a_n^{(p)}" />
			之中是否存在相同的指數部分 <vl exp="{b_i}^n" />：<br>
			<div v-if="Object.keys(recur.homogRootConflictNum).length > 0">
				由於 <vl :exp="recur.makeLatexExistHomogExp()" /> 已出現在 <vl exp="a_n^{(h)}" /> 之中，<br>
				若特解 <vl exp="a_n^{(p)}" /> 也包含同樣項次 <vl :exp="recur.makeLatexExistParticularExp()" />
				會導致與齊次解重疊，<br>
				為了保證特解與齊次解的線性獨立性，需要將
				<div class="ts-list is-unordered">
					<div v-for="latex in recur.makeLatexChangeExpList()" class="item">
						<vl :exp="latex[0]" /> 改為 <vl :exp="latex[1]" />
					</div>
				</div>
			</div>
			<div v-else>
				<vl exp="\Rightarrow" /> 不存在相同的指數部分。
			</div>
			<div style="height: 12px;"></div>
			因此特解的形式為：
			<vl c :exp="recur.makeLatexNewParticularForm()" />
			將上式代入原遞迴關係：
			<vl c :exp="makeLatexParticularIntoRecur(recurCoef)" />
			想要求出特解 <vl exp="a_n^{(p)}" /> 之中的 {{ recur.maxPi }} 個未知係數
			<vl :exp="recur.makeLatexSomePi()" />，<br>
			需要將 <vl :exp="recur.makeLatexNRange()" />
			代入上式，產生 {{ recur.maxPi }} 個式子的線性方程組，並解聯立。<br>
			移項後得到：
			<vl c :exp="recur.makeLatexEquationSystemP1()" />
			其中
			<vl c :exp="recur.makeLatexPiLinearEquation()" />
			你可以將以上兩個聯立方程式化為矩陣，再相乘。<br>
			展開後得到：
			<vl c :exp="recur.makeLatexSolvePiLinearEquation()" />
			使用高斯消去法解 <vl exp="p_i" /> 的聯立方程式，得到：
			<vl c :exp="recur.makeLatexPiAnswer()" />
		</div>
		<div v-else>
			遞迴式沒有非齊次部分，跳過這一步驟。
			<div style="height: 12px;"></div>
		</div>
		
		<span class="ts-text is-large is-bold">Step3：求通解</span><br>
		
	</div>
	<Content v-else colorStyle="red" collapsed>
		必須輸入 1 ~ 3 階遞迴
	</Content>
</template>

<script setup>
import { ref, watch } from "vue";
import { Frac, SolveCubic, Matrix, makeTermLatex, SCL } from "@/libs/RanMath.js";
import { removePrefix, removePostfix } from "@/libs/StringTool.js";
import Content from "@/components/global/Content.vue"; // 內容區塊的組件

class SolveRecur { // 解非齊次遞迴
	constructor(recurCoef = [], nonHomoFunc = {}, initConst = []) {
		this.recurCoef = recurCoef;
		this.nonHomoFunc = nonHomoFunc;
		this.initConst = initConst;
		
		this.recurLevel = this.recurCoef.length; // 遞迴階數
		
		let coef = [...recurCoef];
		while (coef.length < 3) coef.push(new Frac(0)); // 0, 1, 2 階遞迴要解三次特徵方程式需要補足係數
		this.cubic = new SolveCubic(new Frac(1), coef[0].muli(-1), coef[1].muli(-1), coef[2].muli(-1)); // 解方程式 t^3 - r1t^2 - r2t - r3 = 0
		
		const dRoot = this.cubic.getDoubleRoot(); // 二重根的值
		const tRoot = this.cubic.getTripleRoot(); // 三重根的值
		this.multiRootNum = dRoot ? (tRoot ? 3 : 2) : 1; // 最高重根數
		this.frac_multiRoot = dRoot; // 重根值. 三重根的值 = 二重根, 所以直接用 dRoot
		
		if (Object.keys(this.nonHomoFunc).length > 0) this._initNonHomog(); // 如果遞迴有非齊次部分才需要計算
	}
	
	_initNonHomog() { // 如果遞迴有非齊次部分才需要計算
		let expFunc = {};
		for (const [key, frac_c] of Object.entries(this.nonHomoFunc)) { // 合併同類指數項
			const [s_k, s_frac_b] = key.split(","); // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 { "k,b.n/b.d": c , ... }
			const k = Number(s_k); // n^k 的 k (0~3)
			
			if (!(s_frac_b in expFunc)) expFunc[s_frac_b] = []; // 新增指數項
			while (expFunc[s_frac_b].length - 1 < k) expFunc[s_frac_b].push(new Frac(0)); // 補足多項式 f_i(n) 的次數
			expFunc[s_frac_b][k] = frac_c; // 設定係數
		}
		this.combinedExpFunc = expFunc; // 同類指數項: { "b.n/b.d": [ f0, f1, f2 ], ... } 代表 (f0 + f1n + f2n^2) b^n + ...
		
		let varPiIndex = {};
		let pi = 1; // 未知係數 p_i 的 i, 是個計數器, 用於生成 p_1, p_2, ...
		for (const [s_frac_b, combinedExp] of Object.entries(this.combinedExpFunc)) {
			varPiIndex[s_frac_b] = combinedExp.map(() => pi++);
		}
		this.varPiIndex = varPiIndex; // 特解當中的 p_i 的編號 i, 結構與 combinedExpFunc 相同
		this.maxPi = pi-1; // p_i 的最大編號 i
		
		const cs = this.cubic;
		const type = cs.solutionType(); // 三次函數的解形式
		let rationalRoots = []; // 齊次解的有理數特徵值
		if (type === SolveCubic.TYPE_3FRAC) rationalRoots = [ cs.frac_r1, cs.frac_r2, cs.frac_r3 ];
		else if (type === SolveCubic.TYPE_FRAC_QUAD) rationalRoots = [ cs.frac_r1 ];
		let homogRootConflictNum = {};
		for (const frac_r of rationalRoots) if (!frac_r.isZero()) { // 檢查齊次解的所有非零 b
			const key = `${frac_r.n}/${frac_r.d}`;
			if (key in this.combinedExpFunc) { // 如果齊次解的 b^n 也存在於特解, 記錄一下齊次解的 b 的重根數
				homogRootConflictNum[key] = (homogRootConflictNum[key] ?? 0) + 1;
			}
		}
		this.homogRootConflictNum = homogRootConflictNum; // 齊次解的某個特徵值 b 的重根數, 且 b^n 存在於特解內. 決定非齊次指數項需要乘 n^? 保持線性獨立
		
		const newG = Array.from({ length: this.maxPi }, (_, j) => (() => new Frac(0))); // newG[j](n) 回傳 a_n^{(p)} 內的未知數 p_{1+j} 的常係數; n>=0; j>=0
		for (const [s_frac_b, combinedExp] of Object.entries(this.combinedExpFunc)) {
			const extraNPow = this.homogRootConflictNum[s_frac_b] ?? 0; // 為保持特解的線性獨立性, 額外乘上去的 n^p
			const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b (Frac)
			for (let i = 0; i < combinedExp.length; i++) { // 遍歷 (p_1 + p_2 n + p_3 n^2) b^n 展開後的 p_1 n^0 b^n , p_2 n^1 b^n , p_3 n^2 b^n
				const pi = this.varPiIndex[s_frac_b][i];
				newG[pi-1] = (n) => new Frac(n**(i+extraNPow)).mul(frac_b.pow(n)); // a_n^{(p)} 內的未知數 p_j 的常係數 n^? * b^n
			}
		}
		this.PiEquationSystem = Array.from( // a_n^{(p)} 代入 n = 0 ~ ? 產生 用於求特解未知數 p_j 所需的足量線性方程式 a_i^{(p)}
			{ length: this.recurLevel + this.maxPi },
			(_, i) => Array.from({ length: this.maxPi }, (_, j) => newG[j](i))
		); // arr[i][j] 為 a_i^{(p)} 內的未知數 p_{1+j} 的常係數; i>=0; j>=0
		
		const F = (n) => { // 非齊次部分 F(n) 代入 n 的結果
			let frac_sum = new Frac(0);
			for (const [s_frac_b, combinedExp] of Object.entries(this.combinedExpFunc)) {
				const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b (Frac)
				for (const [i, frac_c] of combinedExp.entries()) {
					frac_sum = frac_sum.add(frac_c.mul(new Frac(n**i)).mul(frac_b.pow(n)));
				}
			}
			return frac_sum;
		};
		this.nonHomogFn = Array.from({ length: this.recurLevel + this.maxPi }, (_, n) => F(n)); // 非齊次部分 F(n) 代入 0 ~ ? 的結果
		
		const l = this.recurLevel; // 遞迴階數
		const matrix_p1es = Matrix.create(this.maxPi, this.recurLevel + this.maxPi);
		for (let n = 0; n < this.maxPi; n++) { // 將那個有很多 a_n^(p) 的聯立方程式轉為矩陣
			matrix_p1es.A[n][n+l] = new Frac(1);
			for (const [i, frac_coef] of this.recurCoef.entries()) {
				matrix_p1es.A[n][n+(l-1)-i] = frac_coef.muli(-1);
			}
		}
		this.matrix_solvePi = matrix_p1es.mul(new Matrix(this.PiEquationSystem)); // 與有很多 p_i 的聯立方程式相乘就會得到一個 n*n 方陣 (解 p_i 的聯立方程式)
		
		const matrix_b = new Matrix([this.nonHomogFn.slice(this.recurLevel)]).trans();
		this.PiAnswer = this.matrix_solvePi.inverse().mul(matrix_b).trans().A[0]; // 解 p_i 的聯立 Ax = b ; x 會等於 A^-1 b
		
		// todo 試試看能不能使太長的 latex 變成滾動條
	}
	
	makeLatexCharPoly() { // 特徵方程式 "t^l = r1 t^{l-1} + r2 t^{l-2} + r3 t^{l-3}" (latex)
		let l = this.recurLevel; // 遞迴階數
		let s_latex = this.recurCoef.map(
			(frac_coef, i) => termLatexNot0(frac_coef, "t", l-1-i)
		).join("");
		if (s_latex === "") s_latex = "0"; // 若特徵方程式為 0 多項式
		return `${makeTermLatex("", "t", l, false)} = ${removePrefix(s_latex, "+")}`; // 去除開頭的 + 後, 在開頭加上 "t^l ="
	}
	
	makeLatexChar() { // 特徵值 "t = ? , ? , ?" (latex)
		if (this.recurLevel == 1) return this.recurCoef[0].toLatex(); // 一次方程式的解
		if (this.recurLevel == 2) return this.cubic.quad.toLatex(); // 二次方程式的解
		if (this.recurLevel == 3) return this.cubic.toLatex(); // 三次方程式的解
		return "{?}";
	}
	
	showNoRationalRoot() { // 是否要顯示 "(!)不存在有理數特徵值" 的警告訊息
		return this.cubic.frac_r1 === undefined; // TYPE_3FRAC 和 TYPE_FRAC_QUAD 型態才存在有理數根
	}
	
	makeLatexMultiRootHomog() { // 重根齊次形式 "h_1 b^n + h_2 n b^n + h_3 n^2 b^n" (latex)
		const exp = this.frac_multiRoot ? makeTermLatex(1, this.frac_multiRoot, "n", false) : "{?}"; // b^n 的 latex
		if (this.multiRootNum == 2) return `h_1 ${exp} + h_2 n ${exp}`; // h_1 b^n + h_2 n b^n
		if (this.multiRootNum == 3) return `h_1 ${exp} + h_2 n ${exp} + h_3 n^2 ${exp}`; // h_1 b^n + h_2 n b^n + h_3 n^2 b^n
		return "{?}";
	}
	
	makeLatexHomogForm() { // 因此將齊次解設為 ... (latex)
		const sc = this.cubic;
		const type = sc.solutionType(); // 三次式的解形式
		const mRootNum = this.multiRootNum; // 重根個數
		const frac_mRoot = this.frac_multiRoot; // 重根的值
		const mRootHomogLatex = this.makeLatexMultiRootHomog();
		
		if (type === SolveCubic.TYPE_3FRAC) { // 解形式為: frac_r1 , frac_r2 , frac_r3
			if (mRootNum == 3) return mRootHomogLatex; // 三重根
			if (mRootNum == 2) {
				for (const frac_r of [sc.frac_r1, sc.frac_r2, sc.frac_r3]) {
					if (!frac_r.equal(frac_mRoot)) return mRootHomogLatex + termLatexNot0("h_3 ", frac_r, "n"); // 二重根 + 剩餘根 (如果為 0 會不顯示)
				}
			}
			if (mRootNum == 1) {
				let roots = [sc.frac_r1, sc.frac_r2, sc.frac_r3]; // 三個根
				roots = roots.filter(frac_r => !frac_r.isZero()); // 刪除為 0 的根
				let s_latex = roots.map((frac_r, i) => termLatexNot0(`h_{${i+1}}`, frac_r, "n")).join(""); // 轉為 latex, 並連結起來
				return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
			}
			return "{?}";
		}
		if (type === SolveCubic.TYPE_FRAC_QUAD) { // 解形式為: frac_r1 , (n ± m√s) / d
			const quadLatex = sc.quad.toLatex();
			const posRoot = removePrefix(quadLatex.replace("\\pm", "+"), "+"); // +√s 根若開頭為 "+" 要去除
			let s_latex = makeTermLatex("h_1 ", `\\left( ${posRoot} \\right)`, "n");
			s_latex += makeTermLatex("h_2 ", `\\left( ${quadLatex.replace("\\pm", "-")} \\right)`, "n"); // ± 替換成 + 和 -, 就變成兩個根
			s_latex += termLatexNot0("h_3 ", sc.frac_r1, "n"); // 剩餘根 (如果為 0 會不顯示)
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		if (type === SolveCubic.TYPE_3REAL) { // 解形式為: r1 , r2 , r3
			let s_latex = [sc.r1, sc.r2, sc.r3].map(
				(r, i) => makeTermLatex(`h_{${i+1}}`, r.toFixed(4), "n")
			).join("");
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		if (type === SolveCubic.TYPE_REAL_IM) { // 解形式為: r1 , (cRe ± cIm i)
			let s_latex = makeTermLatex("h_1 ", `(${sc.cRe.toFixed(4)} + ${sc.cIm.toFixed(4)} i)`, "n");
			s_latex += makeTermLatex("h_2 ", `(${sc.cRe.toFixed(4)} - ${sc.cIm.toFixed(4)} i)`, "n");
			s_latex += makeTermLatex("h_3 ", sc.r1.toFixed(4), "n"); // 剩餘根
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		
		return "{?}";
	}
	
	_makeLatexExpTerm(s_frac_b, isUnknownCoef, extraNPow = 0) { // 生成 "(p1 + p2n + ...) b^n" (latex). extraNPow 為額外乘上去的 n^p
		const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b (Frac)
		const s_latex = this.combinedExpFunc[s_frac_b].map((frac_c, i) => { // "+ p1 + p2n + ..." (latex)
			if (isUnknownCoef) frac_c = `p_{${this.varPiIndex[s_frac_b][i]}}`; // isUnknownCoef 開啟會把係數替換成未知數 p_i
			return termLatexNot0(frac_c, "n", i + extraNPow);
		}).join("");
		return makeTermLatex(`(${removePrefix(s_latex, "+")})`, frac_b, "n", false);
	}
	
	makeLatexCombinedExp() { // 合併相同的指數項: "F(n) = Σ_i f_i(n) b_i^n = (f0 + f1n + f2n^2 + ...) b^n + ..." (latex)
		let s_latex = Object.keys(this.combinedExpFunc).map(
			s_frac_b => this._makeLatexExpTerm(s_frac_b, false)
		).join(" + ");
		return `F(n) = \\sum\\limits_{i} f_i(n) {b_i}^n = ${s_latex}`;
	}
	
	makeLatexParticularForm() { // 猜測特解的形式為: "a_n^{(p)} = Σ_i g_i(n) b_i^n = (p1 + p2n + ...) b^n + ..." (latex)
		let s_latex = Object.keys(this.combinedExpFunc).map(
			s_frac_b => this._makeLatexExpTerm(s_frac_b, true)
		).join(" + ");
		return `a_n^{(p)} = \\sum\\limits_{i} g_i(n) {b_i}^n = ${s_latex}`;
	}
	
	makeLatexExistHomogExp() { // 由於 ... 已出現在 a_n^{(h)} 之中 (latex)
		let expLatexs = [];
		for (const [s_frac_b, conflictNum] of Object.entries(this.homogRootConflictNum)) {
			const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b (Frac)
			for (let i = 0; i < conflictNum; i++) {
				expLatexs.push(makeTermLatex(makeTermLatex(1, "n", i, false), frac_b, "n", false));
			}
		}
		return expLatexs.join(" ~,~ ");
	}
	
	makeLatexExistParticularExp() { // ，若特解與 a_n^{(p)} 也包含同樣項次 ... 會導致與齊次解重疊 (latex)
		return Object.keys(this.homogRootConflictNum).map(s_frac_b => {
			const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b (Frac)
			return makeTermLatex(`p_{${this.varPiIndex[s_frac_b][0]}}`, frac_b, "n", false);
		}).join(" ~,~ ");
	}
	
	makeLatexChangeExpList() { // 為了保證特解與齊次解的線性獨立性，需要將 "(p1 + p2n) b^n" 設為 "(p1n^2 + p2n^3) b^n". (齊次解有二重根 b)
		return Object.entries(this.homogRootConflictNum).map(([s_frac_b, conflictNum]) => { // 衝突的 b^n
			return [
				this._makeLatexExpTerm(s_frac_b, true), // "沒乘 n^p 的 g(n)" (latex)
				this._makeLatexExpTerm(s_frac_b, true, conflictNum) // "有乘 n^p 的 g(n)" (latex)
			];
		});
	}
	
	makeLatexNewParticularForm() { // 因此特解的形式為: "a_n^{(p)} = (p1 + p2n + ...) b^n + ..." (latex)
		let s_latex = Object.keys(this.combinedExpFunc).map(s_frac_b => {
			const extraNPow = this.homogRootConflictNum[s_frac_b] ?? 0; // 為保持特解的線性獨立性, 額外乘上去的 n^p
			return this._makeLatexExpTerm(s_frac_b, true, extraNPow);
		}).join(" + ");
		return `a_n^{(p)} = ${s_latex}`;
	}
	
	makeLatexSomePi() { // 想要求出特解 a_n^{(p)} 之中的 ? 個未知係數 "p1 ~ p?" (latex)
		return this.maxPi == 1 ? 'p_1' : `p_1 ~,~ \\cdots ,~ p_${this.maxPi}`;
	}
	
	makeLatexNRange() { // 需要將 "n = ? ~ ?" 代入上式， (latex)
		let s_latex = `n = ${this.recurLevel}`;
		if (this.maxPi > 1) s_latex += `\\sim ${this.recurLevel + this.maxPi - 1}`;
		return s_latex;
	}
	
	makeLatexEquationSystemP1() { // 移項後得到: "將所有 n 代入上式的聯立方程式 (latex)" ; 我已經想不出如何命名 method 了
		const l = this.recurLevel; // 遞迴階數
		let s_latex = Array.from({ length: this.maxPi }, (_, n) => {
			let s_equationLatex = this.recurCoef.map( // "- h_1 a_{n-1}^{(p)} - h_2 a_{n-2}^{(p)} - h_3 a_{n-3}^{(p)}" (latex)
				(frac_coef, i) => termLatexNot0(frac_coef.muli(-1), `a_{${n+(l-1)-i}}^{(p)}`, 1)
			).join(" ");
			return `a_{${n+l}}^{(p)} ${s_equationLatex} = F(${n+l})`; // "a_n^{(p)} - h_1 a_{n-1}^{(p)} - h_2 a_{n-2}^{(p)} - h_3 a_{n-3}^{(p)} = F(n)" (latex)
		}).join(" \\\\ "); // 以換行符連接所有的式子
		
		return `\\begin{cases} ${s_latex} \\end{cases}`; // 加上聯立方程式的 latex 對齊規則
	}
	
	makeLatexPiLinearEquation() { // 其中: "a_i^(p) 的 p_i 的線性組合" (latex)
		let s_latex = Array.from({ length: this.recurLevel + this.maxPi }, (_, n) => {
			let s_equationLatex = this.PiEquationSystem[n].map((frac_PjCoef, j) => {
				if (frac_PjCoef.isZero()) return "&&"; // 某一個長係數為 0, 為了要保持後續 p_j 的對齊, 回傳 &&
				return `~${makeTermLatex(frac_PjCoef, `&p_{${j+1}}&`, 1)}`; // 避免運算子緊貼上一項, 開頭加上 ~ 符號增加間距
			}).join(" ");
			
			if (s_equationLatex.startsWith("~+")) s_equationLatex = s_equationLatex.replace("+", ""); // 去除開頭的 +
			if (s_equationLatex.split("&&").length - 1 === this.maxPi) s_equationLatex = "~0"; // 若某個 a_n^(p) 為 0
			s_equationLatex = removePostfix(s_equationLatex, "&"); // 最後一個字符不能是 &, vatex 會報錯
			return `a_{${n}}^{(p)} &=& ${s_equationLatex}`; // 加上 a_n^(p). 加上 "&" 讓 "=" 符號對齊
		}).join(" \\\\ "); // 以換行符連接所有的式子
		
		s_latex = `\\begin{alignat*}{${this.maxPi+1}} ${s_latex} \\end{alignat*}`; // 聯立方程式的 latex 對齊規則 (將未知數 p_j 和 "=" 對齊)
		return `\\left\\{ ${s_latex} \\right.`; // 加上聯立方程式左側的 "{" 符號
	}
	
	makeLatexSolvePiLinearEquation() { // 展開後得到: "p_i 的線性聯立方程式" (latex)
		const l = this.recurLevel; // 遞迴階數
		let s_latex = this.matrix_solvePi.A.map((row, n) => {
			let s_equationLatex = row.map((frac_PjCoef, j) => {
				if (frac_PjCoef.isZero()) return "&&"; // 某一個長係數為 0, 為了要保持後續 p_j 的對齊, 回傳 &&
				return `~${makeTermLatex(frac_PjCoef, `&p_{${j+1}}&`, 1)}`; // 避免運算子緊貼上一項, 開頭加上 ~ 符號增加間距
			}).join(" ");
			
			if (s_equationLatex.startsWith("~+")) s_equationLatex = s_equationLatex.replace("+", ""); // 去除開頭的 +
			if (s_equationLatex.split("&&").length - 1 === this.maxPi) s_equationLatex = "~0"; // 若某個 a_n^(p) 為 0
			return `${s_equationLatex} &= ${this.nonHomogFn[n+l].toLatex()}`; // 加上 a_n^(p). 加上 "&" 讓 "=" 符號對齊
		}).join(" \\\\ "); // 以換行符連接所有的式子
		
		s_latex = `\\begin{alignat*}{${this.maxPi+1}} ${s_latex} \\end{alignat*}`; // 聯立方程式的 latex 對齊規則 (將未知數 p_j 和 "=" 對齊)
		return `\\left\\{ ${s_latex} \\right.`; // 加上聯立方程式左側的 "{" 符號
	}
	
	makeLatexPiAnswer() { // 使用高斯消去法解 p_i 的聯立方程式，得到: "..." (latex)
		return this.PiAnswer.map(
			(frac_Pi, i) => `p_{${i+1}} = ${frac_Pi.toLatex()}`
		).join(` ${SCL} `);
	}
}

const props = defineProps({
	recurCoef: { type: Array, default: [] }, // 齊次部分的係數, length 代表遞迴階數
	nonHomoFunc: { type: Object, default: {} }, // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 { "k,b.n/b.d": c , ... }
	initConst: { type: Array, default: [] }, // 遞迴的初始條件, 會保持與 recurCoef 的大小相同
});

const emit = defineEmits([
	"recurLatex", // 遞迴式改變時, 回傳遞迴關係式的 latex 字串. (用於供應 RecurInput 的遞迴預覽)
]);

const recurLatex = ref("{?}");
const recur = ref(new SolveRecur());

watch(() => [props.recurCoef, props.nonHomoFunc, props.initConst],
	([newRecurCoef, newNonHomoFunc, newInitConst]) => {
		recur.value = new SolveRecur(newRecurCoef, newNonHomoFunc, newInitConst); // 遞迴參數改變時, 更新遞迴資訊
		recurLatex.value = makeLatexRecur(newRecurCoef, newNonHomoFunc, newInitConst); // 生成遞迴關係式的 latex 字串
		emit("recurLatex", recurLatex.value); // 上傳遞迴關係式的 latex 字串
	}
);

const termLatexNot0 = (coef, base, pow) => { // 若 makeTermLatex 輸出為 "+0" 會回傳空字串. 某一項為 0 不想顯示, 就用這個.
	let s_latex = makeTermLatex(coef, base, pow);
	return s_latex === "+0" ? "" : s_latex;
};

const getLatexRecurHomog = (recurCoef = []) => { // 生成 遞迴的齊次部分 "a_n = r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}" (latex)
	let s_latex = makeLatexRecurHomog(recurCoef);
	if (s_latex === "") s_latex = "0"; // 如果齊次部分沒有任何一項, 顯示 "0"
	return `a_n = ${removePrefix(s_latex, "+")}`; // 去除開頭的 + 後, 在開頭加上 "a_n ="
};

const getLatexRecurNonHomog = (nonHomoFunc = {}) => { // 生成 遞迴的非齊次部分 "F(n) = c n^k b^n + ..." (latex)
	let s_latex = makeLatexRecurNonHomog(nonHomoFunc);
	if (s_latex === "") s_latex = "0"; // 如果非齊次部分沒有任何一項, 顯示 "0"
	return `F(n) = ${removePrefix(s_latex, "+")}`; // 去除開頭的 + 後, 在開頭加上 "F(n) ="
};

const makeLatexRecurHomog = (recurCoef = []) => { // 生成 遞迴的齊次部分 "+ r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}" (latex)
	return recurCoef.map((frac_coef, i) => termLatexNot0(frac_coef, `a_{n-${i+1}}`, 1)).join("");
};

const makeLatexRecurNonHomog = (nonHomoFunc = {}) => { // 生成 遞迴的非齊次部分 "+ c n^k b^n + ..." (latex)
	let s_latex = "";
	
	for (const [key, frac_c] of Object.entries(nonHomoFunc)) { // 生成非齊次部分: "+ c n^k b^n + ..."
		const [s_k, s_frac_b] = key.split(","); // 非齊次的 c n^k b^n 項會表示為 { "k,b.n/b.d": c , ... }
		const frac_b = Frac.fromStr(s_frac_b); // frac_b
		
		let s_term = makeTermLatex(frac_c, "n", s_k); // c n^k 部分的 latex 字串
		if (!frac_b.equal(new Frac(1))) { // 若 b^n 部分不為 1^n , 擴展為 c n^k b^n
			s_term = makeTermLatex(makeTermLatex(frac_c, "n", s_k, false), frac_b, "n");
		}
		if (s_term !== "+0") s_latex += s_term; // 只顯示 c n^k 不為 0 的項
	}
	
	return s_latex;
};

const makeLatexRecur = (recurCoef = [], nonHomoFunc = {}, initConst = []) => { // 生成遞迴關係式的 latex 字串
	let s_latex = makeLatexRecurHomog(recurCoef) + makeLatexRecurNonHomog(nonHomoFunc);
	
	if (s_latex === "") s_latex = "0"; // 如果齊次與非齊次部分沒有任何一項, 顯示 "0"
	s_latex = `a_n = ${removePrefix(s_latex, "+")}`; // 在開頭加上 "a_n =", 此時 latex 字串為: "a_n = 齊次部分 + 非齊次部分"
	
	s_latex += ` ${SCL} n \\ge ${recurCoef.length}`; // 加上遞迴限制 ", n >= ?" , ? 應等於遞迴階數
	s_latex += " \\\\ "; // 換行
	
	s_latex += initConst.map((frac_init, i) => `a_${i} = ${frac_init.toLatex()}`).join(` ${SCL} `); // 生成初始條件部分: a_0 = ? , a_1 = ? , a_2 = ?
	
	return `\\begin{gather*} ${s_latex} \\end{gather*}`; // 使 latex 置中的語法
};

const makeLatexParticularIntoRecur = (recurCoef = []) => { // 將上式代入原遞迴關係: ... (latex)
	let s_latex = recurCoef.map(
		(frac_coef, i) => termLatexNot0(frac_coef, `a_{n-${i+1}}^{(p)}`, 1)
	).join("");
	
	s_latex = `a_n^{(p)} = ${removePrefix(s_latex, "+")} + F(n)`; // 在開頭加上 "a_n^{(p)} =", 此時 latex 字串為: "a_n^{(p)} = 齊次部分 + F(n)"
	
	s_latex += ` ${SCL} n \\ge ${recurCoef.length}`; // 加上遞迴限制 ", n >= ?" , ? 應等於遞迴階數
	
	return `\\begin{gather*} ${s_latex} \\end{gather*}`; // 使 latex 置中的語法
};
</script>
