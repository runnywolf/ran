<template>
	<div v-if="1 <= recurCoef.length && recurCoef.length <= 3"><!-- 必須為 1 ~ 3 階遞迴 -->
		遞迴關係式和初始條件為
		<vl c :exp="recurLatex" />
		
		<span class="ts-text is-large is-bold">Step1：求齊次解的形式</span><br>
		遞迴的齊次部分為 <vl :exp="getRecurHomogLatex()" /><br>
		<vl exp="\Rightarrow" /> 特徵方程式為 <vl :exp="makeCharPolyLatex()" /><br>
		<vl :exp="`\\Rightarrow ~ t = ${recur.makeCharLatex()}`" />
		<span v-if="recur.showNoRationalRoot()" style="color: #eb0; margin-left: 10px;">
			<span class="ts-icon is-circle-exclamation-icon"></span>
			不存在有理數根
		</span>
		<div style="height: 12px;"></div>
		<span v-if="recur.multiRootNum > 1">
			有{{ recur.multiRootNum == 2 ? "二" : "三" }}重根
			<vl :exp="recur.frac_multiRoot.toLatex()" />，需要設
			<vl :exp="recur.makeMultiRootHomogLatex()" /> 保證線性獨立。<br>
		</span>
		因此將齊次解設為
		<vl c :exp="`a_n^{(h)} = ${recur.makeHomogFormLatex()}`" />
		
		<span class="ts-text is-large is-bold">Step2：求特解的形式</span><br>
		
	</div>
	<Content v-else colorStyle="red" collapsed>
		必須輸入 1 ~ 3 階遞迴
	</Content>
</template>

<script setup>
import { ref, watch } from "vue";
import { Frac, SolveCubic, makeTermLatex, removePrefix, SCL } from "@/libs/RanMath.js";
import Content from "@/components/global/Content.vue"; // 內容區塊的組件

class SolveRecur { // 解非齊次遞迴
	constructor(recurCoef = [], nonHomoFunc = {}) {
		this.recurCoef = recurCoef;
		this.nonHomoFunc = nonHomoFunc;
		
		let coef = [...recurCoef];
		while (coef.length < 3) coef.push(new Frac(0)); // 0, 1, 2 階遞迴要解三次特徵方程式需要補足係數
		this.cubic = new SolveCubic(new Frac(1), coef[0].muli(-1), coef[1].muli(-1), coef[2].muli(-1)); // t^3 - r1t^2 - r2t - r3 = 0
		
		const dRoot = this.cubic.getDoubleRoot(); // 二重根的值
		const tRoot = this.cubic.getTripleRoot(); // 三重根的值
		this.multiRootNum = dRoot ? (tRoot ? 3 : 2) : 1; // 最高重根數
		this.frac_multiRoot = dRoot; // 重根值. 三重根的值 = 二重根, 所以直接用 dRoot
		
		
	}
	
	makeCharLatex() { // 特徵值 t (latex 字串)
		if (this.recurCoef.length == 1) return this.recurCoef[0].toLatex(); // 一次方程式的解
		if (this.recurCoef.length == 2) return this.cubic.quad.toLatex(); // 二次方程式的解
		if (this.recurCoef.length == 3) return this.cubic.toLatex(); // 三次方程式的解
		return "?";
	}
	
	showNoRationalRoot() { // 是否要顯示 "不存在有理數特徵值"
		return this.cubic.frac_r1 === undefined; // TYPE_3FRAC 和 TYPE_FRAC_QUAD 型態才存在有理數根
	}
	
	makeMultiRootHomogLatex() { // 重根齊次形式 (latex 字串)
		const exp = this.frac_multiRoot ? makeTermLatex(1, this.frac_multiRoot, "n", false) : "?"; // b^n 的 latex
		if (this.multiRootNum == 2) return `h_1 ${exp} + h_2 n ${exp}`; // h_1 b^n + h_2 n b^n
		if (this.multiRootNum == 3) return `h_1 ${exp} + h_2 n ${exp} + h_3 n^2 ${exp}`; // h_1 b^n + h_2 n b^n + h_3 n^2 b^n
		return "?";
	}
	
