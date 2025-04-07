<template>
	<div v-if="1 <= recurCoef.length && recurCoef.length <= 3"><!-- 必須為 1 ~ 3 階遞迴 -->
		遞迴關係式和初始條件為
		<vl c :exp="makeRecurLatex(recurCoef, nonHomoFunc, initConst)" />
		
		<span class="ts-text is-large is-bold">Step1：求齊次解的形式</span><br>
		遞迴的齊次部分為 <vl :exp="makeRecurHomogLatex()" /><br>
		<vl exp="\Rightarrow" /> 特徵方程式為 <vl :exp="makeCharPolyLatex()" /><br>
		<vl :exp="`\\Rightarrow ~ t = ${makeCharLatex()}`" />
		<span v-show="showNoRationalRoot()" style="color: #eb0; margin-left: 10px;">
			<span class="ts-icon is-circle-exclamation-icon"></span>
			不存在有理數根
		</span>
		<div style="margin-top: 12px;"></div>
		<span v-if="multiRootNum > 1">
			有{{ multiRootNum == 2 ? "二" : "三" }}重根
			<vl :exp="frac_multiRoot.toLatex()" />，需要設
			<vl :exp="multiRootHomogLatex" /> 保證線性獨立。<br>
		</span>
		因此將齊次解設為
		<vl c :exp="`a_n^{(h)} = ${makeHomogFormLatex()}`" />
		
		<!-- todo: 虛數轉 cos/sin -->
		
		<span class="ts-text is-large is-bold">Step2：求特解</span><br>
	</div>
	<Content v-else colorStyle="red" collapsed>
		必須輸入 1 ~ 3 階遞迴
	</Content>
</template>

<script setup>
import { ref, watch } from "vue";
import { Frac, SolveCubic, makeTermLatex, makeRecurLatex, removePrefix } from "@/libs/RanMath.js";
import Content from "@/components/global/Content.vue"; // 內容區塊的組件

const props = defineProps({
	recurCoef: { type: Array, default: [] }, // 齊次部分的係數, length 代表遞迴階數
	nonHomoFunc: { type: Object, default: {} }, // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 { "k,b.n/b.d": c , ... }
	initConst: { type: Array, default: [] }, // 遞迴的初始條件, 會保持與 recurCoef 的大小相同
});

const cubic = ref(null); // 三次特徵方程式的解
const multiRootNum = ref(1); // 最高重根數
const frac_multiRoot = ref(null); // 重根的值 , 若不存在則為 null
const multiRootHomogLatex = ref("?"); // h_1 b^n + h_2 n b^n + h_3 n^2 b^n

watch(() => props.recurCoef, (newRecurCoef) => { // 齊次係數改變時, 更新三次式的解
	let coef = [...newRecurCoef];
	while (coef.length < 3) coef.push(new Frac(0)); // 0, 1, 2 階遞迴要解三次特徵方程式需要補足係數
	cubic.value = new SolveCubic(new Frac(1), coef[0].muli(-1), coef[1].muli(-1), coef[2].muli(-1)); // t^3 - r1t^2 - r2t - r3 = 0
	
	const dRoot = cubic.value.getDoubleRoot(); // 二重根的值
	const tRoot = cubic.value.getTripleRoot(); // 三重根的值
	multiRootNum.value = dRoot ? (tRoot ? 3 : 2) : 1; // 最高重根數
	frac_multiRoot.value = dRoot; // 三重根的值 = 二重根, 所以直接用 dRoot
	const exp = dRoot ? makeTermLatex(1, dRoot, "n", false) : "?"; // b^n 的 latex
	if (tRoot) multiRootHomogLatex.value = `h_1 ${exp} + h_2 n ${exp} + h_3 n^2 ${exp}`; // h_1 b^n + h_2 n b^n + h_3 n^2 b^n
	else if (dRoot) multiRootHomogLatex.value = `h_1 ${exp} + h_2 n ${exp}`; // h_1 b^n + h_2 n b^n
	else multiRootHomogLatex.value = "?";
});

// 以下的 func 不存在 write

const makeRecurHomogLatex = () => { // 遞迴的齊次部分 (latex 字串)
	let s_latex = "";
	
	for (const [i, frac_coef] of props.recurCoef.entries()) { // 生成齊次部分: r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}
		const s_term = makeTermLatex(frac_coef, `a_{n-${i+1}}`, 1);
		if (s_term !== "+0") s_latex += s_term; // 只顯示係數 r_i 不為 0 的項
	}
	
	if (s_latex === "") s_latex = "0"; // 如果齊次與非齊次部分沒有任何一項, 顯示 "0"
	s_latex = `a_n = ${removePrefix(s_latex, "+")}`; // 在開頭加上 "a_n =", 此時 latex 字串為: "a_n = 齊次部分 + 非齊次部分"
	
	return s_latex;
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

const makeCharLatex = () => { // 特徵值 t (latex 字串)
	if (cubic.value === null) return "~?"; // 遞迴尚未載入
	
	if (props.recurCoef.length == 1) return props.recurCoef[0].toLatex(); // 一次方程式的解
	if (props.recurCoef.length == 2) return cubic.value.quad.toLatex(); // 二次方程式的解
	return cubic.value.toLatex(); // 三次方程式的解
};

const showNoRationalRoot = () => { // 是否要顯示 "不存在有理數根"
	return cubic.value?.frac_r1 === undefined; // TYPE_3FRAC 和 TYPE_FRAC_QUAD 型態才存在有理數根
};

const makeExpLatex = (c, frac_b) => { // 生成 c b^n 形式的 latex
	let s_latex = makeTermLatex(c, frac_b, "n");
	if (s_latex === "+0") return "";
	return s_latex;
}

const makeHomogFormLatex = () => { // 齊次解的形式 (latex 字串)
	const sc = cubic.value;
	if (!sc) return "~?";
	
	const type = sc.solutionType(); // 三次式的解形式
	const mRootNum = multiRootNum.value; // 重根個數
	const frac_mRoot = frac_multiRoot.value; // 重根的值
	const mRootHomogLatex = multiRootHomogLatex.value
	
	if (type === SolveCubic.TYPE_3FRAC) { // 解形式為: frac_r1 , frac_r2 , frac_r3
		if (mRootNum == 3) return mRootHomogLatex; // 三重根先判定, 因為三重根包含二重根
		if (mRootNum == 2) {
			for (const frac_r of [sc.frac_r1, sc.frac_r2, sc.frac_r3]) if (!frac_r.equal(frac_mRoot)) {
				return mRootHomogLatex + makeExpLatex("h_3 ", frac_r); // 二重根 + 剩餘根 (如果為 0 會不顯示)
			}
		}
		if (mRootNum == 1) {
			let roots = [sc.frac_r1, sc.frac_r2, sc.frac_r3]; // 三個根
			roots = roots.filter(frac => !frac.isZero()); // 刪除為 0 的根
			let s_latex = roots.map((frac, i) => makeExpLatex(`h_${i+1} `, frac)).join(""); // 轉為 latex, 並連結起來
			return removePrefix(s_latex, "+"); // 去除開頭多餘的 +
		}
		return "~?";
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
	
	return "~?";
};
</script>
