<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			We want to analyze the time complexity of the procedure $P$ with the listed pseudo‑code.
			Suppose procedure $Q$ take $\Theta(\sqrt{m})$ time to divide an array into three equal size sub‑arrays,
			where $m$ is the size of input; each statement line counts 1 step.
			<div class="ts-wrap is-center-aligned" style="margin: 20px 0;">
				<span class="ran-code-font">
					Procedure P( A[$a_1, a_2, \cdots\!, a_n$] ) // B1, B2, B3 are initially empty arrays.<br>
					1. if (n < 3) exit;<br>
					2. else call Q(A); // and get B1, B2, B3, each is size of n/3<br>
					3. call P(B1);<br>
					4. call P(B3);<br>
					5. return;
				</span>
			</div>
			Suppose the size of input array, $n$, is a number of power of 3,
			What of the following options are true about the number of steps $p(n)$ and
			complexity function $f_p$ of the procedure $P$ in the question above?
			($c_i$ are constants in the following equations)
		</template>
		<template #A>$p(n) = p(n/3) + c_1n^2 + c_2$</template>
		<template #B>$p(n) = 2p(n/3) + c_1n^{1/2} + c_2$</template>
		<template #C>$f_p = O(n^{1/2})$</template>
		<template #D>$f_p = O(n^{1/2}\log n)$</template>
		<template #E>$f_p = \Theta(n^{\log_3 2})$</template>
	</MakeProblem>
</template>
