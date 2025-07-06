<template>
	<MakeProblem>
		<template #problem>
			<ol class="ran-order-list is-lower-alpha" style="--prefix: '33322'">
				<li>
					<span class="problem-score">(5%)</span>
					Suppose <vl exp="U" /> and <vl exp="V" /> are distinct six&#8209;dimensional subspaces
					of a vector space <vl exp="W" /> and <vl exp="\dim W = 8" />.
					Find <vl exp="\dim(U \cap V)" />.
				</li>
				<li>
					<span class="problem-score">(5%)</span>
					Let <vl exp="V" /> be a vector space of all symmetric <vl exp="2 \times 2" /> matrices.<br>
					Define a linear transformation <vl exp="T: V \to P_2(\mathbb{R})" /> by
					<vl c exp="
						T\left( \begin{bmatrix} a & b \\ b & c \end{bmatrix} \right)
						= (a-b) + (b-c)x + (c-a)x^2.
					" />
					Find <vl exp="\operatorname{rank}(T)" />.
				</li>
			</ol>
		</template>
	</MakeProblem>
</template>
