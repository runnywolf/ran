<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Let the Gram‑Schmidt QR factorization of the matrix
			$\!\begin{bmatrix} 1 & -2 & -1 \\ 2 & 0 & 1 \\ 2 & -4 & 2 \\ 4 & 0 & 0 \end{bmatrix}\!$
			be
			<vl style="line-height: 150px;" exp="
			\def\arraystretch{1.4} \!\begin{bmatrix}
			\frac{1}{5} & \frac{-2}{5} & \frac{-4}{5} \\
			\frac{2}{5} & \frac{1}{5} & \frac{2}{5} \\
			\frac{2}{5} & \frac{-4}{5} & \frac{2}{5} \\
			\frac{4}{5} & \frac{2}{5} & \frac{-1}{5}
			\end{bmatrix}\!
			\def\arraystretch{1} \!\begin{bmatrix} a & b & c \\ 0 & d & e \\ 0 & 0 & f \end{bmatrix}\!
			" />.
			What is $\lfloor ~\! | a + b + c + d + e + f | ~\! \rfloor \% 5$?
			<br>($\%$ is the modulo operation. $\lfloor z \rfloor$ rounds $z$ to the smaller nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
