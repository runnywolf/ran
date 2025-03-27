import { Frac, SolveQuad, SolveCubic } from "../libs/RanMath";

const complex = 1000
const getRandomInt = () => Math.floor((Math.random() - 0.5) * complex*2);
const getRandomPosInt = () => Math.floor((Math.random()) * complex + 1);
const getRandomFrac = () => new Frac(getRandomInt(), getRandomPosInt());
const rootsToStr = (roots) => roots.map((root) => root.toStr()).join(" , ");
const frac_0 = new Frac(0);

export function testSolveQuad_fracRoot() {
	const roots = [getRandomFrac(), getRandomFrac()];
	// roots[1] = roots[0] // 重根
	
	roots.sort((a, b) => a.toFloat()-b.toFloat());
	
	const a = getRandomFrac(); if (a.isZero()) return;
	const b = roots[0].add(roots[1]).mul(a).muli(-1);
	const c = roots[0].mul(roots[1]).mul(a);
	
	const testList = [
		new SolveQuad(a, b, c),
	];
	
	for (const quad of testList) {
		const roots_ans = [quad.frac_r1, quad.frac_r2];
		roots_ans.sort((a, b) => a.toFloat()-b.toFloat());
		
		const correct = rootsToStr(roots) === rootsToStr(roots_ans);
		console.log(`${correct ? "." : "x"} | ${rootsToStr(roots)} -> ${rootsToStr(roots_ans)}`);
	}
}

export function testSolveQuad() {
	const a = getRandomFrac(); if (a.isZero()) return;
	const b = getRandomFrac();
	const c = getRandomFrac();
	
	const testList = [
		new SolveQuad(a, b, c),
	];
	
	for (const quad of testList) {
		console.log(`${a.toStr()} , ${b.toStr()} , ${c.toStr()} -> ${quad.toStr()}`);
	}
}

export function testSolveCubic_fracRoot() {
	const roots = [getRandomFrac(), getRandomFrac(), getRandomFrac()];
	// roots[1] = roots[0] // 重根
	
	roots.sort((a, b) => a.toFloat()-b.toFloat());
	
	const a = getRandomFrac(); if (a.isZero()) return;
	const b = roots[0].add(roots[1]).add(roots[2]).mul(a).muli(-1);
	const c = (roots[0].mul(roots[1])).add(roots[1].mul(roots[2])).add(roots[2].mul(roots[0])).mul(a);
	const d = roots[0].mul(roots[1]).mul(roots[2]).mul(a).muli(-1);
	
	const testList = [
		new SolveCubic(a, b, c, d),
	];
	
	for (const cubic of testList) {
		const roots_ans = [cubic.frac_r1, cubic.frac_r2, cubic.frac_r3];
		roots_ans.sort((a, b) => a.toFloat()-b.toFloat());
		
		const correct = rootsToStr(roots) === rootsToStr(roots_ans);
		console.log(`${correct ? "." : "x"} | ${rootsToStr(roots)} -> ${rootsToStr(roots_ans)}`);
	}
}

export function testSolveCubic() {
	const a = getRandomFrac(); if (a.isZero()) return;
	const b = getRandomFrac();
	const c = getRandomFrac();
	const d = getRandomFrac();
	
	const cubic = new SolveCubic(a, b, c, d);
	
	console.log(`${a.toStr()} , ${b.toStr()} , ${c.toStr()} , ${d.toStr()} -> ${cubic.toStr()}`);
}
