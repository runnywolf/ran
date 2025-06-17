<template>
	<div v-if="1 <= recurCoef.length && recurCoef.length <= 3"><!-- 必須為 1 ~ 3 階遞迴 -->
		遞迴關係式和初始條件為<br>
		<vl c :exp="recurLatex" />
		
		<span class="ts-text is-large is-bold">Step1：求齊次解的形式</span><br>
		遞迴的齊次部分為 <vl :exp="mlRecurHomogPrefix(recurCoef)" /><br>
		<vl exp="\Rightarrow" /> 特徵方程式為 <vl :exp="recur.mlCharPoly()" /><br>
		<vl :exp="`\\Rightarrow ~ t = ${recur.mlChar()}`" />
		<span v-if="recur.showNoRationalRoot()" style="color: #eb0; margin-left: 10px;">
			<span class="ts-icon is-circle-exclamation-icon"></span>
			不存在有理數根
		</span>
		<div style="height: 12px;"></div>
		<span v-if="recur.homogForm ? (recur.homogForm[0][1] > 1) : false">
			有{{ recur.homogForm[0][1] === 2 ? "二" : "三" }}重根
			<vl :exp="recur.homogForm[0][0].toLatex()" />，需要設
			<vl :exp="recur.mlMultiRootHomog()" /> 保證線性獨立。<br>
		</span>
		<span v-else>
			無重根，<br>
		</span>
		因此將齊次解設為<br>
		<vl c :exp="`a_n^{(h)} = ${recur.homogFormLatex}`" />
		
		<span class="ts-text is-large is-bold">Step2：求特解</span><br>
		<div v-if="recur.haveNonHomog">
			<RecurNonHomog
				:recurCoef="recurCoef"
				:nonHomoFunc="nonHomoFunc"
				:cubic="recur.cubic"
				:recurNonHomogLatex="mlRecurNonHomogPrefix(nonHomoFunc)"
				@particular="(p) => { recur._updateParticular(p) }"
			></RecurNonHomog>
		</div>
		<div v-else>
			遞迴式沒有非齊次部分，跳過這一步驟。
			<div style="height: 12px;"></div>
		</div>
		
		<span class="ts-text is-large is-bold">Step3：求通解</span><br>
		遞迴的通解 <vl :exp="recur.haveNonHomog ? 'a_n = a_n^{(h)} + a_n^{(p)}' : 'a_n = a_n^{(h)}'" />，因此<br>
		<vl c :exp="recur.mlGeneralForm()" />
		將齊次解移項至左側：<br>
		<vl c :exp="recur.mlGeneralFormTrans()" />
		求未知係數 <vl :exp="recur.mlSomeHi()" /> 需要將 <vl :exp="recur.mlNRange()" />
		代入上式，產生 {{ recur.recurLevel }} 個式子的線性方程組，並解聯立：<br>
		<vl c :exp="recur.mlSolveHiEquationSystem()" />
		解聯立後得到：<br>
		<vl c :exp="recur.mlHiAnswer()" />
		檢查通解 <vl exp="a_n" /> 是否含有虛數 <vl exp="i" />：
		<div v-if="recur.isAnswerHaveIm()">
			通解包含 <vl exp="i" />，但是 <vl exp="a_n" />
			為實數數列，因此需要將複數項轉化為實部表示。<br>
			<div style="height: 12px;"></div>
			考慮將複數部分轉換為極座標形式，並應用歐拉公式：<br>
			<vl c exp="
				\begin{split}
				&= h_1 {(\alpha + \beta i)}^n + h_2 {(\alpha - \beta i)}^n \\
				&= h_1 {(r e^{i \theta})}^n + h_2 {(r e^{-i \theta})}^n \quad,\quad r = \sqrt{\alpha^2 + \beta^2} \quad,\quad \theta = \tan^{-1}(\beta / \alpha) \\
				&= h_1 r^n e^{i n \theta} + h_2 r^n e^{-i n \theta} \\
				&= h_1 r^n (\cos n \theta + i \sin n \theta) + h_2 r^n (\cos n \theta - i \sin n \theta) \\
				&= (h_1 + h_2) \cos(n \theta) r^n + (h_1 - h_2) i \sin(n \theta) r^n
				\end{split}
			" />
			因此<br>
			<vl c :exp="recur.mlClosedFormImAddAn()" />
			其中
			<vl c :exp="recur.mlClosedFormImWhere()" />
		</div>
		<div v-else>
			通解不含 <vl exp="i" />，將 <vl :exp="recur.mlSomeHi()" />
			直接代回 <vl exp="a_n" />：<br>
			<vl c :exp="recur.mlClosedFormAddAn()" />
		</div>
		整理後的一般項為：<br>
		<vl c :exp="recur.mlClosedFormFix()" />
	</div>
	<Content v-else colorStyle="red" collapsed>
		必須輸入 1 ~ 3 階遞迴
	</Content>
</template>

