<template>
	<div>
		<div class="ran-bold" style="margin-bottom: 6px;">
			Please draw a following table on the first page of the answer sheets and
			fill in the answers accordingly.
		</div>
		<table class="native-table exam-answer-table" style="">
			<tbody>
				<tr>
					<td>1</td>
					<td></td>
					<td></td>
					<td>6</td>
					<td style="text-align: left">&nbsp;(a)</td>
					<td style="text-align: left">&nbsp;(b)</td>
				</tr>
				<tr>
					<td>2</td>
					<td colspan="2"></td>
					<td>7</td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td>3</td>
					<td colspan="2"></td>
					<td>8</td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td>4</td>
					<td></td>
					<td></td>
					<td>9</td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td>5</td>
					<td colspan="2"></td>
					<td>10</td>
					<td colspan="2"></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
.exam-answer-table {
	text-align: center;
}
.exam-answer-table > tbody > tr:first-child > td:nth-child(3n+1) {
	width: 40px;
}
.exam-answer-table > tbody > tr:first-child > td:not(:nth-child(3n+1)) {
	width: 150px;
}
</style>
