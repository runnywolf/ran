<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			For the following Matlab code:
			<table style="margin: 20px 0;"><tbody>
				<tr>
					<td class="ran-code-font">a = 11;</td>
					<td>%Set ‘a’ as the number of rows/cols. in a square matrix $A$</td>
				</tr>
				<tr>
					<td class="ran-code-font">A = ones(a,a);</td>
					<td>%Set $A$ as an 11x11 all‑one matrix (All the elements are 1)</td>
				</tr>
				<tr>
					<td class="ran-code-font">for m = 1:a</td>
				</tr>
				<tr>
					<td class="ran-code-font">&nbsp; A(m,m) = 0.9;</td>
					<td>%Set all the elements on the main diagonal of $A$ as 0.9</td>
				</tr>
				<tr>
					<td class="ran-code-font">end</td>
				</tr>
				<tr>
					<td class="ran-code-font">d = det(A);</td>
					<td>%Calculate the determinant of $A$.</td>
				</tr>
				<tr>
					<td class="ran-code-font">c = abs(d*(10^a)+7);</td>
					<td>%Adjust the value, and <span class="ran-code-font">abs(.)</span> is the absolute‑value func.</td>
				</tr>
				<tr>
					<td class="ran-code-font">answer = mod(c,5);</td>
					<td>% <span class="ran-code-font">mod(.)</span> is the modulo operation.</td>
				</tr>
			</tbody></table>
			What is the value of “answer”?
		</template>
		<template #A>0</template>
		<template #B>1</template>
		<template #C>2</template>
		<template #D>3</template>
		<template #E>4</template>
	</MakeProblem>
</template>

<style scoped>
table tr > td:first-child {
	padding-right: 20px;
}
</style>