	makeHomogFormLatex() { // 齊次解的形式 (latex 字串)
		const sc = this.cubic;
		const type = sc.solutionType(); // 三次式的解形式
		const mRootNum = this.multiRootNum; // 重根個數
		const frac_mRoot = this.frac_multiRoot; // 重根的值
		const mRootHomogLatex = this.makeMultiRootHomogLatex();
		
		if (type === SolveCubic.TYPE_3FRAC) { // 解形式為: frac_r1 , frac_r2 , frac_r3
			if (mRootNum == 3) return mRootHomogLatex; // 三重根
			if (mRootNum == 2) {
				for (const frac_r of [sc.frac_r1, sc.frac_r2, sc.frac_r3]) {
					if (!frac_r.equal(frac_mRoot)) return mRootHomogLatex + makeExpLatex("h_3 ", frac_r); // 二重根 + 剩餘根 (如果為 0 會不顯示)
				}
			}
			if (mRootNum == 1) {
				let roots = [sc.frac_r1, sc.frac_r2, sc.frac_r3]; // 三個根
				roots = roots.filter(frac => !frac.isZero()); // 刪除為 0 的根
				let s_latex = roots.map((frac, i) => makeExpLatex(`h_${i+1} `, frac)).join(""); // 轉為 latex, 並連結起來
				return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
			}
			return "?";
		}
		if (type === SolveCubic.TYPE_FRAC_QUAD) { // 解形式為: frac_r1 , (n ± m√s) / d
			const quadLatex = sc.quad.toLatex();
			const posRoot = removePrefix(quadLatex.replace("\\pm", "+"), "+"); // +√s 根若開頭為 "+" 要去除
			let s_latex = makeExpLatex("h_1 ", `\\left( ${posRoot} \\right)`);
			s_latex += makeExpLatex("h_2 ", `\\left( ${quadLatex.replace("\\pm", "-")} \\right)`); // ± 替換成 + 和 -, 就變成兩個根
			s_latex += makeExpLatex("h_3 ", sc.frac_r1); // 剩餘根 (如果為 0 會不顯示)
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		if (type === SolveCubic.TYPE_3REAL) { // 解形式為: r1 , r2 , r3
			let s_latex = [sc.r1, sc.r2, sc.r3].map(
				(r, i) => makeExpLatex(`h_${i+1} `, r.toFixed(4))
			).join("");
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		if (type === SolveCubic.TYPE_REAL_IM) { // 解形式為: r1 , (cRe ± cIm i)
			let s_latex = makeExpLatex("h_1 ", `( ${sc.cRe.toFixed(4)} + ${sc.cIm.toFixed(4)} i )`);
			s_latex += makeExpLatex("h_2 ", `( ${sc.cRe.toFixed(4)} - ${sc.cIm.toFixed(4)} i )`);
			s_latex += makeExpLatex("h_3 ", sc.r1.toFixed(4)); // 剩餘根 (如果為 0 會不顯示)
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		
		return "?";
	};
	
	
}

const props = defineProps({
	recurCoef: { type: Array, default: [] }, // 齊次部分的係數, length 代表遞迴階數
	nonHomoFunc: { type: Object, default: {} }, // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 { "k,b.n/b.d": c , ... }
	initConst: { type: Array, default: [] }, // 遞迴的初始條件, 會保持與 recurCoef 的大小相同
});

const emit = defineEmits([
	"recurLatex", // 遞迴式改變時, 回傳遞迴關係式的 latex 字串. (用於供應 RecurInput 的遞迴預覽)
]);

const recurLatex = ref("?");
const recur = ref(new SolveRecur());

watch(() => [props.recurCoef, props.nonHomoFunc, props.initConst],
	([newRecurCoef, newNonHomoFunc, newInitConst]) => {
		recur.value = new SolveRecur(newRecurCoef, newNonHomoFunc, newInitConst); // 遞迴參數改變時, 更新遞迴資訊
		recurLatex.value = makeRecurLatex(newRecurCoef, newNonHomoFunc, newInitConst); // 生成遞迴關係式的 latex 字串
		emit("recurLatex", recurLatex.value); // 回傳遞迴關係式的 latex 字串
	}
);

const makeExpLatex = (c, frac_b) => { // 生成 c b^n 形式的 latex
	let s_latex = makeTermLatex(c, frac_b, "n");
	if (s_latex === "+0") return "";
	return s_latex;
};

const getRecurHomogLatex = () => { // 生成 遞迴的齊次部分 (有包含 a_n =)
	let s_latex = makeRecurHomogLatex(props.recurCoef);
	if (s_latex === "") s_latex = "0"; // 如果齊次部分沒有任何一項, 顯示 "0"
	return `a_n = ${removePrefix(s_latex, "+")}`; // 在開頭加上 "a_n ="
};

const makeRecurHomogLatex = (recurCoef = []) => { // 生成 遞迴的齊次部分 (latex 字串)
	let s_latex = "";
	for (const [i, frac_coef] of recurCoef.entries()) { // 生成齊次部分: r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}
		const s_term = makeTermLatex(frac_coef, `a_{n-${i+1}}`, 1);
		if (s_term !== "+0") s_latex += s_term; // 只顯示係數 r_i 不為 0 的項
	}
	return s_latex;
};

const makeRecurNonHomogLatex = (nonHomoFunc = {}) => { // 生成 遞迴的非齊次部分 (latex 字串)
	let s_latex = "";
	for (const [key, frac_c] of Object.entries(nonHomoFunc)) { // 生成非齊次部分: frac_c n^k (frac_b)^n + ...
		const [s_k, s_frac_b] = key.split(","); // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 { "k,b.n/b.d": c , ... }
		const frac_b = Frac.fromStr(s_frac_b); // frac_b
		
		let s_term = makeTermLatex(frac_c, "n", s_k); // c n^k 部分的 latex 字串
		if (!frac_b.equal(new Frac(1))) { // 若 b^n 部分不為 1^n , 擴展為 c n^k b^n
			s_term = makeTermLatex(makeTermLatex(frac_c, "n", s_k, false), frac_b, "n");
		}
		if (s_term !== "+0") s_latex += s_term; // 只顯示 c n^k 不為 0 的項
	}
	return s_latex;
};

const makeRecurLatex = (recurCoef = [], nonHomoFunc = {}, initConst = []) => { // 生成遞迴關係式的 latex 字串
	let s_latex = `${makeRecurHomogLatex(recurCoef)}${makeRecurNonHomogLatex(nonHomoFunc)}`;
	
	if (s_latex === "") s_latex = "0"; // 如果齊次與非齊次部分沒有任何一項, 顯示 "0"
	s_latex = `a_n = ${removePrefix(s_latex, "+")}`; // 在開頭加上 "a_n =", 此時 latex 字串為: "a_n = 齊次部分 + 非齊次部分"
	
	s_latex += ` ${SCL} n \\ge ${recurCoef.length}`; // 加上遞迴限制 ", n >= ?" , ? 應等於遞迴階數
	s_latex += " \\\\ "; // 換行
	
	let initConstLatexArr = []; // 每一個初始條件 a_i = ? 的 latex 字串
	for (const [i, frac_init] of initConst.entries()) { // 生成初始條件部分: a_0 = ? , a_1 = ? , a_2 = ?
		initConstLatexArr.push(`a_${i} = ${frac_init.toLatex()}`);
	}
	s_latex += initConstLatexArr.join(` ${SCL} `);
	
	return `\\begin{gather*} ${s_latex} \\end{gather*}`; // 使 latex 置中的語法
};

const makeCharPolyLatex = () => { // 特徵方程式 (latex 字串)
	let s_latex = "";
	let l = props.recurCoef.length;
	
	for (const [i, frac_coef] of props.recurCoef.entries()) {
		const s_term = makeTermLatex(frac_coef, "t", l-i-1);
		if (s_term !== "+0") s_latex += s_term;
	}
	
	if (s_latex === "") s_latex = "0";
	s_latex = `${makeTermLatex("", "t", l, false)} = ${removePrefix(s_latex, "+")}`;
	
	return s_latex;
};




</script>
