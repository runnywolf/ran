<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			To analyze the complexity of the following procedure P, We will use the following assumptions:
			Suppose P and Q are both procedures. Q will take $\Theta(\sqrt[3]{m})$ time to partition a length‑$\!m$
			array into length‑$\!\lfloor m/8 \rfloor$ arrays, $B_1, B_2, \cdots\!, B_8,$ where $m$ is the size of input;
			each statement line in and outside the loop counts 1 step.
			<div class="ts-wrap is-center-aligned" style="margin: 20px 0;">
				<span class="ran-code-font">
					Procedure P( A[$a_1, a_2, \cdots\!, a_n$] )<br>
					// Declare B1, ..., B8 as initially empty arrays<br>
					1. if (n < 8) exit;<br>
					2. call Q(A); // and get B1, B2, ...<br>
					3. call P(B1);<br>
					4. call P(B8);<br>
					5. return;
				</span>
			</div>
			Suppose $n$ is a number of power of 8, What of the following options are true about the number of
			steps $p(n)$ and complexity $C_p$ of the procedure P in the question above?<br>
			($A, B$ are constants)
		</template>
		<template #a>$p(n) = 2p(n/8) + An^{1/3} + B$</template>
		<template #b>$p(n) = 3p(n/8) + An^{1/2} + B$</template>
		<template #c>$C_p = \Theta (n \log n)$</template>
		<template #d>$C_p = \Theta (\sqrt[3]{n} \log n)$</template>
		<template #e>$C_p = \Theta (\sqrt[3]{n})$</template>
	</MakeProblem>
</template>
