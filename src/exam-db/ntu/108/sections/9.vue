<template>
	<vk>
		<MakeProblem scoreText="(10%)" :extraProblemSlotNames="[ 'statements' ]">
			<template #problem>
				How many of the following five statements are correct? ________
			</template>
			<template #statements>
				<div class="ts-list is-unordered" style="--gap: 6px">
					<div class="item">
						The solution set for a system of homogeneous linear equations
						having an $m \times n$ rational coefficient matrix is a rational vector space.
					</div>
					<div class="item">
						An $m \times n$ complex matrix $A$ is invertible if and only if $A^*$ is invertible.
					</div>
					<div class="item">
						If $A$ is an $m \times n$ rational matrix, then $\text{rank}(A) = \text{rank}(A^t)$.
					</div>
					<div class="item">
						If $A$ is an $m \times n$ invertible real matrix, then $\text{nullity}(A) = \text{nullity}(A^{-1})$.
					</div>
					<div class="item">
						If $A$ is an $n \times n$ complex matrix, then $\det(A^*) = \overline{\det(A)}$.
					</div>
				</div>
			</template>
		</MakeProblem>
	</vk>
</template>
