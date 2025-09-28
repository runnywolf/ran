<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Which of the following statements about integers are incorrect?
		</template>
		<template #A>
			If $\gcd(a, b) = 1$, then for any non‑zero integer $n$,
			there is a pair of integers $p$ and $q$ such that $pa + qb = n$.
		</template>
		<template #B>
			The inverse of $p$ module $q$ exists only when $\gcd(p, q) = 1$ and $q \gt 1$.
		</template>
		<template #C>
			The system
			$
			\begin{cases}
			x \equiv a_1 \pmod{m_1} \\
			x \equiv a_2 \pmod{m_2} \\
			\qquad\qquad \vdots \\
			x \equiv a_n \pmod{m_n}
			\end{cases}
			$
			has a unique solution modulo $m$, where $m_i$ are primes and $m = m_1 m_2 \,\cdots\, m_n$.
		</template>
		<template #D>
			If $p$ is prime, then for every integer $a$ we have $a^{p-1} \equiv 1 \pmod{p}$.
		</template>
		<template #E>
			In RSA, if Alice wants to send a secret message to Bob, Alice uses Bob’s private key to
			encrypt the message and then send the ciphertext message to Bob.
			After Bob receives the ciphertext, Bob can use his public key to decrypt the ciphertext.
		</template>
	</MakeProblem>
</template>
