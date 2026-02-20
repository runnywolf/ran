<template>
	<vk>
		$f(f(0)) = 1$。令 $f(0) = n$，則 $f(n) = 1$，即
		$$ 0 \overset{f}{\longmapsto} n \overset{f}{\longmapsto} 1 $$
		。因為 $f$ 為嚴格遞增函數，所以
		$$ 0 \lt n \quad\implies\quad f(0) \lt f(n) $$
		，代入 $f(0) = n ,~~ f(n) = 1$ 後得到 $ n \lt 1 $，<br>
		因此 $n$ 必須滿足 $0 \lt n \lt 1$，但這個範圍內沒有任何自然數解，矛盾。<br>
		所以不存在嚴格遞增函數 $f: \mathbb{N} \to \mathbb{N}$ 使得 $f(f(x)) = 2x+1$，故 $f(6)$ 無解。<br>
		<br>
		※ 在 $f: \mathbb{R} \to \mathbb{R}$ 條件下，存在 $f(x) = \sqrt{2}x + (\sqrt{2}-1)$。
	</vk>
</template>
