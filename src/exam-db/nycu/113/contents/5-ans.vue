<template>
	<vk>
		注意：哈斯圖的邊的箭頭都是往上指 ( 兩端點中，偏序關係較大的端點總是在上方 )，我懶得畫圖說明。<br>
		這個性質與拓樸排序總是向右指，有相似性，只是拓樸排序是一維序列。
		<div class="ts-divider" style="margin-top: 6px;"></div>
		<MultiOption :optionNames="[ 'a', 'b' ]">
			<template #a>
				把哈斯圖壓縮成一維的拓樸排序，使箭頭都向上指，可以發現 $e, g, h, f$ 只能在 $i$ 之下交錯排列，組合數為
				$$\binom{4}{2} = \boxed{6}$$
			</template>
			<template #b>
				這個問題與 <RanLink to="https://en.wikipedia.org/wiki/Hook_length_formula#Examples">Hook length formula</RanLink>
				等價，圖 (a) 的組合數為 $f^{(3, 1, 1)}$，圖 (b) 的組合數為
				$$
				f^{(3, 3, 3)} = \frac{9!}{5 \cdot 4 \cdot 4 \cdot 3 \cdot 3 \cdot 3 \cdot 2 \cdot 2 \cdot 1}
				= 9! \cdot \frac{0! ~ 1! ~ 2!}{5! ~ 4! ~ 3!} = \boxed{42}
				$$
				<br>
				我第一次寫是這樣分割得到答案的，並不知道這個公式：
				$$
				\begin{split}
				f^{(3, 3, 3)} &= f^{(3, 3, 2)} \\ &= 2 f^{(3, 3, 1)} \\ &= 2 (f^{(3, 3)} + f^{(3, 2, 1)}) \\
				&= 2 (f^{(3, 3)} + f^{(2, 2, 1)} + f^{(3, 1, 1)} + f^{(3, 2)}) \\
				&= 2 (f^{(3, 3)} + f^{(2, 2, 2)} + f^{(3, 1, 1)} + f^{(3, 3)}) \\
				&= 2 (f^{(3, 3)} + f^{(3, 3)} + f^{(3, 1, 1)} + f^{(3, 3)}) \\
				&= 2 (3 f^{(3, 3)} + f^{(3, 1, 1)}) \\
				&= 2 (3 f^{(3, 1)} + 3 f^{(2, 2)} + f^{(3, 1, 1)}) \\
				&= 2 (3 \binom{3}{1} + 3 \cdot 2 + \binom{4}{2}) \\
				&= 42
				\end{split}
				$$
				想法來源於拓樸排序 bfs 爆搜，但我沒有真的爆搜。<br>
				化簡過程的說明太麻煩，故省略。
			</template>
		</MultiOption>
	</vk>
</template>
