import { expect, test } from "vitest";
import { Prime } from "RanMath";

let testArr = [
	{ input: -5, output: NaN },
	{ input: 0, output: 2 },
	{ input: 4, output: 11 },
	{ input: 828, output: 6361 },
	{ input: 11678, output: 124339 },
];
for (const t of testArr) test(
	`[Prime.getNth] No.${t.input} prime number is ${t.output}`,
	() => expect(Prime.getNth(t.input)).toBe(t.output)
);

testArr = [
	{ input: -335, output: false },
	{ input: 1, output: false },
	{ input: 2, output: true },
	{ input: 67939, output: true },
	{ input: 100000, output: false },
];
for (const t of testArr) test(
	`[Prime.isPrime] Is ${t.input} a prime number? ${t.output}`,
	() => expect(Prime.isPrime(t.input)).toBe(t.output)
);
