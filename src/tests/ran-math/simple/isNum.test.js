import { expect, test } from "vitest";
import { isNum } from "RanMath";

const testArr = [
	{ input: 123, output: true },            // 整數
	{ input: -456.78, output: true },        // 負浮點數
	{ input: 0, output: true },              // 零
	{ input: NaN, output: true },            // NaN 是 typeof "number"
	{ input: Infinity, output: true },       // Infinity 也是 number
	{ input: "123", output: false },         // 字串數字
	{ input: "hello", output: false },       // 字串
	{ input: null, output: false },          // null
	{ input: undefined, output: false },     // undefined
	{ input: true, output: false },          // 布林
	{ input: {}, output: false },            // 物件
	{ input: [], output: false },            // 陣列
	{ input: () => 1, output: false },       // 函式
	{ input: new Number(5), output: false }, // 包裝型 Number（物件）
];

for (const t of testArr) test(
	`${t.input} is number? ${t.output}`,
	() => expect(isNum(t.input)).toBe(t.output)
);
