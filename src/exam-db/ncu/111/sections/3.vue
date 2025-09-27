<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			In the RSA public key system,
		</template>
		<template #A>
			Its correctness is based on Fermat’s theorem and Chinese remainder theorem.
		</template>
		<template #B>
			Two large primes are chosen so that one acts as the public key and the other the private key.
		</template>
		<template #C>
			$(M^e)^d = (M^d)^e = M$, where $M$ represents a message, $e$ represents the public key,
			and $d$ the corresponding private key.
		</template>
		<template #D>
			If Alice wants to send a message to Bob and prove her identity,
			Alice first generates a hash value from the message and encrypts the hash value by
			her own public key and then sends the plaintext message and the encrypted hash value to Bob.
			After Bob receives the message, he decrypts the hash value by Alice’s private key.
			Besides, he also generates a hash value from the plaintext message.
			If both values match, it proves the message comes from Alice.
		</template>
		<template #E>
			All of the above statements are incorrect.
		</template>
	</MakeProblem>
</template>
