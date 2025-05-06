<template>
	<MultiOption :optionNames="['A', 'B']">
		<template #A>
			因為 <vl exp="f, g \in V = P_3(x)" />，<br>
			所以設 <vl exp="f(x) = a_0 + a_1 x + a_2 x^2 + a_3 x^3 ~,~ g(x) = b_0 + b_1 x + b_2 x^2 + b_3 x^3" />，<br>
			則內積<br>
			<vl c exp="
				\begin{split}
				\langle f, g \rangle &= \int_{-1}^{1} f(x) g(x) dx \\
				&= \int_{-1}^{1} (a_0 + a_1 x + a_2 x^2 + a_3 x^3)(b_0 + b_1 x + b_2 x^2 + b_3 x^3) dx
				\end{split}
			" />
			<br>
			若 <vl exp="h(x)" /> 為奇函數，則 <vl exp="\int_{-1}^{1} h(x) = 0" />，因此可以忽略
			<vl exp="f(x)g(x)" /> 之中的奇次項：
			<vl c exp="\int_{-1}^{1} \left[ a_0 b_0 + (a_2 b_0 + a_1 b_1 + a_0 b_2) x^2 + (a_3 b_1 + a_2 b_2 + a_1 b_3) x^4 + a_3 b_3 x^6 \right] dx" />
			<br>
			處理定積分：
			<vl c exp="
				\begin{split}
				&= \left. a_0 b_0 x \right|_{-1}^{1}
				+ \left. (a_2 b_0 + a_1 b_1 + a_0 b_2) \frac{1}{3} x^3 \right|_{-1}^{1}
				+ \left. (a_3 b_1 + a_2 b_2 + a_1 b_3) \frac{1}{5} x^5 \right|_{-1}^{1}
				+ \left. a_3 b_3 \frac{1}{7} x^7 \right|_{-1}^{1} \\
				&= 2 a_0 b_0 + \frac{2}{3} (a_2 b_0 + a_1 b_1 + a_0 b_2) + \frac{2}{5} (a_3 b_1 + a_2 b_2 + a_1 b_3) + \frac{2}{7} a_3 b_3
				\end{split}
			" />
			<br>
			<vl exp="f" /> 與 <vl exp="g" /> 在基底 <vl exp="\{ 1, x, x^2, x^3 \}" /> 下的向量為
			<vl exp="\!\begin{bmatrix} a_0 & a_1 & a_2 & a_3 \end{bmatrix}\!^T" />
			和 <vl exp="\!\begin{bmatrix} b_0 & b_1 & b_2 & b_3 \end{bmatrix}\!^T" />，<br>
			所以將上式轉為矩陣形式：<br>
			<vl c exp="
				\!\begin{bmatrix} a_0 & a_1 & a_2 & a_3 \end{bmatrix}\!
				\!\begin{bmatrix}
				2 & 0 & \frac{2}{3} & 0 \\
				0 & \frac{2}{3} & 0 & \frac{2}{5} \\
				\frac{2}{3} & 0 & \frac{2}{5} & 0 \\
				0 & \frac{2}{5} & 0 & \frac{2}{7}
				\end{bmatrix}\!
				\!\begin{bmatrix} b_0 \\ b_1 \\ b_2 \\ b_3 \end{bmatrix}\!
				= [f]^T A [g] = \langle f, g \rangle
			" />
			得到矩陣 <vl exp="A" /> 為
			<vl c exp="
				\!\begin{bmatrix}
				2 & 0 & \frac{2}{3} & 0 \\
				0 & \frac{2}{3} & 0 & \frac{2}{5} \\
				\frac{2}{3} & 0 & \frac{2}{5} & 0 \\
				0 & \frac{2}{5} & 0 & \frac{2}{7}
				\end{bmatrix}\!
			" />
		</template>
		<template #B>
			「<vl exp="x^5" /> 在 <vl exp="x^3 - \frac{3}{5} x" />
			上的傅立葉係數 」，我覺得應該指的是：<br>
			在內積空間 <vl exp="V" /> 之中，將 <vl exp="x^5" /> 投影到 <vl exp="x^3 - \frac{3}{5} x" /> 上的投影係數。<br>
			投影係數為：
			<vl c exp="
				\begin{split}
				\frac{\langle g, f \rangle}{\langle f, f \rangle}
				&= \frac{ \langle x^5 ~,~ x^3 - \frac{3}{5} x \rangle }{ \langle x^3 - \frac{3}{5} x ~,~ x^3 - \frac{3}{5} x \rangle } \\
				&= \frac{ \int_{-1}^{1} x^5 (x^3 - \frac{3}{5} x) dx }{ \int_{-1}^{1} {(x^3 - \frac{3}{5} x)}^2 dx } \\
				&= \frac{ \int_{-1}^{1} (x^8 - \frac{3}{5} x^6) dx }{ \int_{-1}^{1} (x^6 - \frac{6}{5} x^4 + \frac{9}{25} x^2) dx } \\
				&= \frac{ \left. \frac{1}{9} x^9 \right|_{-1}^{1} - \left. \frac{3}{5} ( \frac{1}{7} x^7 ) \right|_{-1}^{1} }
				{ \left. \frac{1}{7} x^7 \right|_{-1}^{1} - \left. \frac{6}{5} ( \frac{1}{5} x^5 ) \right|_{-1}^{1} + \left. \frac{9}{25} (\frac{1}{3} x^3) \right|_{-1}^{1} } \\
				&= \frac{ \frac{1}{9} - \frac{3}{35} }{ \frac{1}{7} - \frac{6}{25} + \frac{3}{25} } \cdot 2 \\
				&= \frac{20}{9}
				\end{split}
			" />
		</template>
	</MultiOption>
</template>
