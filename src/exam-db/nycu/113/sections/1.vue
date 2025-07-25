<template>
	<MakeProblem scoreText="(5 points)" :extraProblemSlotNames="[ 'story', 'notice' ]">
		<template #problem>
			Solve the following puzzle.
		</template>
		<template #story>
			<span style="font-size: 16px;">
				一名醫護人員說：「 醫院裡的醫護人員，包括我在內，總共是 16 名醫生與護士。並且下面四條狀況都成立。並且如果把我排除不計的話，下面四條狀況仍然都成立。」
				<div style="margin: 8px 16px;">
					一、護士多於醫生。<br>
					二、男醫生多於男護士。<br>
					三、男護士多於女護士。<br>
					四、至少有一位女醫生。<br>
				</div>
				請問說話的人是甚麼性別和職務？
			</span>
		</template>
		<template #notice>
			<span style="font-size: 16px;">
				請注意，每個人要麼是男性，要麼是女性，不可以又是男又是女。每個人要麼是醫生，要麼是護士，不可以又是醫生又是護士。
			</span>
		</template>
	</MakeProblem>
</template>
