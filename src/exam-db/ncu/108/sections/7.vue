<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			7. We want to analyze the time complexity of the procedure $P$ with the listed pseudo-code. Suppose procedure $Q$ take $\theta(\sqrt{m})$ time to divide an array into three equal size sub-arrays, where $m$ is the size of input; each statement line counts 1 step.
			Procedure $P(A[a_1,a_2,...,a_n])$
			$B_1,B_2,B_3$ are initially empty arrays.
			1. if $n < 3$ exit.
			2. else call $Q(A); /* and get $B_1,B_2,B_3*/$
			/* each is size of $n/3 */$
			3. call $P(B_1);$
			4. call $P(B_3);$
			5. return;
			Suppose the size of input array, $n$, is a number of power of 3, What of the following options are true about the number of steps ($p(n)$) and complexity function($f_p$) of the procedure $P$ in the question above? ($c_i$ are constants in the following equations)
			A. $p(n) = p(n/3) + c_1n^2 + c_2$
			B. $p(n) = 2p(n/3) + c_1n^{1/2} + c_2$
			C. $f_p = O(n^{1/2})$
			D. $f_p = O(n^{1/2}\log n)$
			E. $f_p = \theta(n^{\log_3 2})$
		</template>
		<template #A></template>
		<template #B></template>
		<template #C></template>
		<template #D></template>
		<template #E></template>
	</MakeProblem>
</template>
