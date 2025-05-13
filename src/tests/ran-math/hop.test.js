import { beforeEach, afterEach, vi, test, expect, describe } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { Hop, F } from "ran-math";

const testArr_isInt = [ // 測資
	{ nf: 2, output: true },
	{ nf: F(-6, 2), output: true },
	{ nf: 2.0, output: true },
	{ nf: 3.5, output: false },
	{ nf: F(-1, 2), output: false },
	{ nf: "3", output: false },
	{ nf: [], output: false },
];
describe("Hop.isInt", () => {
	test.each(testArr_isInt)(
		"Hop.isInt($nf) = $output",
		({ nf, output, error }) => {
			expect(Hop.isInt(nf)).toBe(output)
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_isPosInt = [ // 測資
	{ nf: -2, output: false },
	{ nf: F(-6, 2), output: false },
	{ nf: 2.0, output: true },
	{ nf: 0, output: false },
	{ nf: 3.5, output: false },
	{ nf: F(-1, 2), output: false },
	{ nf: "3", output: false },
	{ nf: [], output: false },
];
describe("Hop.isPosInt", () => {
	test.each(testArr_isPosInt)(
		"Hop.isPosInt($nf) = $output",
		({ nf, output, error }) => {
			expect(Hop.isPosInt(nf)).toBe(output)
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_isNegInt = [ // 測資
	{ nf: -2, output: true },
	{ nf: F(-6, 2), output: true },
	{ nf: 2.0, output: false },
	{ nf: 0, output: false },
	{ nf: -3.5, output: false },
	{ nf: F(-1, 2), output: false },
	{ nf: "3", output: false },
	{ nf: [], output: false },
];
describe("Hop.isNegInt", () => {
	test.each(testArr_isNegInt)(
		"Hop.isNegInt($nf) = $output",
		({ nf, output, error }) => {
			expect(Hop.isNegInt(nf)).toBe(output)
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_isRational = [ // 測資
	{ nf: -2, output: true },
	{ nf: F(-6, 2), output: true },
	{ nf: 2.0, output: true },
	{ nf: 0, output: true },
	{ nf: -3.5, output: false },
	{ nf: F(-1, 2), output: true },
	{ nf: "3", output: false },
	{ nf: [], output: false },
];
describe("Hop.isRational", () => {
	test.each(testArr_isRational)(
		"Hop.isRational($nf) = $output",
		({ nf, output, error }) => {
			expect(Hop.isRational(nf)).toBe(output)
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});
// ---------- test area ----------
