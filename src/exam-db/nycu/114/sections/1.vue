<template>
	<vk>
		<MakeProblem scoreText="(11 points)" :optionSlotNames="[ 'a', 'b', 'c' ]" useUlToListOptions>
			<template #problem>
				<div class="right-top-box">
					<table><tbody>
						<tr>
							<td></td><td></td>
							<td>
								<div style="margin: -6px 0 -14px 20px;">
									<div style="margin-bottom: -4px;">columns</div> $\overbrace{\hspace{7em}}$
								</div>
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<div style="margin: 23px -12px 0 -4px;">
									rows $\!\! \left\{ \rule{0em}{3.3em} \right.$
								</div>
							</td>
							<td>
								<table class="ran-native-table right-top-table"><tbody>
									<tr v-for="i in 7"><td v-for="j in 8">
										<div>{{ (i === 1) !== (j === 1) ? Math.max(i, j)-1 : '' }}</div>
									</td></tr>
								</tbody></table>
							</td>
						</tr>
					</tbody></table>
				</div>
				Consider the classic Connect Four game, where players choose a color and then take turns dropping
				colored tokens into a six‑row, seven‑column vertically suspended grid.
				The objective of the game is to be the first to form a horizontal, vertical,
				or diagonal line of four of one’s own tokens. Suppose that two‑players,
				one with yellow and the other with red tokens, are playing the game.
				Propositional functions $Y(i, j),~ R(i, j),$ and $B(i, j)$ assert that the square in the $i\!$‑th row and
				the $j\!$‑th column (refer to the figure) contains a yellow, a red, and no token, respectively.
				<span class="ran-bold">
					Please use these predicates together with the connectives permitted to translate the statements
					in (a) to (c). into logic expressions.
				</span>
				Permitted connectives are $\lor,~ \land,~ \lnot,~ \to,$
				and the pair of parentheses “$()$”. For any propositional function $f(x,y)$, you should use the notation
				$\bigvee\limits_{i=m}^{n} f(i, j)$ for $f(m, j) \lor f(m+1, j) \lor \cdots \lor f(n, j)$
				and the notation $\bigwedge\limits_{i=m}^{n} f(i, j)$ for
				$f(m, j) \land f(m+1, j) \land \cdots \land f(n, j)$.
			</template>
			<template #a>
				<span class="problem-score">(4 points)</span>
				Four squares in the 2nd row contains four red tokens in a row.
			</template>
			<template #b>
				<span class="problem-score">(4 points)</span>
				Each column contains at least a yellow token.
			</template>
			<template #c>
				<span class="problem-score">(3 points)</span>
				If the square in the $i\!$‑th row and the $j\!$‑th column contains a token,
				the square contains either a red token or a yellow token but not both.
			</template>
		</MakeProblem>
	</vk>
</template>

<style scoped>
.right-top-box {
	float: right;
	margin: 0 4px;
	text-align: center; font-size: 11px; font-family: "noto sans tc";
}
.right-top-table td > div {
	width: 18px; height: 18px;
}
.right-top-table tr:first-child > td, .right-top-table tr > td:first-child {
	border: none;
}
</style>
