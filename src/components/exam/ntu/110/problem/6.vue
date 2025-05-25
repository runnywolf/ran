<template>
	<MakeProblem scoreText="(? points)">
		<template #problem>
			<ol class="ran-order-list is-upper-alpha" style="--prefix: '33322'">
				<li>1<br>1</li>
				<li>2<br>1</li>
				<li>3<br>1</li>
			</ol>
			(a) (5%) Suppose <vl exp="U" /> and <vl exp="V" /> are distinct six-dimensional subspaces of a vector space <vl exp="W" /> and <vl exp="\dim W = 8" />.
Find <vl exp="\dim(U \cap V)" />.

(b) (5%) Let <vl exp="V" /> be a vector space of all symmetric <vl exp="2 \times 2" /> matrices.
Define a linear transformation <vl exp="T: V \to P_2(\mathbb{R})" /> by
<vl c exp="T\left( \begin{bmatrix} a & b \\ b & c \end{bmatrix} \right) = (a - b) + (b - c)x + (c - a)x^2." />
Find <vl exp="\operatorname{rank}(T)" />.
		</template>
	</MakeProblem>
</template>
