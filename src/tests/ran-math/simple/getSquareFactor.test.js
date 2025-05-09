import { expect, test } from "vitest";
import { getSquareFactor } from "RanMath";

const testArr = [
	{ input: 0, output: 1 },      // 0 的最大平方因數定義為 1
	{ input: 1, output: 1 },      // 1 = 1^2
	{ input: 4, output: 2 },      // 4 = 2^2
	{ input: 18, output: 3 },     // 18 = 9*2, 9 = 3^2
	{ input: -72, output: 6 },    // |-72| = 36*2, 36 = 6^2
	{ input: 97, output: 1 },     // 97 為質數，無平方因數
	{ input: 225, output: 15 },   // 225 = 15^2
	{ input: 1024, output: 32 },  // 1024 = 32^2
	{ input: -50, output: 5 },    // |-50| = 25*2, 25 = 5^2
	{ input: 123456, output: 8 }, // 123456 = 64*1929, 36 = 6^2
];

for (const t of testArr) test(
	`The largest square factor of ${t.input} is ${t.output}^2`,
	() => expect(getSquareFactor(t.input)).toBe(t.output)
);
