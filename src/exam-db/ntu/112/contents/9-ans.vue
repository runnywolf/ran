<template>
	<vk>
		對稱矩陣排除對角線，上三角與下三角的元素是一一對應的，所以自由度會減少 $1 + 2 + \cdots + (n-1)$：
		$$
		\begin{split}
		d_S &= n^2 - \sum\limits_{i=1}^{n-1} i \\
		&= n^2 - \frac{n(n-1)}{2} \\
		&= \frac{n(n+1)}{2}
		\end{split}
		$$
		<br>
		對角矩陣中，只有對角線元素不一定為 $0$，所以自由度為：
		$$d_D = n$$
		<br>
		令正交矩陣 $ Q = \!\begin{bmatrix} q_1 & q_2 & \cdots & q_n \end{bmatrix}\! ~,~ q_i \in \R^n $，則：<br>
		<div class="ts-list is-unordered" style="padding-left: 6px; padding-bottom: 8px;">
			<div class="item">
				$q_1$ 的自由度為 $n$
			</div>
			<div class="item">
				$q_2$ 為了與 $q_1$ 正交，自由度為 $n-1$
			</div>
			<div class="item">
				$q_3$ 為了與 $q_1, q_2$ 正交，自由度為 $n-2$
			</div>
			<div class="item">
				&nbsp;...
			</div>
			<div class="item">
				$q_n$ 為了與 $q_1, q_2, \,\cdots, q_{n-1}$ 正交，自由度為 $n-(n-1) = 1$
			</div>
		</div>
		並且 $n$ 個兩兩正交的向量需要單範化才能形成正交矩陣，自由度會減少 $n$：
		$$
		\begin{split}
		d_Q &= \sum\limits_{i=1}^{n} i - n \\
		&= \frac{n(n+1)}{2} - n \\
		&= \frac{n(n-1)}{2}
		\end{split}
		$$
		計算答案的值：
		$$d_S - d_D - d_Q = \frac{n(n+1)}{2} - n - \frac{n(n-1)}{2} = 0$$
		Ans: (A)
	</vk>
</template>
