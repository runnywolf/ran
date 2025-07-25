<template>
	<MakeProblem scoreText="(5 points)">
		<template #problem>
			Find the flaw with the following “proof” that every postage of three cents or more
			can be formed using just three‑cent and four‑cent stamps.
			<div style="height: 8px;"></div>
			Basis Step: We can form postage of three cents with a single three‑cent stamp
			and we can form postage of four cents using a single four‑cent stamp.
			<div style="height: 8px;"></div>
			Inductive Step: Assume that we can form postage of $j$ cents for all nonnegative integers $j$
			with $j \leq k$ using just three‑cent and four‑cent stamps.
			We can then form postage of $k + 1$ cents by replacing one three‑cent stamp with a four‑cent stamp
			or by replacing two four-cent stamps by three three-cent stamps.
		</template>
	</MakeProblem>
</template>
