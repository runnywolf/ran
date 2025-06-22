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
	因此特解的形式為：<br>
	<vl c :exp="nonHomog.mlNewParticularForm()" />
	將 <vl exp="a_n^{(p)}" /> 代入原遞迴關係： ( 將 <vl exp="a_n" /> 替換為 <vl exp="a_n^{(p)}" /> 即可，不要將形式代入 )<br>
	<vl c :exp="nonHomog.mlParticularIntoRecur()" />
	移項後得到： ( 式 1 )<br>
	<vl c :exp="nonHomog.mlParticularIntoRecurTrans()" />
	其中<br>
	<vl c :exp="nonHomog.mlParticularIntoRecurWhere()" />
	接下來需要對每個指數項 <vl exp="{b_i}^n" /> 對應的多項式，分別求未知係數 <vl exp="p_j" />：<br>
	<div class="ts-box" style="margin: 12px 0;">
		<template v-for="s_frac_b in Object.keys(nonHomog.combinedExpFunc)">
			<div class="ts-content is-dense">
				<details class="ts-accordion">
					<summary>指數項&nbsp;<vl :exp="SolveNonHomog.mlExponential(s_frac_b)" />&nbsp;的部分</summary>
					<RecurNonHomogExp :nonHomogExp="nonHomog.dict_nonHomogExp[s_frac_b]"></RecurNonHomogExp>
				</details>
			</div>
			<div v-if="nonHomog.pjIndex[s_frac_b].at(-1) !== nonHomog.pjNum" class="ts-divider"></div><!-- 分隔線 -->
		</template>
	</div>
	將 <vl exp="p_j" /> 代回 <vl exp="a_n^{(p)}" />，得到特解為<br>
</template>

<script setup>
import { SolveNonHomog } from './Recur';
import RecurNonHomogExp from './RecurNonHomogExp.vue';

const props = defineProps({ nonHomog: SolveNonHomog });
</script>
