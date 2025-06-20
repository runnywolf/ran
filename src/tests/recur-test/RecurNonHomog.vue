<template>
	合併相同的指數項：
	<vl c :exp="`F(n) = \\sum\\limits_{i} f_i(n) {b_i}^n = ${nonHomog.mlCombinedExpFunc()}`" />
	猜測特解的形式為：
	<vl c :exp="nonHomog.mlParticularForm()" />
	，其中多項式 <vl exp="g_i(n)" /> 的次數應與 <vl exp="f_i(n)" /> 相同。<br>
	<br>
	檢查齊次解 <vl exp="a_n^{(h)}" /> 和特解 <vl exp="a_n^{(p)}" />
	之中是否存在相同的指數部分 <vl exp="{b_i}^n" />：<br>
	<div v-if="nonHomog.existSameBase()">
		由於 <vl :exp="nonHomog.mlSameBaseInHomog()" /> 已出現在 <vl exp="a_n^{(h)}" /> 之中，<br>
		若特解 <vl exp="a_n^{(p)}" /> 也包含同樣項次 <vl :exp="nonHomog.mlSameBaseInParticular()" />
		會導致與齊次解重疊，<br>
		為了保證特解與齊次解的線性獨立性，需要將
		<div class="ts-list is-unordered">
			<div v-for="latex in nonHomog.mlChangeList()" class="item">
				<vl :exp="latex[0]" /> 改為 <vl :exp="latex[1]" />
			</div>
		</div>
	</div>
	<div v-else>
		不存在相同的指數部分。
	</div>
	<div style="height: 12px;"></div>
</template>

<script setup>
import { SolveNonHomog } from './Recur';

const props = defineProps({ nonHomog: SolveNonHomog });
</script>
