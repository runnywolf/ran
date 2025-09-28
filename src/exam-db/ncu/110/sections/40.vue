<template>
	<MakeProblem scoreText="">
		<template #problem>
			A python function Fun is designed to perform a certain matrix operation:
			def FunSub(m,i,j):
			return [row[i:j] + row[j+1:] for row in (m[:i]+m[i+1:])]
			def Fun(m):
			if len(m) == 2:
			return m[0][0]*m[1][1]-m[0][1]*m[1][0]
			x = 0
			for c in range(len(m)):
			x += ((-1)**c)*m[0][c]*Fun(FunSub(m,0,c))
			return x
			What inputs make Fun output 0?
			A.
			$$\begin{bmatrix}
			7 & 9 & 9 \\
			3 & 2 & 2 \\
			5 & 3 & 3 \\
			\end{bmatrix}$$
			B.
			$$\begin{bmatrix}
			1 & 2 & 3 & 6 \\
			2 & 3 & 6 & 7 \\
			8 & 14 & 2 & 1 \\
			3 & 6 & 9 & 12 \\
			\end{bmatrix}$$
			C.
			$$\begin{bmatrix}
			1 & 2 & 3 & 6 \\
			2 & 3 & 6 & 7 \\
			8 & 14 & 2 & 1 \\
			3 & 6 & 9 & 18 \\
			\end{bmatrix}$$
			D.
			$$\begin{bmatrix}
			1 & 2 & 3 & 1 \\
			2 & 3 & 11 & 3 \\
			3 & 6 & 9 & 2 \\
			4 & 3 & 3 & 3 \\
			\end{bmatrix}$$
			E. All
		</template>
	</MakeProblem>
</template>
