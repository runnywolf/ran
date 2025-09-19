<template>
	<vk>
		<MultiOption :optionNames="[ 'a', 'b' ]">
			<template #a>
				質數的定義為「 一個大於 1 的整數，其正因數只有 1 和它本身 」，<br>
				整除符號可以用 $x / d * d = x$ 代替，定義一個質數集合：
				$$ P = \{ x \in \mathbb{Z}^+ \mid x \gt 1 ~\land~ \forall d \in \mathbb{Z}^+ ( x/d*d = x ~\to~ d = 1 ~\lor~ d = x ) \} $$
				歌德巴赫猜想：「 任何大於 2 的偶數，都可以表示成兩個質數之和 」，可以表示成：
				$$ \forall n \in \mathbb{Z}^+ \Big( n > 2 ~\land~ n/2*2 = n ~\to~ \exist p_1, p_2 \in P~ (n = p_1 + p_2) \Big) $$
			</template>
			<template #b>
				設 $S_n$ 為長度 $n$ 的位元字串 (包含 5 個連續同位元) 的集合。<br>
				將 $S_n$ 分成兩個互斥集合，將子集的大小加起來，求遞迴式：<br>
				<br>
				1. 在 $S_{n-1}$ 的最左側添加一個位元，形成的 $S_n$ 字串：<br>
				在 $S_{n-1}$ 左側添加 0 或 1 得到的新字串，都一定在 $S_n$ 內，因此這個子集的大小為 $2 |S_{n-1}|$。<br>
				<br>
				2. 在 $\overline{S_{n-1}}$ 的最左側添加一個位元，形成的 $S_n$ 字串：<br>
				若添加 0，只能透過 "[0]0000[1開頭的$\overline{S_{n-5}}$字串]" 這種方法生成 $S_n$ 內的字串，<br>
				保證 "0000[1開頭的$\overline{S_{n-5}}$字串]" $\in \overline{S_{n-1}}$。<br>
				若添加 1，只能透過 "[1]1111[0開頭的$\overline{S_{n-5}}$字串]" 這種方法生成 $S_n$ 內的字串，<br>
				保證 "1111[0開頭的$\overline{S_{n-5}}$字串]" $\in \overline{S_{n-1}}$。<br>
				因此這個子集的大小為 $|\overline{S_{n-5}}| = 2^{n-5} - |S_{n-5}|$。<br>
				<br>
				得到遞迴關係：
				$$
				|S_n| = \begin{cases}
				0 &\text{if}~~ 0 \le n \le 4 \\
				2 &\text{if}~~ n = 5 \\
				2 |S_{n-1}| + (2^{n-5} - |S_{n-5}|) &\text{if}~~ n \ge 6
				\end{cases}
				$$
				根據上式逐步計算 $|S_{10}|$：
				$$
				\begin{split}
				|S_5| &= 2 \\
				|S_6| &= 2 \cdot 2 + 2^1 = 6 \\
				|S_7| &= 2 \cdot 6 + 2^2 = 16 \\
				|S_8| &= 2 \cdot 16 + 2^3 = 40 \\
				|S_9| &= 2 \cdot 40 + 2^4 = 96 \\
				|S_{10}| &= 2 \cdot 96 + 2^5 - 2 = \boxed{222}
				\end{split}
				$$
			</template>
		</MultiOption>
	</vk>
</template>
