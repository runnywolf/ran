<template>
	<MakeProblem scoreText="(10 points)">
		<template #problem>
			Let <vl exp="U" /> and <vl exp="V" /> be vector spaces over the
			scalar field <vl exp="\mathbb{R}" /> of real numbers, where
			<div class="ts-list is-unordered" style="--gap: 0.2rem; padding: 10px 0;">
				<div class="item">
					<vl exp="U" /> consists of the <vl exp="2 \times 2" /> self-adjoint complex matrices
				</div>
				<div class="item">
					<vl exp="V" /> consists of the <vl exp="3 \times 3" /> real matrices
				</div>
			</div>
			If
			<vl c exp="S = \{ 2, 0, 2, 4, 0, 2, 0, 3 \}" />
			is a multi-set consisting of the nonnegative real numbers
			<vl c exp="| \sigma - 1 |" />
			for all nonzero singular values <vl exp="\sigma" /> of <vl exp="T" />,
			then the product of all singular values of
			the adjoint of the pseudo-inverse of <vl exp="T" />, is _______.
		</template>
	</MakeProblem>
</template>
