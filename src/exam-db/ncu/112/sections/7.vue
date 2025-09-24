<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			To analyze the complexity of the following procedure P, We will use the following assumptions:
			Suppose P and B are both procedures. B take $\Theta(\sqrt{m})$ time to compute,
			where $m$ is the size of B’s input; each statement line in and outside the loop counts 1 step.
			<div class="ts-wrap is-center-aligned" style="margin: 20px 0;">
				<span class="ran-code-font">
					Procedure P(array1[$a_1, a_2, \cdots\!, a_n$])<br>
					1. if (n < 9) exit;<br>
					2. call B(array1[$a_1, a_2, \cdots\!, a_n$]);<br>
					&nbsp; &nbsp;declare new empty array2, array3, array4;<br>
					3. for (i = 1 to n) {<br>
					4. &nbsp; if ((i mod 9) = 0) insert $a_i$ into array2;<br>
					5. &nbsp; if ((i mod 9) = 3) insert $a_i$ into array3;<br>
					6. &nbsp; if ((i mod 9) = 6) insert $a_i$ into array4;<br>
					7. }<br>
					8. call P(array2);<br>
					9. call P(array3);<br>
					10. call P(array4);<br>
				</span>
			</div>
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
