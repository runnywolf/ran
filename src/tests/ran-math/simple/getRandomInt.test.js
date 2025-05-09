import { expect, test } from "vitest";
import { getRandomInt } from "RanMath";

const testNumber = 10;
for (let i = 0; i < testNumber; i++) {
	test(`Random number is in [-5, 5]`, () => {
		const res = getRandomInt(-5, 5);
		expect(res).toBeGreaterThanOrEqual(-5);
		expect(res).toBeLessThanOrEqual(5);
	});
}
