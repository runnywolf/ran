<template>
	<MakeProblem>
		<template #problem>
			<slot name="problem"></slot>
			<table>
				<tbody>
					<tr v-for="i in subProblemNumber">
						<td>
							<span>{{ startNo + i - 1 }}.&nbsp;</span>
							<slot :name="startNo + i - 1"></slot>
						</td>
						<td>(A) True</td><td>(B) False</td>
					</tr>
				</tbody>
			</table>
		</template>
	</MakeProblem>
</template>

<script setup> // 專用於 ncu-110/109 的是非題題組的組件
const props = defineProps({
	startNo: { type: Number, default: 1 }, // 題組的起始題號
	subProblemNumber: { typeof: Number, default: 5 }, // 題組的題數
});
</script>

<style scoped>
table, tr, td, th { /* 沒有框線的表格 */
  border: none;
	padding: 0;
}
table > tbody > tr > td:not(:first-child) {
	padding-left: 20px;
}
</style>
