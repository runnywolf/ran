<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			To analyze the complexity of the following procedure P, We will use the following assumptions:
			Suppose P and B are both procedures. B take $\Theta(\sqrt{m})$ time to compute,
			where $m$ is the size of B’s input; each statement line in and outside the loop counts 1 step.
<CodeBlock topMargin bottomMargin><pre>
Procedure P(array1[$a_1, a_2, \cdots\!, a_n$])
1. if (n < 9) exit;
2. call B(array1[$a_1, a_2, \cdots\!, a_n$]);
   declare new empty array2, array3, array4;
3. for (i = 1 to n) {
4.   if ((i mod 9) = 0) insert $a_i$ into array2;
5.   if ((i mod 9) = 3) insert $a_i$ into array3;
6.   if ((i mod 9) = 6) insert $a_i$ into array4;
7. }
8. call P(array2);
9. call P(array3);
10. call P(array4);
</pre></CodeBlock>
			Which of the following relations on $F_n$ can describe the complexity of procedure P
			with respect to problem size $n$?
		</template>
		<template #A>$F_n = 3F_{n/3} + \Theta(\sqrt{n})$</template>
		<template #B>$F_n = 3F_{n/3} + F_n + \Theta(n)$</template>
		<template #C>$F_n = 9F_{n/9} + \Theta(\sqrt{n})$</template>
		<template #D>$F_n = 3F_{n/9} + \Theta(n)$</template>
		<template #E>$F_n = 3F_{n/9} + \Theta(n^{1/2})$</template>
	</MakeProblem>
</template>
