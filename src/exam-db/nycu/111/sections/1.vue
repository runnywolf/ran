<template>
	<MakeProblem scoreText="(25 points)" :optionSlotNames="[ 'a', 'b', 'c', 'd' ]" useUlToListOptions>
		<template #problem>
			Consider the game of Hanoi-Tower, where on a board with three erected pegs pile of disks of
			different sizes are initially stacked at one of the pegs, in a size-ordered manner with the
			largest disk being at the bottom and on top the smallest.<br>
			The player is required to relocate the disk pile to any of the rest two pegs, in compliance
			with the following rules at any time during the play:
			<div class="ts-content is-horizontally-fitted is-dense">
				<div class="ts-list is-unordered">
					<div class="item">
						moving one disk at a time from one peg to another
					</div>
					<div class="item">
						when moving a disk to a peg already piled with disks, the disk must be smaller than any in the pile
					</div>
				</div>
			</div>
			(which would entail that, during the game,
			a disk pile at any peg will be size-ordered with smaller ones on top of larger ones);
			<div class="image">
				<img src="./img/1-1.webp">
			</div>
		</template>
		<template #a>
			<span class="problem-score">(2 points)</span>
			Suppose that <vl exp="H^3(n)" /> is the number of moves required to relocate a pile of
			<vl exp="n" /> disks at a peg to any of the rest two pegs. How would you formulate
			<vl exp="H^3(n)" /> in a recursive manner? And <vl exp="H^3(n) = {?}" />
		</template>
		<template #b>
			<span class="problem-score">(3 points)</span>
			The game can be extended to the case of 4-peg as shown below.
			<div class="image">
				<img src="./img/1-2.webp">
			</div>
			Suppose that <vl exp="H^4(n)" /> denotes the number of moves needed to relocate a pile of
			<vl exp="n" /> disks at a peg to any of the rest three pegs. How would you formulate
			<vl exp="H^4(n)" /> in a recursive manner? And <vl exp="H^4(n) = {?}" /><br>
			Is there any connection that you see between <vl exp="H^3(n)" /> and <vl exp="H^4(n)" />?
		</template>
		<template #c>
			<span class="problem-score">(10 points)</span>
				Let <vl exp="H^5(n)" /> be the number of moves for relocating a pile of <vl exp="n" /> disks
				in 5-peg situation. Are there any connections that you see among <vl exp="H^3(n)" />,
				<vl exp="H^4(n)" /> and <vl exp="H^5(n)" />?
		</template>
		<template #d>
			<span class="problem-score">(10 points)</span>
			What can you tell about <vl exp="H^m(n)" /> in the case of an m-peg Hanoi-Tower game?
			And the connections between <vl exp="H^{m_1}(n)" /> and <vl exp="H^{m_2}(n)" />?
		</template>
	</MakeProblem>
</template>

<style scoped>
.image {
	padding: 12px 0;
	display: flex; justify-content: center;
}
</style>
