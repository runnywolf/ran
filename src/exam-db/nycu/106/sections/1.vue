<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #a>
				<span class="problem-score">(10 points)</span>
				Please translate the following two assertions into logical formulae.
				We consider natural numbers only. Assume that there is a predicate $IsPrime(x)$,
				which is true if and only if $x$ is a prime number.
				Hence you do not need to define prime numbers.
				An interval, denoted as $[a, b]$, is defined as the set $\{n \mid n \in \mathbb{N},~ a \leq n \leq b\}$.
				The size of this interval is $b-a+1$.
				<div class="ts-content is-dense ts-list is-unordered" style="--gap: 4px">
					<div class="item">
						There is a prime number in every interval whose size is $10^8$.
					</div>
					<div class="item">
						There are infinite pairs of consecutive prime numbers $(p,q)$ satisfying $|p-q| \leq 10^8$.
					</div>
				</div>
			</template>
			<template #b>
				<span class="problem-score">(5 points)</span>
				Are the above two assertions logically equivalent? Which must be false? Why?
			</template>
		</MakeProblem>
	</vk>
</template>
