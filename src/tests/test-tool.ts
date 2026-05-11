// 一些撰寫測試時可能用的到的工具

import { Frac, SqrtValue, Complex, Scalar, Matrix } from "@lib/ran-math-v3";

export interface TestData { // 測資通用模板
	testName: (...input: any[]) => string, // 測試名稱, 例如: "a+b"
	testFunc: (...input: any[]) => any, // 測試區
	tests: Array<
		{ input: any[], output: any } | // 如果 testFunc 不會發生錯誤, 需要指定輸出值 output, 不需要填 error
		{ input: any[], error: new (...args: any[]) => Error } // 如果 testFunc 會發生錯誤, 需要指定 error class, 不需要填 output
	>,
}

export function str(value: any): string { // 把一些值轉為字串, 用於覆蓋率測試的輸出
	if (value instanceof Map) { // map object
		const s = [...value].map(([k, v]) => `${str(k)}: ${str(v)}`).join(", ");
		return `Map{ ${s} }`;
	}
	if (value instanceof Array) return `[ ${value.map(e => str(e)).join(", ")} ]`; // array
	if (value instanceof Frac) return `${value.n}/${value.d}`; // Frac -> string
	if (value instanceof SqrtValue) return value.toStr(); // SV -> string
	if (value instanceof Complex) return value.toStr(); // CP -> string
	if (value instanceof Scalar) return value.toStr(); // CP -> string
	if (value instanceof Matrix) { // Matrix -> string
		const s = value.arr.map(rowI => rowI.map(aij => aij.toStr()).join(", ")).join("; ");
		return `Matrix[ ${s} ]`;
	}
	if (typeof value === "string") return `"${value.replace("\n", "\\n")}"`; // 強調 value 是一個字串, 取代掉換行
	if (typeof value === "bigint") return `${value}n`; // bigint -> string
	if (Number.isInteger(value)) return String(value); // int number -> string
	if (typeof value === "number") return value.toFixed(4); // float number -> string
	return String(value); // otherwise
}
