<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			A python function <span class="ran-code-font">Fun</span> is designed to perform a certain matrix operation:
			<div class="ts-wrap is-center-aligned" style="margin: 20px 0;">
				<span class="ran-code-font">
					def FunSub(m, i, j):<br>
					　　return [row[:j] + row[j+1:] for row in (m[:i]+m[i+1:])]<br>
					<br>
					def Fun(m):<br>
					　　if len(m) == 2:<br>
					　　　　return m[0][0]*m[1][1]-m[0][1]*m[1][0]<br>
					<br>
					　　x = 0<br>
					　　for c in range(len(m)):<br>
					　　　　x += ((-1)**c)*m[0][c]*Fun(FunSub(m, 0, c))<br>
					　　return x
				</span>
			</div>
			What inputs make <span class="ran-code-font">Fun</span> output $0$?
		</template>
		<template #A>$@bm{ 7, 9, 9; 3, 2, 2; 5, 3, 3 }$</template>
		<template #B>$@bm{ 1, 2, 3, 6; 2, 3, 6, 7; 8, 14, 2, 1; 3, 6, 9, 12 }$</template>
		<template #C>$@bm{ 1, 2, 3, 6; 2, 3, 6, 7; 8, 14, 2, 1; 3, 6, 9, 18 }$</template>
		<template #D>$@bm{ 1, 2, 3; 3, 2, 1; 2, 3, 1 } @bm{ 1, 0, 1; 2, 9, 2; 3, 3, 3 }$</template>
		<template #E>All</template>
	</MakeProblem>
</template>
