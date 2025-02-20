<template>
	<div class="ts-grid">
		<div class="column">
			<div class="ts-box is-vertical is-compact sidebar">
				<div class="ts-content is-dense sidebar-examMode">
					<label class="ts-switch">
						<input type="checkbox" checked />
						<span>測驗模式&nbsp;</span>
						<span class="ts-icon is-circle-question-icon" data-tooltip="開啟測驗模式時，會隱藏題本。"></span>
					</label>
				</div>
				<div class="ts-divider"></div>
				<div class="ts-content is-dense">
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
				</div>
				<div class="ts-divider"></div>
				<div class="ts-content is-dense">
					<details class="ts-accordion" open>
						<summary>採計科系</summary>
						資工?
					</details>
				</div>
				<div class="ts-divider "></div>
				<div class="ts-content is-dense sidebar-timer">
					<span class="ts-icon is-play-icon is-rounded"></span>
					<span class="ts-icon is-rotate-left-icon is-rounded is-spaced"></span>
					<span>100:00</span><br>
					<div class="ts-progress is-tiny sidebar-timer-progress">
						<div class="bar" style="--value: 60">
							<div class="text"></div>
						</div>
					</div>
				</div>
				<div class="ts-divider"></div>
				<div class="ts-content is-dense">
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
	position: sticky; top: 16px; /* 即使題目區往下移動, 這個 box 也會在原地 */
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
.sidebar-examMode {
	padding-bottom: 2px; /* 減少測驗模式與下底線的距離 (7.5px -> 2px) */
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
.sidebar-timer {
	padding: 10px 15px 12px 15px; /* 計時器區塊的 padding 修正 */
}
.sidebar-timer-progress {
	margin-top: 7px; /* 計時器進度條與按鈕的垂直間距 */
}
</style>
