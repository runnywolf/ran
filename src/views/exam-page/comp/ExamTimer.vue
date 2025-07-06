<template>
	<div class="ts-wrap is-compact is-middle-aligned">
		
		<!-- 計時器的 開始/暫停 按鈕 -->
		<button
			class="ts-button is-small is-icon is-outlined"
			@click="timer.toggle()"
			:disabled="!isTimerEnabled"
		>
			<span class="ts-icon" :class="timer.isRunning ? 'is-pause-icon' : 'is-play-icon'"></span>
		</button>
		
		<!-- 計時器的重設按鈕 -->
		<button
			class="ts-button is-small is-icon is-outlined"
			@click="timer.reset()"
			:disabled="!isTimerEnabled"
		>
			<span class="ts-icon is-rotate-left-icon"></span>
		</button>
		
		<!-- 剩餘時間 "分鐘:秒數" -->
		<span class="timer-time">{{ timer.getRemainingTimeText() }}</span>
		
	</div>
	
	<!-- 剩餘時間的進度條. 如果計時器正在計時, 進度條背景會有動畫 -->
	<div class="ts-progress is-tiny timer-progress" :class="timer.isRunning ? 'is-processing' : ''">
		<div class="bar" :style="timer.getProgressStyle()"></div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

class Timer { // 計時器
	constructor(timeSeconds) {
		this.isRunning = false; // 計時器是否正在計時
		this.timeSeconds = timeSeconds; // 計時器的計時秒數
		this.remainingSeconds = timeSeconds; // 計時器剩餘的秒數
		this.intervalId = null; // 計時器識別碼 (若停止計時, 值為 null)
	}
	
	start() { // 開始計時
		this.isRunning = true;
		this.intervalId = setInterval(() => this.remainingSeconds--, 1000); // 每 1000ms 將剩餘秒數 -1
	}
	
	pause() { // 停止計時
		this.isRunning = false;
		clearInterval(this.intervalId); // 停止計時器
		this.intervalId = null; // 初始化
	}
	
	toggle() { // 切換計時器的狀態 (開始/停止)
		this.isRunning ? this.pause() : this.start();
	}
	
	reset() { // 重設計時器
		this.pause(); // 停止計時
		this.remainingSeconds = this.timeSeconds; // 重設計時器的時間
	}
	
	getRemainingTimeText() { // 將剩餘秒數轉為 "分鐘:秒數" 的字串
		const sec = this.remainingSeconds; // 剩餘秒數
		if (sec <= 0) return "0:00"; // 如果剩餘秒數小於 0, 會顯示 0:00
		return `${ Math.floor(sec / 60) }:${ String(sec % 60).padStart(2, "0") }`; // 顯示 "分鐘:秒數"
	}
	
	getProgressStyle() { // 計算進度條樣式
		const timeProgress = this.remainingSeconds / this.timeSeconds; // 剩餘時間的比例
		return {
			"--value": 100 * timeProgress, // 進度條的 css 參數, 100 代表全滿
			"background-color": timeProgress <= 0.1 ? "#f88" : "#9bf" // 時間剩下 10% 時, 進度條會變成紅色
		};
	}
}

const isTimerEnabled = ref(true); // 計時器是否啟用
const timer = ref(new Timer(3));
</script>

<style scoped>
.timer-time {
	margin-top: -3px; /* 把計時器的時間部分往上拉一點 */
}
.timer-progress {
	margin-top: 7px; /* 計時器進度條與按鈕的垂直間距 */
	background-color: #999; /* 進度條底色 */
}
</style>
