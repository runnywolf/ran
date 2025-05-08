import { expect, test } from "vitest";
import { gcd } from "RanMath";

const testArr = [
	{ text: "gcd(0, 0)", input: [0, 0], output: 0 },
	{ text: "gcd(0, 45)", input: [0, 45], output: 45 },
	{ text: "gcd(1, -1)", input: [1, -1], output: 1 },
	{ text: "gcd(1, 0)", input: [1, -1], output: 1 },
	{ text: "gcd(-60, 36)", input: [-60, 36], output: 12 },
	{ text: "gcd(-81, -27)", input: [-81, -27], output: 27 },
	{ text: "gcd(123456, 789012)", input: [123456, 789012], output: 12 },
	{ text: "gcd(982451, -578851)", input: [982451, 578851], output: 1 },
];

for (const t of testArr) {
	test(t.text, () => expect(gcd(...t.input)).toBe(t.output));
}
