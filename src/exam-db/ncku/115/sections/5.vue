<template>
	<MakeProblem scoreText="(10%)" listEndLabel="b">
		<template #problem>
			You are designing the firmware logic for a high‑security electronic lock. The lock receives a stream of
			binary signals (0 or 1) from a keypad. You need to <span class="ran-bold">draw the state transition diagrams
			for two different versions of the security protocol. Use Moore Machine model for both versions.</span>
			Specifically, use circles to represent states with labels $S_i$ where $i$ is the index starting from 0,
			use arrows to represent transitions, use an arrow to point to the start state,
			and mark the “Unlock” state as double circles.
		</template>
		<template #a>
			The Standard “Header‑Trailer” Protocol Specification
			<ol style="padding-left: 20px; margin: 6px 0;">
				<li>
					Start‑up Check: When the system first turns on, it must check for a specific “Header”.
					The very first two signals received must be a 1 followed by another 1.
				</li>
				<li>
					Security Violation: If the first two signals are anything other than a pair of 1s,
					the system detects a hack. It must immediately enter a Permanent Lockout state
					where it ignores all future input and never unlocks.
				</li>
				<li>
					Monitoring: Once the valid header (11) is received, the system waits.
					It ignores the specific pattern of the signals in the middle.
				</li>
				<li>
					Unlocking: The door should unlock if and only if the last two signals received were a 0 followed by another 0.
				</li>
				<li>
					Relocking: If the system receives more signals after unlocking that break the “00” ending,
					the door must lock again and go back to monitoring for a new “00” ending.
				</li>
			</ol>
		</template>
		<template #b>
			The Advanced “Strict Rhythm” Protocol Specification:<br>
			We request a security update to the logic designed in (a). Please modify your Finite State Machine
			to incorporate the following three specific changes. All other behaviors (like the “11” start‑up check) remain the same.
			<ol style="padding-left: 20px; margin: 6px 0;">
				<li>
					Enforce Alternating Data: Instead of ignoring the signals between the header and the unlock command,
					the system must now strictly enforce an alternating “0, 1, 0, 1...” pattern.
				</li>
				<li>
					Immediate Lockout on Error: If this alternating rhythm is broken
					(for example, if two 1s appear consecutively after the header),
					the system must immediately enter the Permanent Lockout state.
				</li>
				<li>
					One‑Time Access: The “Relock” feature is removed. Once the door unlocks (upon receiving the “00” suffix),
					any further input signals are considered a security violation and must trigger the Permanent Lockout state.
				</li>
			</ol>
		</template>
	</MakeProblem>
</template>