<script setup>
import { ref, toRaw, watch } from "vue";
import { Frac, EF, _SolveCubic, Hop, _Matrix, SCL, _mlTerm, _mlEquationSystem } from "@/libs/RanMath.js";
import { removePrefix } from "@/libs/StringTool.js";
import RecurNonHomog from "./RecurNonHomog.vue"; // 計算並顯示非齊次部分的組件
import Content from "@/components/global/Content.vue"; // 內容區塊的組件

class SolveRecur { // 解非齊次遞迴
	constructor(recurCoef = [], nonHomoFunc = {}, initConst = []) {
		this.recurCoef = recurCoef;
		this.nonHomoFunc = nonHomoFunc;
		this.initConst = initConst;
		
		this.recurLevel = this.recurCoef.length; // 遞迴階數
		this.haveNonHomog = Object.keys(nonHomoFunc).length > 0; // 遞迴是否有非齊次部分
		
		this._initCubic(); // 計算齊次解的特徵值
		this._initHomogForm(); // 紀錄特徵值的重根與重根數
		this._initHiEquationSystem(); // 未知係數 h_i 的聯立方程式
		this._updateParticular(); // 此時子組件 RecurNonHomog.vue 還沒回傳特解資訊, 這裡先初始化一次
		
		this.homogFormLatex = this.mlHomogForm(); // 齊次解的形式 (latex)
		
		this._test(); // test
	}
	
	_initCubic() { // 計算齊次解的特徵值
		let coef = [...this.recurCoef];
		while (coef.length < 3) coef.push(new Frac(0)); // 0, 1, 2 階遞迴要解三次特徵方程式需要補足係數
		this.cubic = new _SolveCubic(new Frac(1), coef[0].mul(-1), coef[1].mul(-1), coef[2].mul(-1)); // 解方程式 t^3 - r1t^2 - r2t - r3 = 0
	}
	
	_initHomogForm() { // 生成齊次形式的資訊 (僅三有理根型態). 注: this.homogForm[0] 可以讀取重根資訊
		const sc = this.cubic;
		if (sc.solutionType() !== _SolveCubic.TYPE_3FRAC) { // 只有三有理根型態才存在重根
			this.homogForm = null;
			return;
		}
		
		const frac_dRoot = sc.getDoubleRoot(); // 二重根的值
		const frac_tRoot = sc.getTripleRoot(); // 三重根的值
		
		if (frac_tRoot) { // 三重根 & 0階遞迴 (三重零根). 數學定義上三重根包含二重根, 所以要先判定
			this.homogForm = [[frac_tRoot, 3]];
		} else if (frac_dRoot) { // 二重根 & 1階遞迴 (二重零根)
			this.homogForm = [[frac_dRoot, 2]];
			for (const frac_r of [sc.frac_r1, sc.frac_r2, sc.frac_r3]) { // 加入另一個非二重根的根
				if (!frac_r.equal(frac_dRoot)) this.homogForm.push([frac_r, 1]);
			}
		} else { // 無重根
			this.homogForm = [sc.frac_r1, sc.frac_r2, sc.frac_r3].map(frac_r => [frac_r, 1]);
		}
		
		this.homogForm = this.homogForm.filter(([frac_r, MRN]) => !frac_r.isZero()); // 去除零根
	}
	
	// FRAC_QUAD 跟 TYPE_REAL_IM 會化簡 (h1 + h2√s)(a + b√s)^n + (h1 - h2√s)(a - b√s)^n + h3 c^n, 所以聯立會比較特別
	_initHiEquationSystem() { // 未知係數 h_i 的聯立方程式
		const sc = this.cubic;
		const type = sc.solutionType(); // 特徵方程式的解形式
		
		let ef_base; // FRAC_QUAD 跟 TYPE_REAL_IM 產生的 a + b√s 形式的特徵根
		if (type === _SolveCubic.TYPE_3FRAC) { // 解形式為: frac_r1 , frac_r2 , frac_r3
			const getCoef = []; // getCoef[i](n) 代表 a_n^(h) 代入常數 n 後, 未知數 h_{i+1} 的係數: (n^j r^n) h_{i+1}
			this.homogForm.map(([frac_r, multiRootNum]) => {
				for (let j = 0; j < multiRootNum; j++) getCoef.push((n) => frac_r.pow(n).mul(n**j)); // (n^j r^n) h_{i+1}
			}); // 注: getCoef.length == 遞迴階數
			this.HiLinearEquation = Array.from(
				{ length: this.recurLevel },
				(_, n) => Array.from({ length: this.recurLevel }, (_, i) => getCoef[i](n)) // 去看 getCoef 的註解
			);
		}
		else if (type === _SolveCubic.TYPE_FRAC_QUAD) { // 解形式為: frac_r1 , (n ± m√s) / d
			ef_base = new EF(new Frac(sc.quad.n, sc.quad.d), new Frac(sc.quad.m, sc.quad.d), sc.quad.s); // a + b√s
			this.HiLinearEquation = Array.from({ length: this.recurLevel }, (_, n) => {
				const ef_pow = ef_base.pow(n);
				const [frac_a, frac_b] = [ef_pow.nf_a.mul(2), ef_pow.nf_b.mul(2*sc.quad.s)];
				if (this.recurLevel == 2) return [frac_a, frac_b];
				if (this.recurLevel == 3) return [frac_a, frac_b, sc.frac_r1.pow(n)];
			});
		}
		else if (type === _SolveCubic.TYPE_3REAL) { // 解形式為: r1 , r2 , r3
			this.HiLinearEquation = Array.from({ length: 3 }, (_, n) => [sc.r1**n, sc.r2**n, sc.r3**n]); // 只有三階遞迴才會出現此形式, 而且三次函數不存在無理重根, 非常簡單
		}
		else if (type === _SolveCubic.TYPE_REAL_IM) { // 解形式為: r1 , (cRe ± cIm i)
			ef_base = new EF(sc.cRe, sc.cIm, -1); // cRe + cIm i
			this.HiLinearEquation = Array.from({ length: 3 }, (_, n) => {
				const ef_pow = ef_base.pow(n);
				return [Hop.mul(ef_pow.nf_a, 2), Hop.mul(ef_pow.nf_b, -2), sc.r1**n];
			});
		}
		
		this.ef_base = ef_base; // FRAC_QUAD 跟 TYPE_REAL_IM 產生的 a + b√s 形式的特徵根
	}
	
