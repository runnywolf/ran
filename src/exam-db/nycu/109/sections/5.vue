<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[5 points]', '[5 points]']">
		<template #a>
			It is known that there are infinitely many prime numbers.
			We can prove this by contradiction as outlined below.
			Assume that $P = \{p_1, p_2, \cdots\!, p_n\}$ is the set of all prime numbers,
			where $|P| = n$ and $n$ is a finite number. Consider a number $q$.
			If $q$ is a prime number, then we have a prime number not in $P$, a contradiction.
			If $q$ is not a prime number, then none of $p_1, p_2, \cdots\!, p_n$ divides $q$,
			which is another contradiction. We thus have the proof.
			What is the value of $q$ to make the proof valid?
		</template>
		<template #b>
			Let domain $U$ be all positive integers in the range $[2, 10]$.
			Let propositional function $P(x)$ denote “$x$ is a prime number” and $Q(x)$ denote “$x \equiv 3 \pmod{5}$”.
			Find a set $S$ with the maximum cardinality that makes “$\forall x \in S \ (P(x) \rightarrow Q(x))$”
			true and “$\exists x \in S(P(x) \land Q(x))$” false at the same time.
		</template>
	</MakeProblem>
</template>
