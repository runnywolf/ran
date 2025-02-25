<template>
	<div class="ts-box is-negative is-start-indicated warning-box">
		<div class="ts-content">
			<details class="ts-accordion">
				<summary>找不到這一題的設定檔 ٩(ŏ﹏ŏ、)۶ ，解決方法請點我。</summary>
				<div class="ts-list is-unordered">
					<div class="item">
						檢查一下&nbsp;<span class="code-font">&lt;id&gt;.vue</span>&nbsp;是否存在於&nbsp;<span class="code-font">src/components/exam/&lt;uni&gt;/&lt;year&gt;/</span>&nbsp;之下。
					</div>
					<div class="item">
						檢查&nbsp;<span class="code-font">config.json</span>&nbsp;中，<span class="code-font">&lt;uni&gt;.exam[&lt;i&gt;].problemCompId</span>&nbsp;的值是否填寫正確。
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
