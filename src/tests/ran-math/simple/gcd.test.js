import { expect, test } from "vitest";
import { gcd } from "RanMath";

const testArr = [
	{ input: [0, 0], output: 0 },
	{ input: [0, 45], output: 45 },
	{ input: [1, -1], output: 1 },
	{ input: [1, -1], output: 1 },
	{ input: [-60, 36], output: 12 },
	{ input: [-81, -27], output: 27 },
	{ input: [123456, 789012], output: 12 },
	{ input: [982451, 578851], output: 1 },
];

for (const t of testArr) test(
	`gcd(${t.input[0]}, ${t.input[1]}) = ${t.output}`,
	() => expect(gcd(...t.input)).toBe(t.output)
);
