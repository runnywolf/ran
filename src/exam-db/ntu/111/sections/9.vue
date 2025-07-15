<template>
	<vk>
		<MakeProblem scoreText="(5%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
			<template #problem>
				Given a basis $S = \{ (t - 1)^3 , (t - 1)^2 , (t - 1) , 1 \}$ of a vector space $P_3(t)$ of
				polynomials of degree $\leq 3$. If the coordinate of $x = 5t^3 - 4t^2 + 3t - 2$ with
				respect to $S$ is $(a, b, c, d)$, then $a + b + c + d = {?}$
			</template>
			<template #A>26</template>
			<template #B>27</template>
			<template #C>28</template>
			<template #D>29</template>
			<template #E>30</template>
		</MakeProblem>
	</vk>
</template>
