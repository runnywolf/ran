import { expect, test } from "vitest";
import { lcm } from "RanMath";

const testArr = [
	{ input: [0, 0], output: 0 },
	{ input: [0, 5], output: 0 },
	{ input: [4, 6], output: 12 },
	{ input: [-4, 6], output: 12 },
	{ input: [21, 6], output: 42 },
	{ input: [123456, 789012], output: 8117355456 },
];

for (const t of testArr) test(
	`lcm(${t.input[0]}, ${t.input[1]}) = ${t.output}`,
	() => expect(lcm(...t.input)).toBe(t.output)
);
