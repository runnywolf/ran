<template>
	對稱矩陣排除對角線，上三角與下三角的元素是一一對應的，所以自由度會減少
	<vl exp="1 + 2 + \cdots + (n-1)" />：
	<vl c exp="
		\begin{split}
		d_S &= n^2 - \sum\limits_{i=1}^{n-1} i \\
		&= n^2 - \frac{n(n-1)}{2} \\
		&= \frac{n(n+1)}{2}
		\end{split}
	" />
	<br>
	對角矩陣中，只有對角線元素不一定為 <vl exp="0" />，所以自由度為：
	<vl c exp="d_D = n" />
	<br>
	令正交矩陣
	<vl exp="
		Q = \!\begin{bmatrix} q_1 & q_2 & \cdots & q_n \end{bmatrix}\! ~,~
		q_i \in \R^n
	" />
	，則：<br>
	<div class="ts-list is-unordered" style="padding-left: 6px; padding-bottom: 8px;">
		<div class="item">
			<vl exp="q_1" /> 的自由度為 <vl exp="n" />
		</div>
		<div class="item">
			<vl exp="q_2" /> 為了與 <vl exp="q_1" /> 正交，自由度為 <vl exp="n-1" />
		</div>
		<div class="item">
			<vl exp="q_3" /> 為了與 <vl exp="q_1, q_2" /> 正交，自由度為 <vl exp="n-2" />
		</div>
		<div class="item">
			&nbsp;...
		</div>
		<div class="item">
			<vl exp="q_n" /> 為了與 <vl exp="q_1, q_2, \,\cdots, q_{n-1}" /> 正交，自由度為 <vl exp="n-(n-1) = 1" />
		</div>
	</div>
	並且 <vl exp="n" /> 個兩兩正交的向量需要單範化才能形成正交矩陣，自由度會減少 <vl exp="n" />：
	<vl c exp="
		\begin{split}
		d_Q &= \sum\limits_{i=1}^{n} i - n \\
		&= \frac{n(n+1)}{2} - n \\
		&= \frac{n(n-1)}{2}
		\end{split}
	" />
	計算答案的值：
	<vl c exp="d_S - d_D - d_Q = \frac{n(n+1)}{2} - n - \frac{n(n-1)}{2} = 0" />
	Ans: (A)
</template>
