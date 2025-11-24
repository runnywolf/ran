<template>
	<vk>
		令 $H(x)$ 為這三個序列的生成函數。
		<MultiOption :optionNames="['A', 'B', 'C']">
			<template #A>
				$$ \begin{split}
				H(x) &= 3a_0 + 3a_1 x + 3a_2 x^2 + 3a_3 x^3 + \cdots \\
				&= 3(a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \cdots) \\
				&= 3 \sum\limits_{k=0}^{\infty} a_k x^k \\
				&= \boxed{ 3G(x) }
				\end{split} $$
			</template>
			<template #B>
				$$ \begin{split}
				H(x) &= 0 + 0x + 0x^2 + 0x^3 + a_2 x^4 + a_3 x^5 + \cdots \\
				&= x^2 (a_2 x^2 + a_3 x^3 + \cdots) \\
				&= x^2 (-a_0 - a_1 x + a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \cdots) \\
				&= x^2 @(){ -a_0 - a_1 x + \sum\limits_{k=0}^{\infty} a_k x^k } \\
				&= \boxed{ x^2 \Big( {-a_0} - a_1 x + G(x) \Big) }
				\end{split} $$
			</template>
			<template #C>
				注意到
				$$ \begin{split}
				\boxed{ @f{d;dx} \, G(x) } &= @f{d;dx} \sum\limits_{k=0}^{\infty} a_k x^k \\
				&= @f{d;dx} (a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \cdots) \\
				&= a_1 + 2a_2 x + 3a_3 x^2 + \cdots \\
				&= H(x)
				\end{split} $$
			</template>
		</MultiOption>
	</vk>
</template>
