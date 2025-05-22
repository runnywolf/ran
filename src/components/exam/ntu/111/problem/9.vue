<template>
	<MakeProblem :score="5" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			Given a basis <vl exp="S = \{ (t - 1)^3 , (t - 1)^2 , (t - 1) , 1 \}" /> of a vector space
			<vl exp="P_3(t)" /> of polynomials of degree <vl exp="\leq 3" />. If the coordinate of
			<vl exp="x = 5t^3 - 4t^2 + 3t - 2" /> with respect to <vl exp="S" /> is
			<vl exp="(a, b, c, d)" />, then <vl exp="a + b + c + d = {?}" />
		</template>
		<template #A>26</template>
		<template #B>27</template>
		<template #C>28</template>
		<template #D>29</template>
		<template #E>30</template>
	</MakeProblem>
</template>
