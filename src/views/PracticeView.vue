<template>
	<div class="ts-grid">
		
		<!-- 左側的練習項目 -->
		<div class="column">
			<div class="ts-box is-vertical is-compact sidebar">
				<div class="ts-content is-compact ts-menu is-dense is-separated is-start-icon">
					<a class="item is-active">
						<span class="ts-icon is-rotate-icon"></span>
						<span>遞迴</span>
					</a>
					<a class="item">
						<span class="ts-icon is-gears-icon"></span>
						<span>LU</span>
					</a>
					<a class="item">
						<span class="ts-icon is-gears-icon"></span>
						<span>QR</span>
					</a>
					<a class="item is-active">
						<span class="ts-icon is-gears-icon"></span>
						<span>PDP</span>
					</a>
					<a class="item">
						<span class="ts-icon is-gears-icon"></span>
						<span>Jordan</span>
					</a>
					<a class="item">
						<span class="ts-icon is-gears-icon"></span>
						<span>SVD</span>
					</a>
				</div>
			</div>
		</div>
		
		<!-- 右側的模擬室區域 -->
		<div class="column is-fluid">
			<div class="ts-box ts-content">
				ฅ^⦁⩊⦁^ฅ ੭<br>ฅ^⦁⩊⦁^ฅ ੭<br>ฅ^⦁⩊⦁^ฅ ੭
			</div>
		</div>
		
	</div>
</template>

<style scoped>
.ts-menu > a {
	padding: 0 10px;
	gap: 10px;
}
.ts-menu > a:not(.is-active):hover { /* 沒有被選取的項目被 hover 時, 將背景變灰 */
	background-color: #eee;
}

</style>
