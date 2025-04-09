export function gcd(a, b) { // 最大公因數
	[a, b] = [Math.abs(a), Math.abs(b)];
	while (b != 0) [a, b] = [b, a % b];
	return a;
}

export function lcm(a, b) { // 最小公倍數
	return a / gcd(a, b) * b;
}

export function getFactors(n) { // 回傳 n 的因數 array
	n = Math.abs(n); // 取絕對值
	let factors = []; // n 的因數
	for (let i = 1; i*i <= n; i++) if (n % i === 0) {
		factors.push(i);
		if (i*i != n) factors.push(n / i);
	}
	factors.sort((a, b) => a-b); // 升序排列後回傳
	return factors;
}

export function isPerfectSquare(n) { // 是不是完全平方數
	if (n < 0) return false;
	const sqrt_int = Math.floor(Math.sqrt(n));
	return sqrt_int ** 2 == n;
}

export function isNatural(n) { // n 是否是自然數
	return Number.isInteger(n) && n >= 0;
}

export function getRandomInt(min, max) { // 隨機整數
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Prime { // 質數
	static prime = [2];
	
	static getNth(n) { // 取得第 n 個質數
		if (n < 0) return null;
		if (n <= Prime.prime.length - 1) return Prime.prime[n];
		
		const lastPrime = Prime.prime[Prime.prime.length - 1]; // 最後一個質數
		for (let i = lastPrime + 1; n > Prime.prime.length - 1; i++) {
			if (Prime.isPrime(i)) Prime.prime.push(i);
		}
		return Prime.prime[n];
	}
	
	static isPrime(n) { // 是否是質數
		if (n <= 1) return false;
		for (let i = 0, p = 2; p*p <= n; p = Prime.getNth(++i)) if (n % p === 0) return false;
		return true;
	}
}

export class Frac { // 分數
	static fromStr(str) { // 將字串轉為分數
		const arrayFrac = str.split("/");
		for (const i of arrayFrac) if (!isStrInt(i)) return new Frac(0); // 若某個部份不是整數, 回傳 0
		
		if (arrayFrac.length == 1) { // 輸入整數
			return new Frac(Number(arrayFrac[0]));
		}
		if (arrayFrac.length == 2) { // 輸入分數
			return new Frac(Number(arrayFrac[0]), Number(arrayFrac[1]));
		}
		
		return new Frac(0); // 若輸入非整數或分數, 回傳 0
	}
	
	constructor(n, d = 1) {
		if (typeof n !== "number" || typeof d !== "number") { // 參數不為數字
			throwErr("Frac.constructor", "n & d must be Number.");
			n = 0; d = 1;
		}
		if (!Number.isInteger(n) || !Number.isInteger(d)) { // 參數不為整數
			throwErr("Frac.constructor", "n & d must be integer.");
			n = 0; d = 1;
		}
		if (d == 0) { // 分母為 0
			throwErr("Frac.constructor", "Detect fraction ?/0");
			n = 0; d = 1;
		}
		
		this.n = n; // 分子, n ∈ Z
		this.d = d; // 分母, d ∈ Z+
		this.std(); // 標準化
	}
	
	std() { // 標準化
		if (this.d < 0) { // 若分母為負數, 同乘 -1
			this.n *= -1;
			this.d *= -1;
		}
		
		const nd_gcd = gcd(this.n, this.d);
		if (nd_gcd != 1) { // 約分. 會把 0/? 變成 0/1
			this.n /= nd_gcd;
			this.d /= nd_gcd;
		}
	}
	
	toStr() { // 轉為 debug 字串
		return `${this.n}/${this.d}`;
	}
	toLatex() { // 轉為 latex 字串
		if (this.isInt()) return `${this.n}`;
		return `\\frac{${this.n}}{${this.d}}`;
	}
	toFloat() { // 轉為浮點數
		return this.n / this.d;
	}
	
	isZero() { // 是否為 0
		return this.n == 0;
	}
	isInt() { // 是否是整數
		return this.d == 1
	}
	
	add(frac) { // 分數 + 分數
		return new Frac(this.n * frac.d + this.d * frac.n, this.d * frac.d);
	}
	addi(i) { // 分數 + 整數
		return this.add(new Frac(i));
	}
	
	sub(frac) { // 分數 - 分數
		return new Frac(this.n * frac.d - this.d * frac.n, this.d * frac.d);
	}
	subi(i) { // 分數 - 整數
		return this.sub(new Frac(i));
	}
	
	mul(frac) { // 乘法
		return new Frac(this.n * frac.n, this.d * frac.d);
	}
	muli(i) { // 分數 * 整數
		return this.mul(new Frac(i));
	}
	
	div(frac) { // 除法
		if (frac.isZero()) throwErr("Frac.div", "Div 0 error."); // 除零錯誤
		return new Frac(this.n * frac.d, this.d * frac.n);
	}
	
	pow(i) { // 整數次方
		if (i >= 0) return new Frac(this.n ** i, this.d ** i);
		else return new Frac(this.d ** -i, this.n ** -i); // 負數次方 -> 交換分子分母
	}
	
	sqrt() { // 開根號. 若出現複數或根號無法約分, 回傳 null
		if (!isPerfectSquare(this.n) || !isPerfectSquare(this.d)) return null;
		return new Frac(Math.sqrt(this.n), Math.sqrt(this.d));
	}
	
	equal(frac) { // 比較兩個分數是否相同
		return this.n == frac.n && this.d == frac.d;
	}
	lt(frac) { // 小於
		return this.n * frac.d < this.d * frac.n;
	}
}

export class Matrix { // 矩陣
	// inverse
}

export class SolveQuad { // 解二次方程式
	static TYPE_SQRT = 0; // 解形式為: (n ± m√s) / d  ;  n,s為整數  ;  m,d 為正整數
	static TYPE_FRAC = 1; // 解形式為: frac_r1 , frac_r2
	
	constructor(frac_a, frac_b, frac_c) { // 計算共軛根
		for (const [frac, i] of [[frac_a, "a"], [frac_b, "b"], [frac_c, "c"]]) {
			if (!(frac instanceof Frac)) {
				throwErr("SolveQuad.constructor", `Parameter frac_${i} is not Frac.`);
				frac_a = new Frac(1); frac_b = new Frac(0); frac_c = new Frac(0);
				break;
			}
		}
		if (frac_a.isZero()) { // a 若為 0, 則這不是一個二次函數
			throwErr("SolveQuad.constructor", "0x^2 + bx + c is not a quadratic equation.");
			frac_a = new Frac(1); frac_b = new Frac(0); frac_c = new Frac(0);
		}
		
		const frac_axis = frac_b.muli(-1).div(frac_a.muli(2));
		const frac_sqrt = frac_axis.pow(2).sub(frac_c.div(frac_a));
		this.n = frac_axis.n * frac_sqrt.d;
		this.m = frac_axis.d;
		this.s = frac_sqrt.n * frac_sqrt.d;
		this.d = frac_axis.d * frac_sqrt.d; // 共軛根: (n ± m√s) / d
		
		this.std(); // 標準化
		
		if (this.s == 0 || this.s == 1) { // 如果存在有理數根
			this.frac_r1 = new Frac(this.n + this.m * this.s, this.d);
			this.frac_r2 = new Frac(this.n - this.m * this.s, this.d);
		}
	}
	
	std() { // 標準化
		for (let i = 0, p = 2; p*p <= Math.abs(this.s); p = Prime.getNth(++i)) { // 將根號內的平方數提出
			while (this.s % (p*p) === 0) {
				this.s /= p*p;
				this.m *= p;
			}
		}
		
		const nmd_gcd = gcd(this.n, gcd(this.m, this.d)); // 對 n, m, d 做約分
		this.n /= nmd_gcd;
		this.m /= nmd_gcd;
		this.d /= nmd_gcd;
	}
	
	toStr() { // 解的 debug 字串
		if (this.solutionType() == SolveQuad.TYPE_FRAC) {
			return `${this.frac_r1.toStr()} , ${this.frac_r2.toStr()}`;
		}
		return `(${this.n} ± ${this.m}√${this.s}) / ${this.d}`;
	}
	
	toLatex() { // 解的 latex 字串
		const type = this.solutionType();
		if (type === SolveQuad.TYPE_FRAC) {
			return `${this.frac_r1.toLatex()} ${SCL} ${this.frac_r2.toLatex()}`; // frac_r1 , frac_r2
		}
		if (type === SolveQuad.TYPE_SQRT) {
			if (this.s > 0) {
				let s_latex = "";
				if (this.m != 1) s_latex = `${this.m}`; // 若 m 不為 1, 顯示 m
				s_latex = `\\pm ${s_latex} \\sqrt{${this.s}}`; // 顯示根號和 ± -> ± m√s
				if (this.n != 0) s_latex = `${this.n} ${s_latex}`; // 若 n 不為 0 -> n ± m√s
				if (this.d != 1) s_latex = `\\frac{${s_latex}}{${this.d}}`; // 若 d 不為 1, 顯示分數 -> (n ± m√s) / d
				
				return s_latex; // (n ± m√s) / d
			}
			if (this.s < 0) {
				let frac_re = new Frac(this.n, this.d); // 實部 (frac)
				let frac_im = new Frac(this.m, this.d); // 虛部 (frac)
				
				let s_latex = "";
				if (frac_im.n != 1) s_latex = `${frac_im.n}`; // 若 m 不為 1, 顯示 m
				if (this.s != -1) s_latex = `${s_latex} \\sqrt{${-this.s}}`; // 若 s 不為 -1, 顯示根號
				if (frac_im.d != 1) s_latex = `\\frac{${s_latex}}{${frac_im.d}}`; // 若 d 不為 1, 顯示分數
				s_latex = `\\pm ${s_latex} i`; // ± im i
				if (!frac_re.isZero()) s_latex = `${frac_re.toLatex()} ${s_latex}`; // 若實部不為 0, 變成 re ± im i
				
				return s_latex; // re ± im i
			}
		}
		return "?"; // wtf
	}
	
	solutionType() { // 回傳解的形式
		if (this.frac_r1) return SolveQuad.TYPE_FRAC;
		return SolveQuad.TYPE_SQRT;
	}
}

export class SolveCubic { // 解三次方程式
	static TYPE_3FRAC = 0; // 解形式為: frac_r1 , frac_r2 , frac_r3
	static TYPE_FRAC_QUAD = 1; // 解形式為: frac_r1 , (n ± m√s) / d
	static TYPE_3REAL = 2; // 解形式為: r1 , r2 , r3
	static TYPE_REAL_IM = 3; // 解形式為: r1 , (cRe ± cIm i)
	
	static findRationalRoot(frac_a, frac_b, frac_c, frac_d) { // 是否存在有一根為有理數, 若找不到回傳 null
		if (frac_d.isZero()) return new Frac(0); // d 若為 0, 必存在一根為 0
		
		const coefLcm = lcm(lcm(frac_a.d, frac_b.d), lcm(frac_c.d, frac_d.d));
		const reduct = (frac) => frac.muli(coefLcm).n;
		const [a, b, c, d] = [reduct(frac_a), reduct(frac_b), reduct(frac_c), reduct(frac_d)]; // 將分數通分
		
		const aFactors = getFactors(a); // 尋找有理根
		const dFactors = getFactors(d);
		for (const af of aFactors) for (const df of dFactors) { // 遍歷所有可能的有理根
			const frac_r = new Frac(df, af); // 可能的有理根
			const frac_valueMain = frac_r.pow(2).muli(b).addi(d); // 當 +- 根代入方程式時, b x^2 + d 這部分的值會相同
			const frac_valuePN = frac_r.pow(2).muli(a).addi(c).mul(frac_r); // 當 +- 根代入方程式時, a x^3 + c x 這部分的值會異號
			if (frac_valueMain.add(frac_valuePN).isZero()) return frac_r; // 若正根為方程式的解, 直接回傳
			if (frac_valueMain.sub(frac_valuePN).isZero()) return frac_r.muli(-1); // 若負根為方程式的解, 直接回傳
		}
		return null; // 找不到有理根, 回傳 null
	}
	
	static findRealRoot(a, b, c, d, tor = 1e-6) { // 尋找三次函數的某個實根
		const f = (x) => a*x**3 + b*x*x + c*x + d;
		
		if (a < 0) [a, b, c, d] = [-a, -b, -c, -d]; // 使 a 為正數
		
		let [r1, r2] = [0, 0];
		if (f(0) == 0) return 0;
		else if (f(0) < 0) { // 若 f(0) < 0, 往 +x 的方向搜尋
			r2 = 1; // 搜尋範圍
			while (f(r2) < 0) [r1, r2] = [r2, r2*2]; // 指數擴大範圍
		} else if (f(0) > 0) { // 若 f(0) > 0, 往 -x 的方向搜尋
			r1 = -1;
			while (f(r1) > 0) [r1, r2] = [r1*2, r1];
		}
		
		while (Math.abs(r1-r2) > tor) {
			if (f((r1+r2)/2) > 0) r2 = (r1+r2)/2;
			else r1 = (r1+r2)/2;
		}
		return (r1+r2)/2;
	}
	
	constructor(frac_a, frac_b, frac_c, frac_d) { // 計算共軛根
		for (const [frac, i] of [[frac_a, "a"], [frac_b, "b"], [frac_c, "c"], [frac_d, "d"]]) { // 參數不為 Frac
			if (!(frac instanceof Frac)) {
				throwErr("SolveCubic.constructor", `Parameter frac_${i} is not Frac.`);
				frac_a = new Frac(1); frac_b = new Frac(0); frac_c = new Frac(0); frac_d = new Frac(0);
				break;
			}
		}
		if (frac_a.isZero()) { // a 若為 0, 則這不是一個三次函數
			throwErr("SolveCubic.constructor", "0x^3 + bx^2 + cx + d is not a cubic equation.");
			frac_a = new Frac(1); frac_b = new Frac(0); frac_c = new Frac(0); frac_d = new Frac(0);
		}
		
		const frac_r = SolveCubic.findRationalRoot(frac_a, frac_b, frac_c, frac_d); // 其中一個有理數根
		if (frac_r) { // 若至少一根為有理數
			const A = frac_a;
			const B = A.mul(frac_r).add(frac_b);
			const C = B.mul(frac_r).add(frac_c);
			this.frac_r1 = frac_r;
			this.quad = new SolveQuad(A, B, C);
			
			if (this.quad.solutionType() == SolveQuad.TYPE_FRAC) { // 共軛根的根號可被去除的情況
				this.frac_r2 = this.quad.frac_r1; // k1
				this.frac_r3 = this.quad.frac_r2; // k2
			}
		} else { // 若沒有根為有理數
			const [a, b, c, d] = [frac_a.toFloat(), frac_b.toFloat(), frac_c.toFloat(), frac_d.toFloat()]; // 直接用浮點運算
			const r = SolveCubic.findRealRoot(a, b, c, d); // 其中一個實數根
			const alpha = (-r)/2 + (-b)/(2*a);
			const beta = r*r + (b*r + c)/a;
			const A = alpha;
			const B = alpha*alpha - beta; // k1, k2 = A ± √B
			const B_abs_sqrt = Math.sqrt(Math.abs(B));
			this.r1 = r;
			
			if (B >= 0) {
				this.r2 = A + B_abs_sqrt; // k1
				this.r3 = A - B_abs_sqrt; // k2
			} else {
				this.cRe = A;
				this.cIm = B_abs_sqrt; // k1, k2 = cRe ± cIm i
			}
		}
	}
	
	toStr() { // 解的 debug 字串
		const type = this.solutionType();
		if (type === SolveCubic.TYPE_3FRAC || type === SolveCubic.TYPE_FRAC_QUAD) {
			return `${this.frac_r1.toStr()} , ${this.quad.toStr()}`; // frac_r1 , quad
		}
		if (type === SolveCubic.TYPE_3REAL) {
			return `${this.r1.toFixed(4)} , ${this.r2.toFixed(4)} , ${this.r3.toFixed(4)}`; // r1 , r2 , r3
		}
		if (type === SolveCubic.TYPE_REAL_IM) {
			return `${this.r1.toFixed(4)} , ${this.cRe.toFixed(4)} ± ${this.cIm.toFixed(4)}i`; // r1 , cRe ± cIm i
		}
		return "?";
	}
	
	toLatex() { // 解的 latex 字串
		const type = this.solutionType();
		if (type === SolveCubic.TYPE_3FRAC || type === SolveCubic.TYPE_FRAC_QUAD) {
			return `${this.frac_r1.toLatex()} ${SCL} ${this.quad.toLatex()}`; // frac_r1 , quad
		}
		if (type === SolveCubic.TYPE_3REAL) {
			return `${this.r1.toFixed(4)} ${SCL} ${this.r2.toFixed(4)} ${SCL} ${this.r3.toFixed(4)}`; // r1 , r2 , r3
		}
		if (type === SolveCubic.TYPE_REAL_IM) {
			return `${this.r1.toFixed(4)} ${SCL} ${this.cRe.toFixed(4)} \\pm ${this.cIm.toFixed(4)} i`; // r1 , cRe ± cIm i
		}
		return "?";
	}
	
	solutionType() { // 回傳解的形式
		if (this.frac_r1) {
			if (this.frac_r2) return SolveCubic.TYPE_3FRAC;
			else return SolveCubic.TYPE_FRAC_QUAD;
		} else {
			if (this.r2) return SolveCubic.TYPE_3REAL;
			else return SolveCubic.TYPE_REAL_IM;
		}
	}
	
	getDoubleRoot() { // 回傳二重根, 若沒有則回傳 null
		if (this.solutionType() !== SolveCubic.TYPE_3FRAC) return null; // 只有 3 有理根情況, 才有可能重根
		if (this.frac_r1.equal(this.frac_r2)) return this.frac_r1; // r1 = r2
		if (this.frac_r2.equal(this.frac_r3)) return this.frac_r2; // r2 = r3
		if (this.frac_r3.equal(this.frac_r1)) return this.frac_r3; // r3 = r1
		return null;
	} // 注: quad.s 若為 0 或 1 會被約掉而變成 TYPE_3FRAC, 所以只有 3 有理根情況, 才有可能重根
	
	getTripleRoot() { // 回傳三重根, 若沒有則回傳 null
		if (this.solutionType() !== SolveCubic.TYPE_3FRAC) return null; // 只有 3 有理根情況, 才有可能重根
		if (this.frac_r1.equal(this.frac_r2) && this.frac_r2.equal(this.frac_r3)) return this.frac_r1; // r1 = r2 = r3
		return null;
	}
}

// 以下為字串處理

export const SCL = "~,\\enspace"; // separate comma latex

function throwErr(method, message) {
	console.error(`[RanMath.${method}] ${message}`);
}

export function removePrefix(str, prefix) { // 移除開頭字串
  if (str.startsWith(prefix)) return str.slice(prefix.length);
  return str;
}

export function isStrInt(str) { // 某個字串是否為整數
	return /^-?\d+$/.test(str);
}

export function makeTermLatex(coef, base, pow, firstPos = true) { // 根據係數, 底數名稱, 次方數生成 c b^p 的 latex 字串
	// start: 根據不同型態的輸入, 統一轉為 String
	if (coef instanceof Frac) coef = coef.toLatex();
	else coef = String(coef);
	
	if (base instanceof Frac) {
		if (!base.isInt()) base = `\\left( ${base.toLatex()} \\right)`; // 分數為底數要加括號
		else base = base.toLatex();
	} else base = String(base);
	if (base[0] === "-") base = `\\left( ${base} \\right)`; // 底數有負號要加括號
	
	if (pow instanceof Frac) pow = `${pow.n}/${pow.d}`;
	else pow = String(pow);
	
	if (coef === "0" || base === "0") return (firstPos ? "+" : "") + "0";
	// end: 根據不同型態的輸入, 統一轉為 String
	
	let s_coefLatex = ""; // 係數部分的 latex 字串
	if (coef === "-1") s_coefLatex = (pow === "0" ? "-1" : "-");
	else if (coef === "1") s_coefLatex = (pow === "0" ? "1" : "");
	else s_coefLatex = coef;
	
	if (s_coefLatex[0] !== "-") s_coefLatex = (firstPos ? "+" : "") + s_coefLatex; // 開頭無負號要補 +
	
	if (isStrInt(s_coefLatex[s_coefLatex.length-1]) && isStrInt(base[0])) {
		s_coefLatex += " \\cdot "; // 係數與底數連接處若都為數字, 需要加乘點分離
	}
	
	let s_varLatex = ""; // 變數部分的 latex
	if (pow !== "0") {
		s_varLatex += base; // 次方不為 0, 顯示底數
		if (pow !== "1") s_varLatex = `{${s_varLatex}}^{${pow}}`; // 次方不為 0 or 1, 顯示指數
	}
	
	return s_coefLatex + s_varLatex;
}
