<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(5 points)', '(5 points)']">
		<template #a>
			How many quadrilateral are determined by the vertices of a regular polygon of $n$ sides? ($n \geq 4$)
		</template>
		<template #b>
			How many if no side of the polygon is to be a side of any quadrilateral? ($n \geq 8$)<br>
			Note: quadrilateral <span class="ran-app-font">(四邊形)</span>
		</template>
	</MakeProblem>
</template>
