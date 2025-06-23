<template>
	計算 <vl exp="a_n^{(p)}" /> 之中，指數項 <vl :exp="nonHomogExp.mlExp()" />
	對應的 {{ nonHomogExp.pjNum }} 個未知係數 <vl :exp="nonHomogExp.mlUnknownPj()" />，<br>
	需要將 <vl :exp="nonHomogExp.mlNRange()" /> 代入式 (1)，產生 {{ nonHomogExp.pjNum }} 個式子的線性方程組，並解聯立：<br>
	<vl c :exp="nonHomogExp.mlParticularLinearEquations()" />
	其中 <vl :exp="nonHomogExp.mlExpTermInNonHomog()" />，<br>
	<vl :exp="nonHomogExp.mlExpTermInParticular()" />，代入常數後得到：
	<vl c :exp="nonHomogExp.mlPjLinearEquationsFromAnp()" />
	展開後得到：
	<vl c :exp="nonHomogExp.mlPjLinearEquations()" />
	使用高斯消去法解 <vl exp="p_j" /> 的聯立方程式，得到：
	<vl c :exp="nonHomogExp.mlPjAnswer()" />
</template>

<script setup>
import { SolveNonHomogExp } from './Recur';

const props = defineProps({ nonHomogExp: SolveNonHomogExp });
</script>
