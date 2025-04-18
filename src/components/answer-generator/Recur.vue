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
		<span v-if="recur.multiRootNum > 1">
			有{{ recur.multiRootNum == 2 ? "二" : "三" }}重根
			<vl :exp="recur.frac_multiRoot.toLatex()" />，需要設
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
				@particular="(p) => recur.particular = p"
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
		
	</div>
	<Content v-else colorStyle="red" collapsed>
		必須輸入 1 ~ 3 階遞迴
	</Content>
</template>

<script setup>
import { ref, watch } from "vue";
import { Frac, SolveCubic, makeTermLatex, SCL } from "@/libs/RanMath.js";
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
		this._initMultiRoot(); // 紀錄特徵值的重根與重根數
		this.homogFormLatex = this.mlHomogForm(); // 齊次解的形式 (latex)
	}
	
	_initCubic() { // 計算齊次解的特徵值
		let coef = [...this.recurCoef];
		while (coef.length < 3) coef.push(new Frac(0)); // 0, 1, 2 階遞迴要解三次特徵方程式需要補足係數
		this.cubic = new SolveCubic(new Frac(1), coef[0].muli(-1), coef[1].muli(-1), coef[2].muli(-1)); // 解方程式 t^3 - r1t^2 - r2t - r3 = 0
	}
	
	_initMultiRoot() { // 紀錄特徵值的重根與重根數
		const dRoot = this.cubic.getDoubleRoot(); // 二重根的值
		const tRoot = this.cubic.getTripleRoot(); // 三重根的值
		if (dRoot?.isZero()) { // 處理零重根 (1, 2 階遞迴)
			this.frac_multiRoot = null;
			this.multiRootNum = tRoot ? 0 : 1; // 三重零根
		} else {
			this.frac_multiRoot = dRoot; // 重根值. 三重根的值 = 二重根, 所以直接用 dRoot
			this.multiRootNum = dRoot ? (tRoot ? 3 : 2) : 1; // 最高重根數
		}
	}
	
	mlCharPoly() { // 特徵方程式 "t^l = r1 t^{l-1} + r2 t^{l-2} + r3 t^{l-3}" (latex)
		let l = this.recurLevel; // 遞迴階數
		let s_latex = this.recurCoef.map(
			(frac_coef, i) => makeTermLatex(frac_coef, "t", l-1-i, true, true)
		).join("");
		if (s_latex === "") s_latex = "0"; // 若特徵方程式為 0 多項式
		return `${makeTermLatex("", "t", l, false)} = ${removePrefix(s_latex, "+")}`; // 去除開頭的 + 後, 在開頭加上 "t^l ="
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
		const exp = this.frac_multiRoot ? makeTermLatex(1, this.frac_multiRoot, "n", false) : "{?}"; // b^n 的 latex
		if (this.multiRootNum == 2) return `h_1 ${exp} + h_2 n ${exp}`; // h_1 b^n + h_2 n b^n
		if (this.multiRootNum == 3) return `h_1 ${exp} + h_2 n ${exp} + h_3 n^2 ${exp}`; // h_1 b^n + h_2 n b^n + h_3 n^2 b^n
		return "{?}";
	}
	
	mlHomogForm() { // 因此將齊次解設為 "..." (latex)
		const sc = this.cubic;
		const type = sc.solutionType(); // 三次式的解形式
		const mRootNum = this.multiRootNum; // 重根個數
		const frac_mRoot = this.frac_multiRoot; // 重根的值
		const mRootHomogLatex = this.mlMultiRootHomog();
		
		if (type === SolveCubic.TYPE_3FRAC) { // 解形式為: frac_r1 , frac_r2 , frac_r3
			if (mRootNum == 3) return mRootHomogLatex; // 三重根
			if (mRootNum == 2) {
				for (const frac_r of [sc.frac_r1, sc.frac_r2, sc.frac_r3]) if (!frac_r.equal(frac_mRoot)) {
					return mRootHomogLatex + makeTermLatex("h_3 ", frac_r, "n", true, true); // 二重根 + 剩餘根 (如果為 0 會不顯示)
				}
			}
			if (mRootNum == 1) {
				let roots = [sc.frac_r1, sc.frac_r2, sc.frac_r3]; // 三個根
				roots = roots.filter(frac_r => !frac_r.isZero()); // 刪除為 0 的根
				let s_latex = roots.map( // 轉為 latex, 並連結起來
					(frac_r, i) => makeTermLatex(`h_{${i+1}}`, frac_r, "n", true, true)
				).join("");
				return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
			}
			return "{?}";
		}
		if (type === SolveCubic.TYPE_FRAC_QUAD) { // 解形式為: frac_r1 , (n ± m√s) / d
			const quadLatex = sc.quad.toLatex();
			const posRoot = removePrefix(quadLatex.replace("\\pm", "+"), "+"); // +√s 根若開頭為 "+" 要去除
			let s_latex = makeTermLatex("h_1 ", `\\left( ${posRoot} \\right)`, "n");
			s_latex += makeTermLatex("h_2 ", `\\left( ${quadLatex.replace("\\pm", "-")} \\right)`, "n"); // ± 替換成 + 和 -, 就變成兩個根
			s_latex += makeTermLatex("h_3 ", sc.frac_r1, "n", true, true); // 剩餘根 (如果為 0 會不顯示)
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
	return recurCoef.map((frac_coef, i) => makeTermLatex(frac_coef, `a_{n-${i+1}}`, 1, true, true)).join("");
};

const mlRecurNonHomog = (nonHomoFunc = {}) => { // 生成 遞迴的非齊次部分 "+ c n^k b^n + ..." (latex)
	let s_latex = "";
	
	for (const [key, frac_c] of Object.entries(nonHomoFunc)) { // 生成非齊次部分: "+ c n^k b^n + ..."
		const [s_k, s_frac_b] = key.split(","); // 非齊次的 c n^k b^n 項會表示為 { "k,b.n/b.d": c , ... }
		const frac_b = Frac.fromStr(s_frac_b); // frac_b
		
		let s_term = makeTermLatex(frac_c, "n", s_k); // c n^k 部分的 latex 字串
		if (!frac_b.equal(new Frac(1))) { // 若 b^n 部分不為 1^n , 擴展為 c n^k b^n
			s_term = makeTermLatex(removePrefix(s_term, "+"), frac_b, "n");
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
	console.log("update ui")
	recur.value = new SolveRecur(newRC, newNHF, newIC); // 遞迴參數改變時, 更新遞迴資訊
	recurLatex.value = mlRecur(newRC, newNHF, newIC); // 生成遞迴關係式的 latex 字串
	emit("recurLatex", recurLatex.value); // 上傳遞迴關係式的 latex 字串
}, { immediate: true, deep: true });
</script>
