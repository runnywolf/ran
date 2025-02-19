<template>
	<div class="ts-grid">
		<div class="column">
			<div class="ts-wrap is-vertical is-compact sidebar">
				<label class="ts-switch">
					<input type="checkbox" checked />
					測驗模式
				</label>
				<div class="ts-divider"></div>
				<table class="sidebar-table">
					<tbody>
						<tr>
							<td>
								<span class="ts-icon is-school-icon"></span>
							</td>
							<td>
								<div class="column ts-select is-solid is-fluid">
									<select>
										<option>台大</option>
										<option>清大</option>
										<option>交大</option>
										<option>台科大</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<span class="ts-icon is-calendar-icon"></span>
							</td>
							<td>
								<div class="column ts-select is-solid is-fluid">
									<select>
										<option>101年</option>
										<option>100年</option>
										<option>99年</option>
										<option>98年</option>
									</select>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<span class="ts-icon is-hashtag-icon"></span>
							</td>
							<td>
								<div class="column ts-select is-solid is-fluid">
									<select>
										<option>1012</option>
									</select>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="ts-divider"></div>
				<div>採計科系</div>
				<div class="ts-divider"></div>
				<div>[ 計時器 ]</div>
				<div class="ts-divider"></div>
				<div>
					<span class="ts-icon is-print-icon is-end-spaced"></span>列印
				</div>
			</div>
		</div>
		<div class="column is-fluid">
			<div class="ts-box">
				<div class="ts-content">
					problem 1 - test
					<div class="ts-divider is-section"></div>
					problem 2<br><br><br><br><br><br><br><br><br><br>
					<br><br><br><br><br><br><br><br><br><br>
					<br><br><br><br><br><br><br><br><br><br>
					<br><br><br><br><br><br><br><br><br><br>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

</script>

<style scoped>
.sidebar {
	position: sticky; top: 20px; /* 即使題目區往下移動, 這個 box 也會在原地 */
}
.sidebar > :not(.ts-divider):not(table) {
	margin: 0 6px; /* 把除了表格和分界線的東西都往內縮 */
}
.sidebar-table {
	width: 150px; /* 側邊欄寬度 */
}
.sidebar-table > tbody > tr > td:first-child {
	text-align: center; /* 置中 icon */
}
.sidebar-table > tbody > tr:not(:first-child) > td {
	padding-top: 4px; /* select 間的距離 */
}
.sidebar-table > tbody > tr > td:not(:first-child) {
	padding-left: 8px; /* 學校下拉選單跟 icon 的距離 */
}
</style>
