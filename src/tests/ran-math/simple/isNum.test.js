import { expect, test } from "vitest";

// ---------- test area ----------
import { isNum } from "ran-math";

const testArr = [ // 測資
	{ n: 123, output: true },            // 整數
	{ n: -456.78, output: true },        // 負浮點數
	{ n: 0, output: true },              // 零
	{ n: NaN, output: true },            // NaN 是 typeof "number"
	{ n: Infinity, output: true },       // Infinity 也是 number
	{ n: "123", output: false },         // 字串數字
	{ n: "hello", output: false },       // 字串
	{ n: null, output: false },          // null
	{ n: undefined, output: false },     // undefined
	{ n: true, output: false },          // 布林
	{ n: {}, output: false },            // 物件
	{ n: [], output: false },            // 陣列
	{ n: () => 1, output: false },       // 函式
	{ n: new Number(5), output: false }, // 包裝型 Number (物件)
];

test.each(testArr)(
	"$n is number? $output",
	({ n, output }) => expect(isNum(n)).toBe(output)
);
// ---------- test area ----------
