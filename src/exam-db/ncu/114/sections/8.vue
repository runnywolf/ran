<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			We are processing two‑dimensional data on the X‑Y plane. Which of the following are true?
		</template>
		<template #a>
			<img src="./img/8.webp" style="float: right; height: 250px;" /><!-- 我畫的 (∠・ω < )⌒☆ -->
			One particle is initially located at the point $A(0,-1)$ and on the unit circle.
			It goes straight to $B$ on the unit circle as shown in the figure, and $\angle OAB = 15^\circ$,
			where $O$ is the origin $(0,0)$.
			The particle is then reflected and reaches $P_1$ on the unit circle with $\angle OBA = \angle OBP_1$.
			The particle keeps reflecting and reaches point $P_2$ on the unit circle and so on.
			The coordinate of $P_{120}$ is $(\frac{1}{2}, -\frac{\sqrt{3}}{2})$.
		</template>
		<template #b>
			The point $A(0,-1)$ is linearly transformed by $J = \!\begin{bmatrix} 1 & 2 \\ 2 & -1 \end{bmatrix}\!$.
			After $n$ linear transformations
			<span class="ran-no-break" style="line-height: 60px;">(i.e., $J^n \!\begin{bmatrix} 0 \\ -1 \end{bmatrix}\!$)</span>,
			the position is $Q_n = (x_n ,~ y_n)$. $Q_{1001} = (x_{1001} ,~ y_{1001}),~ x_{1001} = 0$.
		</template>
		<template #c>
			Following (b), the distance between $Q_{1000}$ and $Q_{1001}$ is $m$.
			The distance between $Q_{999}$ and $Q_{1000}$ is $n$. $\frac{m}{n} \gt 2.3$.
		</template>
		<template #d>
			$R_k = \!\begin{bmatrix} \cos(k^\circ) & -\sin(k^\circ) \\ \sin(k^\circ) & \cos(k^\circ) \end{bmatrix}\!$,
			$M_k = \!\begin{bmatrix} \cos(2 k^\circ) & \sin(2 k^\circ) \\ \sin(2 k^\circ) & -\cos(2 k^\circ) \end{bmatrix}\!$.
			A point $C$, $(a,b)$, is on the unit circle and in the first Quadrant ($0 \lt a \lt 1 ,~ 0 \lt b \lt 1$).
			$C$ is then linearly transformed by $Q = R_{15} M_{15} R_{30} M_{30} R_{45}$ (i.e., $Q [a,b]^T$).
			The resultant point must be in the first Quadrant.
		</template>
		<template #e>
			$J = \!\begin{bmatrix} 1 & 2 \\ 2 & -1 \end{bmatrix}\!$,
			$T = \!\begin{bmatrix} 2 & -1 \\ 1 & 2 \end{bmatrix}\!$,
			$S = \!\begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}\!$.
			A unit circle $U$ is transformed by $N = SJT$ to become $Z$.
			(For a point $D$, $(c,d)$, on the unit circle, we calculate $N [c,d]^T$.)
			The sum of the largest and shortest distances between the origin $O$ and $Z$ is $25$.
		</template>
	</MakeProblem>
</template>
