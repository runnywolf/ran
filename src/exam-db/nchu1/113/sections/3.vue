<template>
	<MakeProblem scoreText="(5%)">
		<template #problem>
			Given $n$ sets $A_1,A_2,\cdots\!,A_n$, where $A_1=\{\varnothing,\{\varnothing\}\}$, and
			$A_n=\{\varnothing,A_{n-1},\{A_{n-1}\}\}$, what is the result of
			$$ \begin{gather*}
			|{A_1}^2|+|{A_2}^2|+\cdots+|{A_n}^2| \\
			{}+|\mathcal{P}(A_1)|+|\mathcal{P}(A_2)|+\cdots+|\mathcal{P}(A_n)| \\
			{}+|A_2-A_1|+|A_3-A_2|+\cdots+|A_n-A_{n-1}|
			\end{gather*} $$
		</template>
	</MakeProblem>
</template>
