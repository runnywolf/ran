<template>
	<div class="ts-wrap is-compact is-middle-aligned">
		
		<!-- 計時器的 開始/暫停 按鈕 -->
		<button
			class="ts-button is-small is-icon is-outlined"
			@click="timer.toggle()"
			:disabled="!props.isEnabled"
		>
			<span class="ts-icon" :class="timer.isRunning ? 'is-pause-icon' : 'is-play-icon'"></span>
		</button>
		
		<!-- 計時器的重設按鈕 -->
		<button
			class="ts-button is-small is-icon is-outlined"
			@click="timer.reset()"
			:disabled="!props.isEnabled"
		>
			<span class="ts-icon is-rotate-left-icon"></span>
		</button>
		
		<!-- 剩餘時間 "分鐘:秒數" -->
		<span class="timer-time" :class="{ 'look-like-disabled': !props.isEnabled }">
			{{ timer.getRemainingTimeText() }}
		</span>
		
	</div>
	
	<!-- 剩餘時間的進度條. 如果計時器正在計時, 進度條背景會有動畫 -->
	<div class="ts-progress is-tiny timer-progress" :class="{ 'is-processing': timer.isRunning }">
		<div class="bar" :style="timer.getProgressStyle()"></div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';

class Timer { // 計時器
	constructor() {
		this.isRunning = false; // 計時器是否正在計時
		this.timeSeconds = 0; // 計時器的計時秒數
		this.remainingSeconds = 0; // 計時器剩餘的秒數
		this.intervalId = null; // 計時器識別碼 (若停止計時, 值為 null)
	}
	
	setTimeSeconds(sec) { // 設定計時器的計時秒數 (非目前倒數時間)
		this.timeSeconds = sec;
		this.reset(); // 重設計時器
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
		let timeProgress = this.remainingSeconds / this.timeSeconds; // 剩餘時間的比例
		if (this.timeSeconds === 0 && !this.isRunning) timeProgress = 1; // 計時秒數為 0 且計時器並未正在計時
		return {
			"--value": 100 * timeProgress, // 進度條的 css 參數, 100 代表全滿
			"background-color": timeProgress <= 0.1 ? "#f88" : "#9bf" // 時間剩下 10% 時, 進度條會變成紅色
		};
	}
}

const props = defineProps({
	timeMinutes: { type: Number, default: 0 }, // 計時器時間 (分鐘)
	isEnabled: { type: Boolean, default: true }, // 是否啟用計時器
});

const emit = defineEmits([
	"returnTimer", // 回傳 Timer 物件用於控制計時器
	"timeup", // 時間到
]);

const timer = ref(new Timer()); // 設定計時器

emit("returnTimer", timer.value); // 將計時器控制器交給父組件 ExamView

watch(() => props.timeMinutes, newMin => timer.value.setTimeSeconds(60 * newMin)); // 更新計時器的計時秒數
watch(() => props.isEnabled, () => timer.value.reset()); // 啟用或禁用計時器會使計時器被重置

watch(() => timer.value.remainingSeconds, newSec => { // 偵測剩餘時間
	if (newSec <= 0) { // 如果計時器時間到了, 發送事件給父組件 ExamView
		emit("timeup");
		timer.value.reset(); // 重設計時器
	}
});
</script>

<style scoped>
.timer-time {
	margin-top: -3px; /* 把計時器的時間部分往上拉一點 */
}
.timer-progress {
	margin-top: 7px; /* 計時器進度條與按鈕的垂直間距 */
	background-color: #999; /* 進度條底色 */
}
.look-like-disabled { /* 使某些地方看起來像是被禁用 */
	opacity: 0.4;
}
</style>