	_updateParticular(particular = {}) { // 接收子組件 RecurNonHomog.vue 的特解資訊
		this.particular = particular;
		this._calcAnSubAnp(); // 將常數 n 代入 a_n - a_n^(p), 用於解未知係數 h_i 的聯立
		this._solveHi(); // 解聯立求 h_i
		this._calcImVar(); // 計算複數情況下, 需要顯示的參數 (極座標化簡)
	}
	
	/* 將常數 n 代入 a_n - a_n^(p), 用於解未知係數 h_i 的聯立.
	 * 
	 * 無論有沒有非齊次部分, 建構子會執行 _updateParticular(), 此時 anSubAnp = [ a_0 , a_1 , ... ]
	 * 
	 * 若遞迴有非齊次部分, 子組件 RecurNonHomog.vue 會回傳特解資訊 particular,
	 * 再執行一次 _updateParticular(particular), 確保 anSubAnp = [ a_0-a_0^(p) , a_1-a_1^(p) , ... ]
	*/
	_calcAnSubAnp() {
		this.anSubAnp = this.initConst.map((frac_an, n) => { // 常數 a_n - a_n^(p)
			const frac_anp = Frac.sum( // 將常數 n 代入 a_n^(p)
				Object.entries(this.particular).map(([s_frac_b, expPjAnswer]) => {
					const frac_anpExp = Frac.sum(expPjAnswer.map((frac_pj, i) => frac_pj.mul(new Frac(n**i)))); // 代入 n 得到的常數 (p1 + p2 n + p3 n^2 + ...)
					return frac_anpExp.mul(Frac.fromStr(s_frac_b).pow(n)); // (p1 + p2 n + p3 n^2 + ...) b^n
				})
			);
			return frac_an.sub(frac_anp); // a_n - a_n^(p)
		});
	}
	
	_solveHi() { // 解聯立求 h_i
		if (this.anSubAnp.length === 0) return;
		
		const matrix_anSubAnp = new _Matrix([this.anSubAnp]).trans();
		let hiAns = new _Matrix(this.HiLinearEquation).inverse().mul(matrix_anSubAnp).trans().A[0]; // 解 h_i 的聯立 Ax = b ; x 會等於 A^-1 b
		
		const sc = this.cubic;
		const type = sc.solutionType(); // 特徵方程式的解形式
		if (type === _SolveCubic.TYPE_FRAC_QUAD) { // 解形式包含根號或複數, 需要轉為 EF 型態 (因為 _Matrix 不支援 EF)
			const ef = new EF(hiAns[0], hiAns[1], sc.quad.s); // FRAC_QUAD 跟 TYPE_REAL_IM 會化簡 (h1 + h2√s)(a + b√s)^n + (h1 - h2√s)(a - b√s)^n + h3 c^n, 所以聯立會比較特別
			[hiAns[0], hiAns[1]] = [ef, ef.conjugate()];
		}
		else if (type === _SolveCubic.TYPE_REAL_IM) {
			const ef = new EF(hiAns[0], hiAns[1], -1);
			[hiAns[0], hiAns[1]] = [ef, ef.conjugate()];
		}
		
		this.HiAnswer = hiAns;
	}
	
