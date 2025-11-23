<template>
	<vk>
		本題重點整理：
		<div class="ts-list is-unordered">
			<div class="item">$x$ 是一個長度為 $8$ 或 $12$ 的 bit string。</div>
			<div class="item">$v(s_0, x) = s_0$ 表示 $x$ 的多個位元輸入後，狀態仍停在 $s_0$。</div>
			<div class="item">將 $x$ 的 bit char 依序輸入 FSM，只有位元 $1$ 會切換到下一個狀態。</div>
		</div>
		<br>
		只要某個字串 $x$ 的字元 $1$ 的個數能被 $4$ 整除 (繞一圈回到狀態 $s_0$)，那麼 $x$ 就滿足 $v(s_0, x) = s_0$。<br>
		<br>
		所以題 (I) 的相異字串個數為 $\binom{8}{0} + \binom{8}{4} + \binom{8}{8} = 72$，答案為 (a)。<br>
		<br>
		題 (II) 的相異字串個數為 $\binom{12}{0} + \binom{12}{4} + \binom{12}{8} + \binom{12}{12} = 992$，答案為 (b)。<br>
	</vk>
</template>
