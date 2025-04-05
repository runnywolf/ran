<template>
	<div v-if="1 <= recurCoef.length && recurCoef.length <= 3"><!-- 必須為 1 ~ 3 階遞迴 -->
		遞迴關係式和初始條件為
		<vl c :exp="makeRecurLatex(recurCoef, nonHomoFunc, initConst)" />
		
		<span class="ts-text is-large is-bold">Step1：求齊次解形式</span><br>
		遞迴的齊次部分為 <vl :exp="makeHomogLatex(recurCoef)" /><br>
		<vl exp="\Rightarrow" /> 特徵方程式為 <vl :exp="makeCharPolyLatex(recurCoef)" /><br>
		<vl :exp="`\\Rightarrow ~ t = ${makeCharLatex(recurCoef, cubic)}`" />
		<span style="color: #eb0; margin-left: 12px;">
			<span class="ts-icon is-circle-exclamation-icon"></span>
			不存在整數形式的根
		</span><br>
	</div>
	<Content v-else colorStyle="red" collapsed>
		必須輸入 1 ~ 3 階遞迴
	</Content>
</template>

<script setup>
import { ref, watch } from "vue";
import { Frac, SolveCubic, makeTermLatex, makeRecurLatex } from "@/libs/RanMath.js";
import Content from "@/components/global/Content.vue"; // 內容區塊的組件

const props = defineProps({
	recurCoef: { type: Array, default: [] }, // 齊次部分的係數, length 代表遞迴階數
	nonHomoFunc: { type: Object, default: {} }, // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 { "k,b.n/b.d": c , ... }
	initConst: { type: Array, default: [] }, // 遞迴的初始條件, 會保持與 recurCoef 的大小相同
});

const cubic = ref(null); // 三次特徵方程式的解

watch(() => props.recurCoef, (newRecurCoef) => { // 齊次係數改變時, 更新三次式的解
	let coef = [...newRecurCoef];
	while (coef.length < 3) coef.push(new Frac(0)); // 0, 1, 2 階遞迴要解三次特徵方程式需要補足係數
	cubic.value = new SolveCubic(new Frac(1), coef[0].muli(-1), coef[1].muli(-1), coef[2].muli(-1)); // t^3 - r1t^2 - r2t - r3 = 0
});

const makeHomogLatex = (recurCoef = []) => { // 遞迴的齊次部分 (latex 字串)
	let s_latex = "";
	
	for (const [i, frac_coef] of recurCoef.entries()) { // 生成齊次部分: r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}
		const s_term = makeTermLatex(frac_coef, `a_{n-${i+1}}`, 1);
		if (s_term !== "+0") s_latex += s_term; // 只顯示係數 r_i 不為 0 的項
	}
	
	if (s_latex === "") s_latex = "0"; // 如果齊次與非齊次部分沒有任何一項, 顯示 "0"
	if (s_latex[0] === "+") s_latex = s_latex.slice(1); // 去掉開頭的 +
	s_latex = `a_n = ${s_latex}`; // 在開頭加上 "a_n =", 此時 latex 字串為: "a_n = 齊次部分 + 非齊次部分"
	
	return s_latex;
};

const makeCharPolyLatex = (recurCoef = []) => { // 特徵方程式 (latex 字串)
	let s_latex = "";
	let l = recurCoef.length;
	
	for (const [i, frac_coef] of recurCoef.entries()) {
		const s_term = makeTermLatex(frac_coef, "t", l-i-1);
		if (s_term !== "+0") s_latex += s_term;
	}
	
	if (s_latex === "") s_latex = "0";
	if (s_latex[0] === "+") s_latex = s_latex.slice(1);
	s_latex = `${makeTermLatex("", "t", l, false)} = ${s_latex}`;
	
	return s_latex;
};

const makeCharLatex = (recurCoef, cubic) => { // 特徵值 t (latex 字串)
	if (cubic === null) return "?"; // 遞迴尚未載入
	
	if (recurCoef.length == 1) return recurCoef[0].toLatex(); // 一次方程式的解
	if (recurCoef.length == 2) return cubic.quad.toLatex(); // 二次方程式的解
	return cubic.toLatex(); // 三次方程式的解
};
</script>
