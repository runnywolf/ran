import { defineStore } from "pinia"

export const globalStore = defineStore("global", { // global 變數
	state: () => ({
		examScrollProbNo: undefined, // 如果跳轉到題本頁面, 會自動滾動到第幾題
	}),
})