	_calcImVar() { // 計算複數情況下, 需要顯示的參數 (極座標化簡)
		if (!this.isAnswerHaveIm()) return; // 若遞迴一般項包含複數才需要計算
		
		const ef_h1 = this.HiAnswer[0]; // h1 = a + b√s i ; h1 的共軛為 h2
		this.ef_cosCoef = new EF(Hop.mul(ef_h1.nf_a, 2)); // (h1 + h2) = 2a
		this.ef_sinCoef = new EF(0, Hop.mul(ef_h1.nf_b, -2), Hop.mul(ef_h1.s, -1)); // (h1 - h2) i = 2b√s ii = -2b√s
		
		const ef_base = this.ef_base; // FRAC_QUAD 跟 TYPE_REAL_IM 產生的 alpha + beta√s 形式的特徵根
		this.ef_alpha = new EF(ef_base.nf_a); // 取出 alpha
		this.ef_beta = new EF(0, ef_base.nf_b, Hop.mul(ef_base.s, -1)); // 取出 beta. 因為要去除 i, 所以要將 s 乘 -1
		this.ef_norm = new EF(0, 1, ef_base.normSquare()); // 特徵根的範數平方
		
		if (Hop.equal(this.ef_alpha.nf_a, 0)) { // 如果 alpha 為 0, 那 tan^-1(beta / 0) = 1/2 pi
			this.fn_tanToPi = new Frac(1, 2);
			return;
		}
		
		this.ef_bDivA = this.ef_beta.div(this.ef_alpha); // beta / alpha
		const tanInverseToFracPi = [ // 如果 tan^-1(...) 可化簡
			[new EF(0, -1, 3), new Frac(-1, 3)], // tan^-1(-√3) = -1/3 pi
			[new EF(-1), new Frac(-1, 4)], // tan^-1(-1) = -1/4 pi
			[new EF(0, new Frac(-1, 3), 3), new Frac(-1, 6)], // tan^-1(-√3 / 3) = -1/6 pi
			[new EF(0, new Frac(1, 3), 3), new Frac(1, 6)], // tan^-1(√3 / 3) = 1/6 pi
			[new EF(1), new Frac(1, 4)], // tan^-1(1) = 1/4 pi
			[new EF(0, 1, 3), new Frac(1, 3)], // tan^-1(√3) = 1/3 pi
		];
		for (const [ef_tan, frac_pi] of tanInverseToFracPi) if (this.ef_bDivA.equal(ef_tan)) {
			this.fn_tanToPi = frac_pi;
			break;
		}
		
		if (!Frac.isFrac(this.ef_bDivA.nf_a)) { // 如果 tan^-1(...) 內是浮點數, 直接轉為 float pi 形式
			this.fn_tanToPi = Math.atan(this.ef_bDivA.nf_a) / Math.PI;
		}
	}
	
	_test() { // 測試答案的正確性
		const maxN = 10; // 要計算到 n_?
		
		const F = (n) => Frac.sum( // 將自然數 n 代入非齊次部分
			Object.entries(this.nonHomoFunc).map(([key, frac_c]) => {
				const [s_k, s_frac_b] = key.split(","); // 非齊次的 c n^k b^n 項會表示為 { "k,b.n/b.d": c , ... }
				const [k, frac_b] = [Number(s_k), Frac.fromStr(s_frac_b)]; // n^k 的 k (0~3) ; b^n 的 b (Frac)
				return frac_c.mul(n**k).mul(frac_b.pow(n));
			})
		);
		
		const rawRecurCoef = this.recurCoef.map(frac_c => toRaw(frac_c)); // 齊次部分的係數
		let recurAn = this.initConst.map(frac_c => toRaw(frac_c)); // 由遞迴式產生的 a_n
		for (let n = this.recurLevel; n <= maxN; n++) {
			recurAn.push(
				Frac.sum(rawRecurCoef.map((frac_coef, i) => frac_coef.mul(recurAn[n-1-i]))).add(F(n))
			);
		}
	}
	
	mlCharPoly() { // 特徵方程式 "t^l = r1 t^{l-1} + r2 t^{l-2} + r3 t^{l-3}" (latex)
		let l = this.recurLevel; // 遞迴階數
		let s_latex = this.recurCoef.map(
			(frac_coef, i) => _mlTerm(frac_coef, "t", l-1-i, true, true)
		).join("");
		if (s_latex === "") s_latex = "0"; // 若特徵方程式為 0 多項式
		return `${_mlTerm("", "t", l, false)} = ${removePrefix(s_latex, "+")}`; // 去除開頭的 + 後, 在開頭加上 "t^l ="
	}
	
	mlChar() { // 特徵值 "t = ? , ? , ?" (latex)
		if (this.recurLevel == 1) return this.recurCoef[0].toLatex(); // 一次方程式的解
		if (this.recurLevel == 2) return this.cubic.quad.toLatex(); // 二次方程式的解
		if (this.recurLevel == 3) return this.cubic.toLatex(); // 三次方程式的解
		return "{?}";
	}
	
	showNoRationalRoot() { // 是否要顯示 "(!)不存在有理數特徵值" 的警告訊息
		return this.cubic.frac_r1 === undefined; // TYPE_3FRAC 和 TYPE_FRAC_QUAD 型態才存在有理數根
	}
	
	mlMultiRootHomog() { // 重根齊次形式 "h_1 b^n + h_2 n b^n + h_3 n^2 b^n" (latex)
		const frac_multiRoot = this.homogForm[0][0];
		const multiRootNum = this.homogForm[0][1];
		const expLatex = _mlTerm(1, frac_multiRoot, "n", false); // 一重根也會生成重根齊次形式, 但不會顯示出來, 不用管它
		return Array.from({ length: multiRootNum },
			(_, i) => `${_mlTerm(`h_${i+1}`, "n", i, false)} ${expLatex}`
		).join(" + ");
	}
	
