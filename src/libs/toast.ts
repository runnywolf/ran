import { useSessionStorage } from "@vueuse/core";

export function showToast(text: unknown, type: "default"|"info"|"success"|"warning"|"error"): void { // 在 app 頂部彈出一個訊息方塊
	const toastParams = { text: String(text), type: type };
	useSessionStorage<string|null>("app-toast-params", null).value = JSON.stringify(toastParams); // 將參數寫入 session, Toast.vue 會消耗掉 session
}
