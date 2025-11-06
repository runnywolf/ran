<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Analyze the time complexity of the following procedure P. Suppose P, Q, and R are all procedures.
			Q will take $\sqrt{m}$ steps to process a length‑$\!m$ array into 4 length‑$\!m/4$ arrays
			$B_1, B_2, B_3, B_4$; R will take $2\sqrt{m}$ steps to merge 2 size $m$ arrays,
			where $m$ is the size of input arrays. Each statement line in and outside the loop counts 1 step.
			<div class="ts-wrap is-center-aligned" style="margin: 20px 0;">
				<span class="ran-code-font">
					Procedure P( A[$a_1, a_2, \cdots\!, a_n$] ) // B1, ..., B4 are initially empty arrays.<br>
					1. if (n < 4) exit;<br>
					2. call Q(A); // and get B1, B2, ...<br>
					3. call P(B1);<br>
					4. call P(B4);<br>
					5. call R(B1, B4);<br>
					6. return;
				</span>
			</div>
			Suppose $n$ is a number of power of 4, What of the following options are true about the number of
			steps $p(n)$ and complexity $C_p$ of the procedure P in the question above? ($C,D$ are constants)
		</template>
		<template #A>$p(n) = 2p(n/4) + Cn^{1/2} + D$</template>
		<template #B>$p(n) = 4p(n/4) + Cn^{1/4} + D$</template>
		<template #C>$C_p = \Theta (n \log n)$</template>
		<template #D>$C_p = \Theta (\sqrt{n} \log n)$</template>
		<template #E>$C_p = \Theta (\sqrt{n})$</template>
	</MakeProblem>
</template>
