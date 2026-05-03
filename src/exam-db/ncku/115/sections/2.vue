<template>
	<MakeProblem scoreText="(10%)">
		<template #problem>
			A network engineer is designing a <span class="ran-bold">fault‑tolerant routing backbone</span>
			for a data‑center fabric. The backbone consists of <span class="ran-bold">20 routers</span>,
			arranged physically in a <span class="ran-bold">4×5 cylindrical grid</span>: There are 4 horizontal layers
			(“rings”), each containing 5 routers. Horizontally, each layer forms a <span class="ran-bold">5‑router cycle</span>
			(i.e., the leftmost and rightmost routers are connected). Vertically, each of the 5 columns also forms a
			<span class="ran-bold">4‑router cycle</span> (i.e., the top and bottom switches are connected).
			Thus, every router has degree 4: two connections within its horizontal ring, and two within its vertical ring.
			<span class="ran-bold">Determine whether</span> this cylindrical multi‑ring backbone $H$
			<span class="ran-bold"> can be embedded on a flat PCB without wiring intersections.
			Justify your answer using onlyEuler’s formula and girth‑based edge bounds.</span>
			In graph theory, the girth of an undirected graph is the length of the shortest cycle contained in the graph.
		</template>
	</MakeProblem>
</template>