	mlHomogForm(coef = ["h_{1}", "h_{2}", "h_{3}"]) { // 因此將齊次解設為 "..." (latex), 係數默認為 h_i
		const sc = this.cubic;
		const type = sc.solutionType(); // 三次式的解形式
		
		if (type === _SolveCubic.TYPE_3FRAC) { // 解形式為: frac_r1 , frac_r2 , frac_r3
			let i = 0; // h_i 的編號
			let s_latex = this.homogForm.map(([frac_r, multiRootNum]) => {
				return Array.from(
					{ length: multiRootNum },
					(_, j) => _mlTerm(_mlTerm(coef[i++], "n", j, false), frac_r, "n", true, true)
				).join("");
			}).join("");
			return removePrefix(s_latex, "+");
		}
		if (type === _SolveCubic.TYPE_FRAC_QUAD) { // 解形式為: frac_r1 , (n ± m√s) / d
			let s_latex = _mlTerm(coef[0], `\\left( ${this.ef_base.toLatex()} \\right)`, "n", true, true);
			s_latex += _mlTerm(coef[1], `\\left( ${this.ef_base.conjugate().toLatex()} \\right)`, "n", true, true);
			s_latex += _mlTerm(coef[2], sc.frac_r1, "n", true, true); // 剩餘根 (如果為 0 會不顯示)
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		if (type === _SolveCubic.TYPE_3REAL) { // 解形式為: r1 , r2 , r3
			let s_latex = [sc.r1, sc.r2, sc.r3].map(
				(r, i) => _mlTerm(coef[i], r.toFixed(4), "n", true, true)
			).join("");
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		if (type === _SolveCubic.TYPE_REAL_IM) { // 解形式為: r1 , (cRe ± cIm i)
			let s_latex = _mlTerm(coef[0], `(${this.ef_base.toLatex()})`, "n", true, true);
			s_latex += _mlTerm(coef[1], `(${this.ef_base.conjugate().toLatex()})`, "n", true, true);
			s_latex += _mlTerm(coef[2], sc.r1.toFixed(4), "n", true, true); // 剩餘根
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		
		return "{?}";
	}
	
	mlGeneralForm() { // 遞迴的通解 a_n = a_n^(h) + a_n^(p) , 因此 "..." (latex)
		if (this.haveNonHomog) return `a_n = ${this.homogFormLatex} + a_n^{(p)}`; // 如果遞迴有非齊次部分, 要加上特解
		return `a_n = ${this.homogFormLatex}`;
	}
	
	mlGeneralFormTrans() { // 將齊次解移項至左側： "..." (latex)
		if (this.haveNonHomog) return `${this.homogFormLatex} = a_n - a_n^{(p)}`; // 如果遞迴有非齊次部分, 要加上特解
		return `${this.homogFormLatex} = a_n`;
	}
	
	mlSomeHi() { // 求未知係數 "h1 , h2 , h3" (latex)
		if (this.recurLevel <= 0) return "?"; // 遞迴階數等於齊次解未知係數的個數
		return Array.from({ length: this.recurLevel }, (_, i) => `h_{${i+1}}`).join(" ~,~ ");
	}
	
	mlNRange() { // 需要將 "n = 0, 1, 2" 代入上式，產生... (latex)
		if (this.recurLevel <= 0) return "?"; // 遞迴階數等於齊次解未知係數的個數
		return "n = " + Array.from({ length: this.recurLevel }, (_, i) => `${i}`).join(" , ");
	}
	
	mlSolveHiEquationSystem() { // ...的線性方程組，並解聯立： "..." (latex)
		const sc = this.cubic;
		const type = sc.solutionType(); // 特徵方程式的解形式
		const coefFunc = (n, j) => {
			if (type === _SolveCubic.TYPE_3FRAC) return this.HiLinearEquation[n][j];
			if (type === _SolveCubic.TYPE_FRAC_QUAD) {
				const quadLatex = sc.quad.toLatex();
				const posRoot = removePrefix(quadLatex.replace("\\pm", "+"), "+"); // +√s 根若開頭為 "+" 要去除
				if (j == 0) return _mlTerm(1, `\\left( ${posRoot} \\right)`, n, false);
				if (j == 1) return _mlTerm(1, `\\left( ${quadLatex.replace("\\pm", "-")} \\right)`, n, false);
				if (j == 2) return sc.frac_r1.toLatex(); // 另一個有理根
			}
			if (type === _SolveCubic.TYPE_3REAL) {
				if (n == 0) return "1";
				return this.HiLinearEquation[n][j].toFixed(4);
			}
			if (type === _SolveCubic.TYPE_REAL_IM) {
				if (j == 0) return _mlTerm(1, `(${sc.cRe.toFixed(4)} + ${sc.cIm.toFixed(4)} i)`, n, false);
				if (j == 1) return _mlTerm(1, `(${sc.cRe.toFixed(4)} - ${sc.cIm.toFixed(4)} i)`, n, false);
				if (j == 2) return _mlTerm(1, sc.r1.toFixed(4), n, false);
			}
			return "{?}";
		};
		
		const equalLatex = (n) => { // 聯立方程式的 "=" 右側的內容
			let s_latex = `a_{${n}}`; // 顯示 "= a_n"
			if (this.haveNonHomog) s_latex += ` - a_{${n}}^{(p)}`; // 若遞迴存在非齊次部分, 會多一個 "- a_n^(p)"
			return `${s_latex} = ${this.anSubAnp[n].toLatex()}`; // 加上常數 a_n - a_n^(p)
		};
		
		return _mlEquationSystem(
			this.recurLevel, this.recurLevel, coefFunc, (n, j) => `h_${j+1}`, equalLatex, "right"
		);
	}
	
	mlHiAnswer() { // 解聯立後得到： "..." (latex)
		return this.HiAnswer.map((effn_hi, i) => {
			let s_latex = (typeof effn_hi === "number") ? effn_hi.toFixed(4) : effn_hi.toLatex(); // 如果是浮點數就顯示四位小數, 如果是 Frac 或 EF 需要 .toLatex()
			return `h_${i+1} = ${s_latex}`;
		}).join(` ${SCL} `);
	}
	
	isAnswerHaveIm() { // 通解是否含有複數
		if (!this.ef_base) return false; // 不存在根號, 就不會存在複數
		return Hop.lt(this.ef_base.s, 0); // 存在 a + b√s 形式的特徵根, 且 s < 0
	}
	
	mlClosedForm() { // 遞迴的一般項, 無複數 (latex)
		const HiAnswerOnlyEfIsLatex = this.HiAnswer.map(effn_hi => {
			if (EF.isEF(effn_hi)) { // 先將 EF 轉為 latex, 因為 _mlTerm 不處理 EF
				if (Hop.equal(effn_hi.nf_a, 0) || Hop.equal(effn_hi.nf_b, 0)) return effn_hi.toLatex();
				return `\\left( ${effn_hi.toLatex()} \\right)`;
			}
			if (typeof effn_hi === "number") return effn_hi.toFixed(4); // 浮點數顯示小數四位
			return effn_hi;
		});
		return this.mlHomogForm(HiAnswerOnlyEfIsLatex);
	}
	
	mlClosedFormAddAn() { // 通解不含 i, 將 h_1, h_2, ... 直接代回 a_n: "..." (latex)
		let s_latex = this.mlClosedForm();
		if (this.haveNonHomog) s_latex += "+a_n^{(p)}";
		
		s_latex = removePrefix(s_latex, "+");
		if (s_latex === "") s_latex = "0";
		return `a_n = ${s_latex}`; // 由於採用 +0 捨去的生成方法, 所以最後要去除開頭的 0
	}
	
	mlClosedFormIm() { // 遞迴的一般項, 把複數化簡為三角函數 (latex)
		let s_latex = _mlTerm(this.ef_cosCoef.toLatex(), "\\cos(n \\theta) r^n", 1, true, true); // cos 部分
		s_latex += _mlTerm(this.ef_sinCoef.toLatex(), "\\sin(n \\theta) r^n", 1, true, true); // sin 部分
		
		const sc = this.cubic;
		const type = sc.solutionType(); // 特徵方程式的解形式
		if (type === _SolveCubic.TYPE_FRAC_QUAD) { // 處理共軛複根之外的剩餘根
			s_latex += _mlTerm(this.HiAnswer[2], sc.frac_r1, "n", true, true);
		} else if (type === _SolveCubic.TYPE_REAL_IM) {
			s_latex += _mlTerm(Hop.toLatex(this.HiAnswer[2]), sc.r1.toFixed(4), "n", true, true);
		}
		
		return s_latex;
	}
	
	mlClosedFormImAddAn() { // 先將複數部分轉為極座標，再使用歐拉公式： ... 因此 "..." (latex)
		let s_latex = this.mlClosedFormIm();
		if (this.haveNonHomog) s_latex += "+a_n^{(p)}";
		
		s_latex = removePrefix(s_latex, "+");
		if (s_latex === "") s_latex = "0";
		return `a_n = ${s_latex}`; // 由於採用 +0 捨去的生成方法, 所以最後要去除開頭的 0
	}
	
	mlClosedFormImWhere() { // 其中 "三角函數形式的 r 和 \theta" (latex)
		let s_rLatex = `\\left( ${this.ef_alpha.toLatex()} \\right)^2`; // alpha^2
		s_rLatex = `${s_rLatex} + \\left( ${this.ef_beta.toLatex()} \\right)^2`; // alpha^2 + beta^2
		s_rLatex = `r = \\sqrt{${s_rLatex}} = ${this.ef_norm.toLatex()}`; // r = √( alpha^2 + beta^2 ) = 範數
		
		let s_thetaLatex = "\\theta = ";
		s_thetaLatex += `\\tan^{-1}({${this.ef_beta.toLatex()}}/{${this.ef_alpha.toLatex()}})`; // theta = tan^-1(beta / alpha)
		if (this.ef_bDivA) s_thetaLatex += ` = \\tan^{-1}(${this.ef_bDivA.toLatex()})`; // tan^-1
		if (this.fn_tanToPi) s_thetaLatex += ` = ${Hop.toLatex(this.fn_tanToPi)} \\pi`; // 如果 tan 可化簡
		
		return `\\begin{gather*} ${s_rLatex} \\\\ ${s_thetaLatex} \\end{gather*}`;
	}
	
	mlClosedFormFix() { // 整理後的一般項為： "..."  (latex)
		let s_homogLatex = ""; // 齊次解當中, 無理數 b^n 部分的 latex
		let homogExpFunc = {}; // 將齊次解當中, 有理數 b^n 的部分提取出 (因為要跟特解合併)
		const sc = this.cubic;
		const type = sc.solutionType(); // 三次式的解形式
		
		if (type === _SolveCubic.TYPE_3FRAC) { // 解形式為: frac_r1 , frac_r2 , frac_r3
			let i = 0; // h_i 的編號
			for (const [frac_r, multiRootNum] of this.homogForm) { // 例: 將 [h1, h2, h3] 和 [[b1, 2], [b2, 1]] 轉為 { b1: [h1, h2], b2: [h3] } ; 為了與特解資訊做合併
				const s_frac_r = `${frac_r.n}/${frac_r.d}`;
				homogExpFunc[s_frac_r] = Array.from({ length: multiRootNum }, (_, j) => this.HiAnswer[i++]);
			} // 因為三有理根, 所以 s_homogLatex 為空
		}
		else if (type === _SolveCubic.TYPE_FRAC_QUAD) { // 解形式為: frac_r1 , (n ± m√s) / d
			if (this.isAnswerHaveIm()) { // 答案有複數: s < 0
				s_homogLatex = _mlTerm(this.ef_cosCoef.toLatex(), "\\cos(n \\theta) r^n", 1, true, true); // cos 部分
				s_homogLatex += _mlTerm(this.ef_sinCoef.toLatex(), "\\sin(n \\theta) r^n", 1, true, true); // sin 部分
			} else { // 答案沒有複數
				s_homogLatex = _mlTerm(
					this.HiAnswer[0].toLatex(),
					`\\left( ${this.ef_base.toLatex()} \\right)`,
					"n", true, true
				);
				s_homogLatex += _mlTerm(
					this.HiAnswer[1].toLatex(),
					`\\left( ${this.ef_base.conjugate().toLatex()} \\right)`,
					"n", true, true
				);
			}
			
			if (!sc.frac_r1.isZero()) {
				const s_frac_r = `${sc.frac_r1.n}/${sc.frac_r1.d}`;
				homogExpFunc[s_frac_r] = [this.HiAnswer[2]]; // 剩餘的一個有理根, 因為在運算時會把有理根的未知係數放在 h3, 所以要讀取 [2]
			}
		}
		else if (type === _SolveCubic.TYPE_3REAL) { // 解形式為: r1 , r2 , r3
			s_homogLatex = this.mlClosedForm(); // 同實數齊次部分; 因為不存在有理根, 所以 homogExpFunc 為空
		}
		else if (type === _SolveCubic.TYPE_REAL_IM) { // 解形式為: r1 , (cRe ± cIm i)
			s_homogLatex = this.mlClosedFormIm(); // 同複數 cos/sin 形式; 因為不存在有理根, 所以 homogExpFunc 為空
		}
		
		let expFunc = {};
		for (const [s_frac_b, expPjAnswer] of Object.entries(this.particular)) {
			expFunc[s_frac_b] = [...expPjAnswer]; // copy 特解資訊, 因為 expPjAnswer 內的元素 only read, 所以不用複製到那層
		}
		for (const [s_frac_b, expHiAnswer] of Object.entries(homogExpFunc)) { // 將齊次解有理數的部分併入
			if (s_frac_b in expFunc) {
				for (const [j, frac_hi] of expHiAnswer.entries()) expFunc[s_frac_b][j] = frac_hi; // 如果特解跟齊次解存在相同 b^n 項, 合併
			}
			else expFunc[s_frac_b] = expHiAnswer; // 如果沒有, 直接複製
		}
		
		let s_combinedLatex = Object.entries(expFunc).map(([s_frac_b, expAnswer]) => { // 將含有相同的 b^n 的項合併
			let termLatexArr = expAnswer.map((frac_coef, i) => _mlTerm(frac_coef, "n", i)); // 例: [ "?", "?n", "?n^2", ... ] (latex arr)
			termLatexArr = termLatexArr.filter(termLatex => termLatex !== "+0"); // 去除零項 ( "+0" )
			
			let s_polyLatex; // b^n 對應的的多項式的 latex
			if (termLatexArr.length === 0) s_polyLatex = "0"; // [] -> "0" (latex)
			else if (termLatexArr.length === 1) s_polyLatex = removePrefix(termLatexArr[0], "+"); // 例: [ "?n" ] -> "?n" (latex)
			else s_polyLatex = `( ${removePrefix(termLatexArr.join(""), "+")} )`; // 例: [ "?", "?n", "?n^2", ... ] -> "( ? + ?n + ?n^2 + ... )" (latex)
			
			const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b
			if (frac_b.equal(1)) return _mlTerm(1, s_polyLatex, 1); // 若出現 1^n, 不顯示指數部分
			return _mlTerm(s_polyLatex, frac_b, "n", true, true); // "+ ( ? + ?n + ?n^2 + ... ) b^n"
		}).join("");
		
		let s_latex = s_homogLatex + s_combinedLatex; // 將無理數和有理數部分合併
		s_latex = removePrefix(s_latex, "+"); // 去除 +
		s_latex = s_latex === "" ? "0" : s_latex; // 如果 a_n 沒有任何一項, 顯示 a_n = 0
		s_latex = `a_n = ${s_latex}`; // a_n = 通解
		
		if (this.isAnswerHaveIm()) { // 如果為三角形式, 需要附上 r 跟 theta
			s_latex += ` \\\\ r = ${this.ef_norm.toLatex()} ${SCL} \\theta = `; // "r = ? ,"
			if (this.fn_tanToPi) s_latex += `${Hop.toLatex(this.fn_tanToPi)} \\pi`; // 如果 tan 可化簡
			else s_latex += `\\tan^{-1}(${this.ef_bDivA.toLatex()})`; // tan^-1
		}
		
		return `\\begin{gather*} ${s_latex} \\end{gather*}`;
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

const mlRecurHomog = (recurCoef = []) => { // 生成 遞迴的齊次部分 "+ r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}" (latex)
	return recurCoef.map((frac_coef, i) => _mlTerm(frac_coef, `a_{n-${i+1}}`, 1, true, true)).join("");
};

const mlRecurHomogPrefix = (recurCoef = []) => { // 生成 遞迴的齊次部分 "a_n = r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}" (latex)
	let s_latex = mlRecurHomog(recurCoef);
	if (s_latex === "") s_latex = "0"; // 如果齊次部分沒有任何一項, 顯示 "0"
	return `a_n = ${removePrefix(s_latex, "+")}`; // 去除開頭的 + 後, 在開頭加上 "a_n ="
};

const mlRecurNonHomog = (nonHomoFunc = {}) => { // 生成 遞迴的非齊次部分 "+ c n^k b^n + ..." (latex)
	let s_latex = "";
	
	for (const [key, frac_c] of Object.entries(nonHomoFunc)) { // 生成非齊次部分: "+ c n^k b^n + ..."
		const [s_k, s_frac_b] = key.split(","); // 非齊次的 c n^k b^n 項會表示為 { "k,b.n/b.d": c , ... }
		const frac_b = Frac.fromStr(s_frac_b); // frac_b
		
		let s_term = _mlTerm(frac_c, "n", s_k); // c n^k 部分的 latex 字串
		if (!frac_b.equal(new Frac(1))) { // 若 b^n 部分不為 1^n , 擴展為 c n^k b^n
			s_term = _mlTerm(removePrefix(s_term, "+"), frac_b, "n");
		}
		if (s_term !== "+0") s_latex += s_term; // 只顯示 c n^k 不為 0 的項
	}
	
	return s_latex;
};

const mlRecurNonHomogPrefix = (nonHomoFunc = {}) => { // 生成 遞迴的非齊次部分 "F(n) = c n^k b^n + ..." (latex)
	let s_latex = mlRecurNonHomog(nonHomoFunc);
	if (s_latex === "") s_latex = "0"; // 如果非齊次部分沒有任何一項, 顯示 "0"
	return `F(n) = ${removePrefix(s_latex, "+")}`; // 去除開頭的 + 後, 在開頭加上 "F(n) ="
};

const mlRecur = (recurCoef = [], nonHomoFunc = {}, initConst = []) => { // 生成遞迴關係式的 latex 字串
	let s_latex = mlRecurHomog(recurCoef) + mlRecurNonHomog(nonHomoFunc);
	
	if (s_latex === "") s_latex = "0"; // 如果齊次與非齊次部分沒有任何一項, 顯示 "0"
	s_latex = `a_n = ${removePrefix(s_latex, "+")}`; // 在開頭加上 "a_n =", 此時 latex 字串為: "a_n = 齊次部分 + 非齊次部分"
	
	s_latex += ` ${SCL} n \\ge ${recurCoef.length}`; // 加上遞迴限制 ", n >= ?" , ? 應等於遞迴階數
	s_latex += " \\\\ "; // 換行
	
	s_latex += initConst.map((frac_init, i) => `a_${i} = ${frac_init.toLatex()}`).join(` ${SCL} `); // 生成初始條件部分: a_0 = ? , a_1 = ? , a_2 = ?
	
	return `\\begin{gather*} ${s_latex} \\end{gather*}`; // 使 latex 置中的語法
};

const recur = ref(new SolveRecur()); // 遞迴的計算結果
const recurLatex = ref("{?}"); // 遞迴關係式 (latex)

watch(() => [props.recurCoef, props.nonHomoFunc, props.initConst], ([newRC, newNHF, newIC]) => {
	recur.value = new SolveRecur(newRC, newNHF, newIC); // 遞迴參數改變時, 更新遞迴資訊
	recurLatex.value = mlRecur(newRC, newNHF, newIC); // 生成遞迴關係式的 latex 字串
	emit("recurLatex", recurLatex.value); // 上傳遞迴關係式的 latex 字串
}, { immediate: true, deep: true });
</script>
