import { expect, test } from "vitest";
import { isInt } from "RanMath";

const testArr = [
	{ input: 123, output: true },            // 正整數
	{ input: 123.0, output: true },          // int
	{ input: -456, output: true },           // 負整數
	{ input: 0, output: true },              // 零
	{ input: 123.456, output: false },       // 浮點數
	{ input: -987.654, output: false },      // 負浮點數
	{ input: NaN, output: false },           // NaN
	{ input: Infinity, output: false },      // Infinity
	{ input: "123", output: false },         // 字串數字
	{ input: "hello", output: false },       // 字串
	{ input: null, output: false },          // null
	{ input: undefined, output: false },     // undefined
	{ input: true, output: false },          // 布林
	{ input: {}, output: false },            // 物件
	{ input: [], output: false },            // 陣列
	{ input: () => 1, output: false },       // 函式
	{ input: new Number(5), output: false }, // 包裝型 Number
];

for (const t of testArr) {
	test(`${t.input} is number?`, () => expect(isInt(t.input)).toBe(t.output));
}
