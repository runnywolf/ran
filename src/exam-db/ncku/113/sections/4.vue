<template>
	<MakeProblem scoreText="(13 points)">
		<template #problem>
			Design a finite state machine $M = (S, \varphi, \sigma, v, \omega)$, where
			$S = \{S_1, S_2, S_3, S_4\}$, $\varphi = \{0, 1, 2\}$, $\sigma = \{0, 1\}$.
			The machine outputs 1 if the input string contains at least three 1s, otherwise it outputs 0.
			<span class="ran-app-font">(請填問號應有的內容)</span>
			<div class="ts-wrap is-center-aligned is-relaxed" style="margin: 10px 0">
				<img src="./img/4.webp">
			</div>
		</template>
	</MakeProblem>
</template>
<!-- [fix problem error] 圖片是大寫 S_n, 將題目內容 "s_n" 改為 "S_n" -->
