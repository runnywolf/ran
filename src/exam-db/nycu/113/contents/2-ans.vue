<template>
	<vk>
		<MultiOption :optionNames="[ 'a', 'b' ]">
			<template #a>
				$$f(n) = \sum\limits_{t=1}^{n} t^2 = \frac{n(n+1)(2n+1)}{6}$$
				$$f(f(n)) = \frac{k(k+1)(2k+1)}{6} ~,~~ k = \frac{n(n+1)(2n+1)}{6}$$
				我懶得乘開。
			</template>
			<template #b>
				若 $a \gt 2009$，則 $\sqrt{b} \lt \sqrt{2009} - \sqrt{a} = 0$，違反題意，所以 $0 \le a \le 2009$。<br>
				同理，$0 \le b \le 2009$，因此
				$$ \sqrt{a} + \sqrt{b} = \sqrt{2009} = 7 \sqrt{41} \quad,\quad 0 \le a, b \le 7^2 \cdot 41 $$
				因為 $a, b$ 是非負整數，所以 $a, b \in \{ 41k^2 \mid k \in \mathbb{Z},~ 0 \le k \le 7 \}$，<br>
				這樣開平方後才會等於 $\sqrt{41}$ 的非負整數倍，設
				$$ \boxed{ (a, b) = (41k^2 ,~ 41(7-k)^2) ~,~~ k = 0, \cdots\!, 7 } $$
				滿足
				$$
				\begin{split}
				\sqrt{a} + \sqrt{b} &= \sqrt{41k^2} + \sqrt{41(7-k)^2} \\
				&= k \sqrt{41} + (7-k) \sqrt{41} \\
				&= 7 \sqrt{41}
				\end{split}
				$$
			</template>
		</MultiOption>
	</vk>
</template>
