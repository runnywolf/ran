<template>
	<div class="ts-wrap is-vertical">
		<div>
			<vue-latex expression="x_1 + x_2 + x_3 + x_4 \le 7,~ x_i \ge 0"></vue-latex><br>
			等價於
			<vue-latex expression="x_1 + x_2 + x_3 + x_4 + x_5 = 7,~ x_i \ge 0"></vue-latex><br>
			<vue-latex expression="x_i"></vue-latex>
			為非負整數解的組合數為
			<vue-latex expression="H^{5}_{7} = \binom{7+5-1}{7} = \binom{11}{7} = 330"></vue-latex><br>
		</div>
		<div>
			Ans: (B)
		</div>
	</div>
</template>
