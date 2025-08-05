<template>
	<table class="sidebar-table">
		<tbody>
			
			<!-- 學校簡稱 -->
			<tr>
				<td>
					<span class="ts-icon is-school-icon"></span>
				</td>
				<td>
					{{ uniShortName ?? "-" }}
				</td>
			</tr>
			
			<!-- 題本年份 -->
			<tr>
				<td>
					<span class="ts-icon is-calendar-icon"></span>
				</td>
				<td>
					{{ examYear ?? "-" }}&nbsp;年
				</td>
			</tr>
			
			<!-- 題本的科目 -->
			<tr>
				<td>
					<span class="ts-icon is-file-icon"></span>
				</td>
				<td>
					{{ examConfig.subjectShortName ?? "-" }}
				</td>
			</tr>
			
			<!-- 題本的來源連結 -->
			<tr>
				<td>
					<span class="ts-icon is-link-icon"></span>
				</td>
				<td>
					<RanLink v-if="examConfig.externalLink"
						:to="examConfig.externalLink"
						:tooltip="examConfig.externalLinkTip ?? '沒有附註任何東西捏 (´･ω･`)'"
					>題本來源</RanLink>
					<span v-else>未知的來源</span>
				</td>
			</tr>
			
			<!-- 更多資訊的按鈕 -->
			<tr>
				<td>
					<span class="ts-icon is-info-icon" style="pointer-events: none"></span>
				</td>
				<td>
					<button class="ts-text more-info-button" popovertarget="more-info">更多資訊</button>
					<div class="ts-popover" id="more-info" data-position="right" popover>
						<table class="ts-table is-celled is-collapsed is-dense">
							<tbody>
								<tr>
									<td>科目</td><td>{{ examConfig.subjectName ?? "-" }}</td>
								</tr>
								<tr>
									<td>編號</td>
									<td>
										<span>{{ examConfig.subjectCode ?? "-" }}</span>
										<span class="ts-icon is-circle-question-icon is-start-spaced" data-tooltip="每個科目在當年度的唯一編號"></span>
									</td>
								</tr>
								<tr>
									<td>系所</td><td>{{ examConfig.department ?? "-" }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</td>
			</tr>
			
		</tbody>
	</table>
</template>

<script setup>
const props = defineProps({
	uniShortName: String, // 學校中文縮寫
	examYear: String, // 題本年份
	examConfig: Object, // 題本資訊
});
</script>

<style scoped>
.sidebar-table > tbody > tr > td:first-child {
	text-align: center; /* 置中 icon */
}
.sidebar-table > tbody > tr:not(:first-child) > td {
	padding-top: 4px; /* select 間的距離 */
}
.sidebar-table > tbody > tr > td:not(:first-child) {
	padding-left: 8px; /* 學校下拉選單跟 icon 的距離 */
}
.more-info-button {
	margin-left: -34px;
	padding: 4px 10px 6px 34px;
	background-color: #ddda;
	border-radius: 4px;
}
.more-info-button:hover {
	background-color: #ddd;
}
</style>
