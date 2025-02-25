<template>
	<div class="ts-box is-negative is-start-indicated warning-box">
		<div class="ts-content">
			<details class="ts-accordion">
				<summary>找不到這一題的設定檔 ٩(ŏ﹏ŏ、)۶ ，解決方法請點我。</summary>
				<div class="ts-list is-unordered">
					<div class="item">
						檢查一下&nbsp;<span class="code-font">${i}.vue</span>&nbsp;是否存在於目前題本的資料夾下。
					</div>
					<div class="item">
						檢查&nbsp;<span class="code-font">config.json</span>&nbsp;中，目前題本的
						<span class="code-font">examData.problemNumber</span>&nbsp;的值是不是太多了。
					</div>
				</div>
			</details>
		</div>
	</div>
</template>

<style scoped>
.code-font {
	font-family: monospace;
}
</style>
