<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[7%]', '[7%]']">
		<template #a>
			Consider an $9 \times 9$ chessboard. It contains eighty‑one $1 \times 1$ squares and
			one $9 \times 9$ square. How many $3 \times 3$ squares?
		</template>
		<template #b>
			Now consider an $n \times n$ chessboard for some fixed $n \in \mathbb{Z}^+$.
			For $1 \le k \le n$, how many $k \times k$ squares are contained in this chessboard?
		</template>
	</MakeProblem>
</template>
