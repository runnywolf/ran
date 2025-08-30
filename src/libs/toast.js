import { useSessionStorage } from "@vueuse/core";

export const ToastType = { // showToast 的參數 "type" (訊息方塊樣式)
	DEFAULT: "default",
	INFO: "info",
	SUCCESS: "success",
	WARNING: "warning",
	ERROR: "error"
};

export function showToast(text, type = ToastType.DEFAULT) { // 在 app 頂部彈出一個訊息方塊
	const toastParams = { text: String(text), type: type };
	useSessionStorage("app-toast-params").value = JSON.stringify(toastParams); // 將參數寫入 session, Toast.vue 會消耗掉 session
}
