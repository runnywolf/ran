import { expect, test } from "vitest";
import { lcm } from "RanMath";

const testArr = [
	{ text: "lcm(0, 0)", input: [0, 0], output: 0 },
	{ text: "lcm(0, 5)", input: [0, 5], output: 0 },
	{ text: "lcm(4, 6)", input: [4, 6], output: 12 },
	{ text: "lcm(-4, 6)", input: [-4, 6], output: 12 },
	{ text: "lcm(-21, -6)", input: [21, 6], output: 42 },
	{ text: "lcm(123456, 789012)", input: [123456, 789012], output: 8117355456 },
];

for (const t of testArr) {
	test(t.text, () => expect(lcm(...t.input)).toBe(t.output));
}
