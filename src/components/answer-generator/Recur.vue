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
				@particular="(p) => recur._calcAnSubAnp(p)"
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
	</div>
	<Content v-else colorStyle="red" collapsed>
		必須輸入 1 ~ 3 階遞迴
	</Content>
</template>

<script setup>
import { ref, watch } from "vue";
import { Frac, SolveQuad, SolveCubic, SCL, mlTerm, mlEquationSystem } from "@/libs/RanMath.js";
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
		this._calcAnSubAnp(); // 將常數 n 代入 a_n - a_n^(p), 用於解未知係數 h_i 的聯立.
		
		this.homogFormLatex = this.mlHomogForm(); // 齊次解的形式 (latex)
	}
	
	_initCubic() { // 計算齊次解的特徵值
		let coef = [...this.recurCoef];
		while (coef.length < 3) coef.push(new Frac(0)); // 0, 1, 2 階遞迴要解三次特徵方程式需要補足係數
		this.cubic = new SolveCubic(new Frac(1), coef[0].muli(-1), coef[1].muli(-1), coef[2].muli(-1)); // 解方程式 t^3 - r1t^2 - r2t - r3 = 0
	}
	
	_initHomogForm() { // 生成齊次形式的資訊. 注: this.homogForm[0] 可以讀取重根資訊
		const sc = this.cubic;
		if (sc.solutionType() !== SolveCubic.TYPE_3FRAC) { // 只有三有理根型態才存在重根
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
	
	_fieldPow(fn_a, fn_b, fn_s, int_n) { // 擴張體 (a + b√s)^n 的運算
		if (int_n === 0) { // (a + b√s)^0 = 1 + 0√s
			if (Frac.isFrac(fn_a)) return [new Frac(1), new Frac(0)];
			return [1, 0];
		}
		
		const [fn_fa, fn_fb] = this._fieldPow(fn_a, fn_b, fn_s, int_n-1); // 因為 n 只會等於 0~2, 所以沒做快速冪
		if (Frac.isFrac(fn_a)) {
			return [fn_fa.mul(fn_a).add(fn_fb.mul(fn_b).mul(fn_s)), fn_fb.mul(fn_a).add(fn_fa.mul(fn_b))];
		}
		return [fn_fa*fn_a + fn_fb*fn_b*fn_s, fn_fb*fn_a + fn_fa*fn_b];
	}
	
	// FRAC_QUAD 跟 TYPE_REAL_IM 會化簡 (h1 + h2√s)(a + b√s)^n + (h1 - h2√s)(a - b√s)^n + h3 c^n, 所以聯立會比較特別
	_initHiEquationSystem() { // 未知係數 h_i 的聯立方程式
		const sc = this.cubic;
		const type = sc.solutionType(); // 特徵方程式的解形式
		
		if (type === SolveCubic.TYPE_3FRAC) { // 解形式為: frac_r1 , frac_r2 , frac_r3
			const getCoef = []; // getCoef[i](n) 代表 a_n^(h) 代入常數 n 後, 未知數 h_{i+1} 的係數: (n^j r^n) h_{i+1}
			this.homogForm.map(([frac_r, multiRootNum]) => {
				for (let j = 0; j < multiRootNum; j++) getCoef.push((n) => frac_r.pow(n).muli(n**j)); // (n^j r^n) h_{i+1}
			}); // 注: getCoef.length == 遞迴階數
			this.HiLinearEquation = Array.from(
				{ length: this.recurLevel },
				(_, n) => Array.from({ length: this.recurLevel }, (_, i) => getCoef[i](n)) // 去看 getCoef 的註解
			);
		}
		else if (type === SolveCubic.TYPE_FRAC_QUAD) { // 解形式為: frac_r1 , (n ± m√s) / d
			let [frac_a, frac_b] = [new Frac(sc.quad.n, sc.quad.d), new Frac(sc.quad.m, sc.quad.d)];
			this.HiLinearEquation = Array.from({ length: this.recurLevel }, (_, n) => {
				let [frac_fa, frac_fb] = this._fieldPow(frac_a, frac_b, new Frac(sc.quad.s), n); // (a + b√s)^n = fa + fb√s = [fa, fb]
				[frac_fa, frac_fb] = [frac_fa.muli(2), frac_fb.muli(2*sc.quad.s)]; // [2*fa, 2s*fb]
				if (this.recurLevel == 2) return [frac_fa, frac_fb];
				if (this.recurLevel == 3) return [frac_fa, frac_fb, sc.frac_r1.pow(n)];
			});
		}
		else if (type === SolveCubic.TYPE_3REAL) { // 解形式為: r1 , r2 , r3
			this.HiLinearEquation = Array.from({ length: 3 }, (_, n) => [sc.r1**n, sc.r2**n, sc.r3**n]); // 只有三階遞迴才會出現此形式, 而且三次函數不存在無理重根, 非常簡單
		}
		else if (type === SolveCubic.TYPE_REAL_IM) { // 解形式為: r1 , (cRe ± cIm i)
			this.HiLinearEquation = Array.from({ length: 3 }, (_, n) => {
				const [fa, fb] = this._fieldPow(sc.cRe, sc.cIm, -1, n); // (a + b√-1)^n = fa + fb√-1 = [fa, fb]
				return [2*fa, -2*fb, sc.r1**n]; // [2*fa, 2(-1)*fb]
			});
		}
	}
	
	/* 將常數 n 代入 a_n - a_n^(p), 用於解未知係數 h_i 的聯立.
	 * 
	 * 無論有沒有非齊次部分, 建構子會執行 _calcAnSubAnp(), 此時 anSubAnp = [ a_0 , a_1 , ... ]
	 * 
	 * 若遞迴有非齊次部分, 子組件 RecurNonHomog.vue 會回傳特解資訊 particular,
	 * 再執行一次 _calcAnSubAnp(particular), 確保 anSubAnp = [ a_0-a_0^(p) , a_1-a_1^(p) , ... ]
	*/
	_calcAnSubAnp(particular) {
		if (!particular) { // 若遞迴沒有非齊次部分
			this.anSubAnp = this.initConst;
			return;
		}
		
		this.anSubAnp = this.initConst.map((frac_an, n) => { // 常數 a_n - a_n^(p)
			const frac_anp = Frac.sum( // 將常數 n 代入 a_n^(p)
				Object.entries(particular).map(([s_frac_b, expPjAnswer]) => {
					const frac_anpExp = Frac.sum(expPjAnswer.map((frac_pj, i) => frac_pj.mul(new Frac(n**i)))); // 代入 n 得到的常數 (p1 + p2 n + p3 n^2 + ...)
					return frac_anpExp.mul(Frac.fromStr(s_frac_b).pow(n)); // (p1 + p2 n + p3 n^2 + ...) b^n
				})
			);
			return frac_an.sub(frac_anp); // a_n - a_n^(p)
		});
	}
	
	mlCharPoly() { // 特徵方程式 "t^l = r1 t^{l-1} + r2 t^{l-2} + r3 t^{l-3}" (latex)
		let l = this.recurLevel; // 遞迴階數
		let s_latex = this.recurCoef.map(
			(frac_coef, i) => mlTerm(frac_coef, "t", l-1-i, true, true)
		).join("");
		if (s_latex === "") s_latex = "0"; // 若特徵方程式為 0 多項式
		return `${mlTerm("", "t", l, false)} = ${removePrefix(s_latex, "+")}`; // 去除開頭的 + 後, 在開頭加上 "t^l ="
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
		const expLatex = mlTerm(1, frac_multiRoot, "n", false); // 一重根也會生成重根齊次形式, 但不會顯示出來, 不用管它
		return Array.from({ length: multiRootNum },
			(_, i) => `${mlTerm(`h_${i+1}`, "n", i, false)} ${expLatex}`
		).join(" + ");
	}
	
	mlHomogForm() { // 因此將齊次解設為 "..." (latex)
		const sc = this.cubic;
		const type = sc.solutionType(); // 三次式的解形式
		
		if (type === SolveCubic.TYPE_3FRAC) { // 解形式為: frac_r1 , frac_r2 , frac_r3
			let i = 1; // h_i 的編號
			return this.homogForm.map(([frac_r, multiRootNum]) => {
				const expLatex = mlTerm(1, frac_r, "n", false); // b^n (latex)
				return Array.from(
					{ length: multiRootNum },
					(_, j) => `${mlTerm(`h_${i++}`, "n", j, false)} ${expLatex}`
				).join(" + ");
			}).join(" + ");
		}
		if (type === SolveCubic.TYPE_FRAC_QUAD) { // 解形式為: frac_r1 , (n ± m√s) / d
			const quadLatex = sc.quad.toLatex();
			const posRoot = removePrefix(quadLatex.replace("\\pm", "+"), "+"); // +√s 根若開頭為 "+" 要去除
			let s_latex = mlTerm("h_1 ", `\\left( ${posRoot} \\right)`, "n");
			s_latex += mlTerm("h_2 ", `\\left( ${quadLatex.replace("\\pm", "-")} \\right)`, "n"); // ± 替換成 + 和 -, 就變成兩個根
			s_latex += mlTerm("h_3 ", sc.frac_r1, "n", true, true); // 剩餘根 (如果為 0 會不顯示)
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		if (type === SolveCubic.TYPE_3REAL) { // 解形式為: r1 , r2 , r3
			let s_latex = [sc.r1, sc.r2, sc.r3].map(
				(r, i) => mlTerm(`h_{${i+1}}`, r.toFixed(4), "n")
			).join("");
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		if (type === SolveCubic.TYPE_REAL_IM) { // 解形式為: r1 , (cRe ± cIm i)
			let s_latex = mlTerm("h_1 ", `(${sc.cRe.toFixed(4)} + ${sc.cIm.toFixed(4)} i)`, "n");
			s_latex += mlTerm("h_2 ", `(${sc.cRe.toFixed(4)} - ${sc.cIm.toFixed(4)} i)`, "n");
			s_latex += mlTerm("h_3 ", sc.r1.toFixed(4), "n"); // 剩餘根
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		
		return "{?}";
	}
	
	mlGeneralForm() { // 遞迴的通解 a_n = a_n^(h) + a_n^(p) , 因此 "..." (latex)
		if (this.haveNonHomog) return `a_n = ${this.homogFormLatex} + a_n^{(p)}`; // 如果遞迴有非齊次部分, 要加上特解
		return `a_n = ${this.homogFormLatex}`;
	}
	
	mlGeneralFormTrans() { // 將帶有未知係數 h_i 的部分移項至左側： "..." (latex)
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
			if (type === SolveCubic.TYPE_3FRAC) return this.HiLinearEquation[n][j];
			if (type === SolveCubic.TYPE_FRAC_QUAD) {
				const quadLatex = sc.quad.toLatex();
				const posRoot = removePrefix(quadLatex.replace("\\pm", "+"), "+"); // +√s 根若開頭為 "+" 要去除
				if (j == 0) return mlTerm(1, `\\left( ${posRoot} \\right)`, n, false);
				if (j == 1) return mlTerm(1, `\\left( ${quadLatex.replace("\\pm", "-")} \\right)`, n, false);
				if (j == 2) return sc.frac_r1.toLatex(); // 另一個有理根
			}
			if (type === SolveCubic.TYPE_3REAL) {
				if (n == 0) return "1";
				return this.HiLinearEquation[n][j].toFixed(4);
			}
			if (type === SolveCubic.TYPE_REAL_IM) {
				if (j == 0) return mlTerm(1, `(${sc.cRe.toFixed(4)} + ${sc.cIm.toFixed(4)} i)`, n, false);
				if (j == 1) return mlTerm(1, `(${sc.cRe.toFixed(4)} - ${sc.cIm.toFixed(4)} i)`, n, false);
				if (j == 2) return mlTerm(1, sc.r1.toFixed(4), n, false);
			}
		};
		
		const equalLatex = (n) => { // 聯立方程式的 "=" 右側的內容
			let s_latex = `a_{${n}}`; // 顯示 "= a_n"
			if (this.haveNonHomog) s_latex += ` - a_{${n}}^{(p)}`; // 若遞迴存在非齊次部分, 會多一個 "- a_n^(p)"
			return `${s_latex} = ${this.anSubAnp[n].toLatex()}`; // 加上常數 a_n - a_n^(p)
		};
		
		return mlEquationSystem(
			this.recurLevel, this.recurLevel, coefFunc, (n, j) => `h_${j+1}`, equalLatex, "right"
		);
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

const mlRecurHomogPrefix = (recurCoef = []) => { // 生成 遞迴的齊次部分 "a_n = r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}" (latex)
	let s_latex = mlRecurHomog(recurCoef);
	if (s_latex === "") s_latex = "0"; // 如果齊次部分沒有任何一項, 顯示 "0"
	return `a_n = ${removePrefix(s_latex, "+")}`; // 去除開頭的 + 後, 在開頭加上 "a_n ="
};

const mlRecurNonHomogPrefix = (nonHomoFunc = {}) => { // 生成 遞迴的非齊次部分 "F(n) = c n^k b^n + ..." (latex)
	let s_latex = mlRecurNonHomog(nonHomoFunc);
	if (s_latex === "") s_latex = "0"; // 如果非齊次部分沒有任何一項, 顯示 "0"
	return `F(n) = ${removePrefix(s_latex, "+")}`; // 去除開頭的 + 後, 在開頭加上 "F(n) ="
};

const mlRecurHomog = (recurCoef = []) => { // 生成 遞迴的齊次部分 "+ r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}" (latex)
	return recurCoef.map((frac_coef, i) => mlTerm(frac_coef, `a_{n-${i+1}}`, 1, true, true)).join("");
};

const mlRecurNonHomog = (nonHomoFunc = {}) => { // 生成 遞迴的非齊次部分 "+ c n^k b^n + ..." (latex)
	let s_latex = "";
	
	for (const [key, frac_c] of Object.entries(nonHomoFunc)) { // 生成非齊次部分: "+ c n^k b^n + ..."
		const [s_k, s_frac_b] = key.split(","); // 非齊次的 c n^k b^n 項會表示為 { "k,b.n/b.d": c , ... }
		const frac_b = Frac.fromStr(s_frac_b); // frac_b
		
		let s_term = mlTerm(frac_c, "n", s_k); // c n^k 部分的 latex 字串
		if (!frac_b.equal(new Frac(1))) { // 若 b^n 部分不為 1^n , 擴展為 c n^k b^n
			s_term = mlTerm(removePrefix(s_term, "+"), frac_b, "n");
		}
		if (s_term !== "+0") s_latex += s_term; // 只顯示 c n^k 不為 0 的項
	}
	
	return s_latex;
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
