// 一些撰寫測試時可能用的到的工具

import { Frac } from "@lib/ran-math-v3";

export interface TestData { // 測資通用模板
	testName: (...input: any[]) => string, // 測試名稱, 例如: "a+b"
	testFunc: (...input: any[]) => any, // 測試區
	tests: Array<
		{ input: any[], output: any } | // 如果 testFunc 不會發生錯誤, 需要指定輸出值 output, 不需要填 error
		{ input: any[], error: new (...args: any[]) => Error } // 如果 testFunc 會發生錯誤, 需要指定 error class, 不需要填 output
	>,
}

// 把一些值轉為字串, 用於覆蓋率測試的輸出. 避免影響覆蓋率, 所以不使用 ran-math lib 的 function
export function str(value: any): string {
	if (typeof value === "string") return `"${value}"`; // 強調 value 是一個字串
	if (value instanceof Frac) return `${value.n}/${value.d}`; // Frac -> string
	if (typeof value === "bigint") return String(value); // bigint -> string
	if (Number.isInteger(value)) return String(value); // int number -> string
	if (typeof value === "number") return value.toFixed(4); // float number -> string
	return String(value); // otherwise
}
