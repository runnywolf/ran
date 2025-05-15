import { expect, test } from "vitest";

// ---------- test area ----------
import { isInt } from "ran-math";

const testArr = [ // 測資
	{ n: 123, output: true },            // 正整數
	{ n: 123.0, output: true },          // int
	{ n: -456, output: true },           // 負整數
	{ n: 0, output: true },              // 零
	{ n: 123.456, output: false },       // 浮點數
	{ n: -987.654, output: false },      // 負浮點數
	{ n: NaN, output: false },           // NaN
	{ n: Infinity, output: false },      // Infinity
	{ n: "123", output: false },         // 字串數字
	{ n: "hello", output: false },       // 字串
	{ n: null, output: false },          // null
	{ n: undefined, output: false },     // undefined
	{ n: true, output: false },          // 布林
	{ n: {}, output: false },            // 物件
	{ n: [], output: false },            // 陣列
	{ n: () => 1, output: false },       // 函式
	{ n: new Number(5), output: false }, // 包裝型 Number
];

test.each(testArr)(
	"$n is integer? $output",
	({ n, output }) => expect(isInt(n)).toBe(output)
);
// ---------- test area ----------
