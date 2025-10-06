<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			In the following procedure P, P and B are both procedures;
			each statement line in and outside the loop counts 1 step.<br>
			<div class="ts-wrap is-center-aligned" style="margin: 20px 0;">
				<span class="ran-code-font">
					Procedure P(array1[$a_1, a_2, \cdots\!, a_n$])<br>
					1. if (n < 9) exit;<br>
					2. call B(array1[$a_1, a_2, \cdots\!, a_n$]);<br>
					&nbsp; &nbsp;declare new empty array2, array3, array4;<br>
					3. for (i = 1 to n) {<br>
					4. &nbsp; if ((i mod 9) = 1) insert $a_i$ into array2;<br>
					5. &nbsp; if ((i mod 9) = 4) insert $a_i$ into array3;<br>
					6. &nbsp; if ((i mod 9) = 7) insert $a_i$ into array4;<br>
					7. }<br>
					8. call P(array2);<br>
					9. call P(array3);<br>
					10. call P(array4);<br>
				</span>
			</div>
			In order to make P’s complexity $O(n)$, which of the following can be B’s complexity?<br>
			($m$ is the input size of B)
		</template>
		<template #a>$O(m^{1/2})$</template>
		<template #b>$O(m^1)$</template>
		<template #c>$O(m^{\sqrt{2}})$</template>
		<template #d>$O(m^{1/4})$</template>
		<template #e>$O(m^2)$</template>
	</MakeProblem>
</template>
