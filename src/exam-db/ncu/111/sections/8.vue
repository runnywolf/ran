<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Consider a general recursive mechanism $R$, whose input is an array $A$ initially with $n$ elements.
			The pseudo code of $R$ is listed below, It takes a parameter $k$,
			use $\sqrt{n}$ ($n$ is the size of $A$ when applied, $n$ may change) steps to partition $A$,
			and may call another function Q, whose complexity may vary and depends on the size of its input.
			<div class="ts-wrap is-center-aligned" style="margin: 20px 0;">
				<span class="ran-code-font">
					Procedure R(A, k) // array A with size n, int k<br>
					1. if (n < k) exit;<br>
					2. partition A into k equal size parts $A_1, A_2, \cdots\!, A_k$; // This takes $\sqrt{n}$ steps<br>
					3. for (i = 1 to k) call R($A_i$, k); // may change $A_i$<br>
					4. merge $A_1, A_2, \cdots\!, A_k$ into new A with size n; // This takes k steps<br>
					5. call Q(A);<br>
					6. return;
				</span>
			</div>
			There are 3 derived algorithms X, Y, Z, based on $R$.<br>
			X sets $k$ as 2, and its Q’s complexity is $\Theta(m)$, $m$ is the size of Q’s input.<br>
			Y sets $k$ as 4, and its Q’s complexity is $\Theta(\sqrt{m})$, $m$ is input size.<br>
			Z sets $k$ as 9, and its Q’s complexity is $\Theta(m)$, $m$ is input size.<br>
			What following comparisons are true?
		</template>
		<template #A>X’s complexity is better than Y and Z.</template>
		<template #B>Y’s complexity is better than X and Z.</template>
		<template #C>X and Y’s complexities are the same.</template>
		<template #D>X and Z’s complexities are the same.</template>
		<template #E>X’s complexity is $\Theta(n \log n)$.</template>
	</MakeProblem>
</template>
<!-- [fix problem error] 第三行的 A_k -> A_i -->
