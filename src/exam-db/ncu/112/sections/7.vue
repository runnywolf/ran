<template>
	<MakeProblem scoreText="">
		<template #problem>
			"To analyze the complexity of the following procedure $P$, We will use the following assumptions:
			Suppose $P$ and $B$ are both procedures. $B$ take $\theta(\sqrt{m})$ time to compute, where $m$ is the size of $B$'s input; each statement line in and outside the loop counts 1 step.
			**Procedure** $P(array1[a_1,a_2,...,a_n])$
			1. if $n<9$ exit.
			2. call $B(array1[a_1,a_2,...,a_n])$
			declare new empty array2, array3, array4;
			3. for (i=1 to n)
			4. {if ((i mod 9)=0) insert $a_i$ into array2;
			5. if ((i mod 9)=3) insert $a_i$ into array3;
			6. if ((i mod 9)=6) insert $a_i$ into array4 }
			8. call $P(array2);$
			9. call $P(array3);$
			10. call $P(array4);$
			Which of the following relations on $F_n$ can describe the complexity of procedure $P$ with respect to problem size $n$?
			A) $$F_n = 3F_{n/3} + \theta(\sqrt{n})$$
			B) $$F_n = 3F_{n/3} + F_n + \theta(n)$$
			C) $$F_n = 9F_{n/9} + \theta(\sqrt{n})$$
			D) $$F_n = 3F_{n/9} + \theta(n)$$
			E) $$F_n = 3F_{n/9} + \theta(n^{1/2})$$"
		</template>
	</MakeProblem>
</template>
