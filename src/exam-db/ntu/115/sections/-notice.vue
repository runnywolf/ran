<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="ts-list is-unordered ran-biaukai-font" style="--gap: 4px">
			<div class="item">請先在試卷第一頁繪製以下表格，然後將答案填入。</div>
			<div class="item">答案需化至最簡（分數請有理化或化為最簡分數），未以最簡分數表示不予給分。</div>
		</div>
		<table class="ran-native-table ans-table" style="text-align: center;">
			<tbody>
				<tr>
					<td>1<br>(10%)</td><td></td><td>6<br>(10%)</td><td></td>
				</tr>
				<tr>
					<td>2<br>(10%)</td><td></td><td>7<br>(10%)</td><td></td>
				</tr>
				<tr>
					<td>3<br>(10%)</td><td></td><td>8<br>(10%)</td><td></td>
				</tr>
				<tr>
					<td>4<br>(10%)</td><td></td><td>9<br>(10%)</td><td></td>
				</tr>
				<tr>
					<td>5<br>(10%)</td><td></td><td>10<br>(10%)</td><td></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
.ans-table tr > td:nth-child(2),
.ans-table tr > td:nth-child(4) {
  width: 200px;
}
.ans-table td {
	padding: 2px 8px;
}
</style>
