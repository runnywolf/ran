<template>
	畫卡諾圖：
	<div class="ts-box is-collapsed">
    <table class="ts-table is-collapsed is-celled is-definition karnaugh-table">
			<thead>
				<tr>
					<th>wx \ yz</th><th>00</th><th>01</th><th>11</th><th>10</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>00</td><td></td><td>1</td><td>1</td><td>1</td>
				</tr>
				<tr>
					<td>01</td><td>1</td><td></td><td></td><td></td>
				</tr>
				<tr>
					<td>11</td><td></td><td></td><td></td><td></td>
				</tr>
				<tr>
					<td>10</td><td></td><td></td><td></td><td></td>
				</tr>
			</tbody>
		</table>
	</div>
	<br>
	Ans: 4
</template>

<style scoped>
.karnaugh-table > tbody > tr > td { /* 表格元素置中 */
	text-align: center;
}
</style>
