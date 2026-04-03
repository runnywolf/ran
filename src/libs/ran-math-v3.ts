// ran math v3

//#region print & error
function messageFormat(caller: string, message: string): string {
	return `[RanMath][${caller}] ${message}`;
}

export class RanMathError extends Error {
	constructor(caller: string, message: string) {
		super(messageFormat(caller, message));
	}
}
//#endregion

export function isBigInt(x: unknown): x is bigint { // 是否為 bigint
	return typeof x === "bigint";
}

class Prime { // 質數
	private static readonly primes: bigint[] = [2n];
	
	private static isPrime(n: bigint): boolean { // 是否是質數
		if (n <= 1n) return false;
		for (let i = 0, p = 2n; p*p <= n; p = Prime.getNth(++i)) if (n % p === 0n) return false; // Trial division
		return true;
	}
	
	static getNth(n: number): bigint { // 取得第 n 個質數
		if (!(Number.isInteger(n) && n >= 0)) throw new RanMathError("Prime.getNth", "index must >= 0");
		if (n <= Prime.primes.length - 1) return Prime.primes[n]; // 質數快取
		
		const lastPrime = Prime.primes[Prime.primes.length - 1]; // 最後一個質數
		for (let i = lastPrime + 1n; n > Prime.primes.length - 1; i++) {
			if (Prime.isPrime(i)) Prime.primes.push(i);
		}
		return Prime.primes[n];
	}
}

export class ParamNorm { // 參數標準化
	static NonIntError = class extends RanMathError { // 浮點數 number 轉 bigint 的錯誤
		constructor(caller: string) {
			super(caller, "Parameter must be an integer number.");
		}
	}
	
	static UnsafeIntError = class extends RanMathError { // number 超過範圍會無法表示精確整數
		constructor(caller: string) {
			super(caller, "Parameter must be a safe integer (|n| <= 2^53-1).");
		}
	}
	
	static toBigInt(x: number|bigint, caller: string): bigint { // number|bigint 轉 bigint
		if (isBigInt(x)) return x; // bigint 不須處理, 直接回傳
		
		if (!Number.isInteger(x)) throw new ParamNorm.NonIntError(caller); // x 不是整數
		if (!Number.isSafeInteger(x)) throw new ParamNorm.UnsafeIntError(caller); // number 超過範圍會無法表示精確整數
		return BigInt(x); // 將 number 轉為 bigint
	}
	
	static toFrac(x: number|bigint|Frac, caller: string): Frac { // number|bigint|Frac 轉 Frac
		if (Frac.isFrac(x)) return x; // Frac 不須處理, 直接回傳
		return F(ParamNorm.toBigInt(x, caller)); // number|bigint -> bigint -> Frac
	}
	
	static toSqrtValue(x: number|bigint|Frac|SqrtValue, caller: string): SqrtValue { // number|bigint|Frac|SqrtValue 轉 SqrtValue
		if (SqrtValue.isSqrtValue(x)) return x; // SV 不須處理, 直接回傳
		return SV([ParamNorm.toFrac(x, caller), 1]); // number|bigint|Frac -> Frac -> SV
	}
}

export class BigIntOp { // bigint 擴充運算子
	static FactorizeNonPositiveError = class extends RanMathError { // 無法分解 <= 0 的 bigint
		constructor(caller: string) {
			super(caller, "Cannot factorize a non-positive bigint.");
		}
	}
	
	static abs(x: bigint): bigint { // 絕對值
		return x < 0n ? -x : x;
	}
	
	static gcd(x: bigint, y: bigint): bigint { // 最大公因數, 注: gcd(0, 0) = 0
		x = BigIntOp.abs(x); // x, y 取正值再計算 gcd
		y = BigIntOp.abs(y);
		
		while (y !== 0n) { const swap = x % y; x = y; y = swap; }
		return x;
	}
	
	static factorize(x: bigint): Map<bigint, number> { // 質因數分解
		if (x <= 0n) throw new BigIntOp.FactorizeNonPositiveError("BigIntOp.factorize");
		
		const result = new Map<bigint, number>(); // 質因數 & 次方的 map
		for (let i = 0, p = 2n; p*p <= x; p = Prime.getNth(++i)) { // 從最小的質數開始試除
			let exp = 0;
			while (x % p === 0n) { x /= p; exp++; } // 持續整除到不能整除為止
			if (exp > 0) result.set(p, exp); // 若次方數 >= 1, 紀錄質因數
		}
		if (x !== 1n) result.set(x, 1); // 剩餘的一個質因數
		
		return result;
	}
	
	static getSquareFactor(x: bigint): [bigint, bigint] { // 若 k^2 為 x 的最大平方因數, 回傳 [k, x/k/k]
		if (x === 0n) return [1n, 0n]; // 若 x 為 0, 回傳 [1, 0]
		
		let k = 1n;
		const factors = BigIntOp.factorize(BigIntOp.abs(x));
		for (const [p, exp] of factors) k *= p ** (BigInt(exp) / 2n);
		
		return [k, x/k/k];
	}
}

export function F(n: number|bigint = 0n, d: number|bigint = 1n): Frac { // Frac 工廠
	return new Frac(n, d);
}
export class Frac { // 分數
	static ZeroDenominatorError = class extends RanMathError { // 分母為 0
		constructor(caller: string) {
			super(caller, 'The denominator (param "d") cannot be 0.');
		}
	}
	
	static NonFracStringError = class extends RanMathError { // 字串無法轉成分數的錯誤
		constructor(caller: string, str: string) {
			super(caller, `String "${str}" cannot be converted to Frac.`);
		}
	}
	
	static DivideZeroError = class extends RanMathError { // 除 0 錯誤
		constructor(caller: string) {
			if (caller === "Frac.div") super(caller, "Div 0 error."); // for Frac.div
			else super(caller, "0 cannot be raised to a negative power."); // for Frac.pow
		}
	}
	
	static isFrac(x: unknown): x is Frac { // 檢查 x 是否為 Frac 實例
		return x instanceof Frac;
	}
	
	static fromStr(str: string): Frac { // 將浮點數字串, 分數字串轉為 Frac 實例
		str = str.replaceAll(" ", ""); // 去除所有空白符
		if (/^-?\d+\.\d+$/.test(str)) { // 小數字串 a.b
			const [str_a, str_b] = str.split(".");
			const a = F(BigInt(str_a)); // 整數部分 a
			const b = F(BigInt(str_b), 10n ** BigInt(str_b.length)); // 小數部分 b
			return str_a.includes("-") ? a.sub(b) : a.add(b); // b 的正負要與 a 相同
		}
		if (/^-?\d+\/-?\d+$/.test(str)) { // 分數字串 a/b
			const [str_a, str_b] = str.split("/");
			if (BigInt(str_b) === 0n) throw new Frac.ZeroDenominatorError("Frac.fromStr"); // 分母為 0 錯誤
			return F(BigInt(str_a), BigInt(str_b));
		}
		if (/^-?\d+$/.test(str)) { // 整數字串
			return F(BigInt(str));
		}
		throw new Frac.NonFracStringError("Frac.fromStr", str); // 字串無法轉成分數的錯誤
	}
	
	readonly n: bigint = 0n; // 分子
	readonly d: bigint = 1n; // 分母
	
	constructor(n: number|bigint = 0n, d: number|bigint = 1n) {
		n = ParamNorm.toBigInt(n, "Frac.constructor"); // 將分子和分母的 number 型態轉為 bigint
		d = ParamNorm.toBigInt(d, "Frac.constructor");
		if (d === 0n) throw new Frac.ZeroDenominatorError("Frac.constructor"); // 分母為 0
		
		if (d < 0n) { n = -n; d = -d; } // 若分母為負數, 將 n 和 d 同乘 -1, 保證 d ∈ Z+
		
		const ndGcd = BigIntOp.gcd(n, d); // 約分, 注意: 會把 0/? 變成 0/1
		this.n = n / ndGcd;
		this.d = d / ndGcd;
	}
	
	copy(): Frac { // 複製
		return F(this.n, this.d);
	}
	
	isZero(): boolean { // 是否為 0
		return this.n === 0n;
	}
	
	isInt(): boolean { // 是否是整數
		return this.d === 1n;
	}
	
	toFloat(): number { // 轉為浮點數
		return Number(this.n) / Number(this.d);
	}
	
	toStr(): string { // 轉為字串
		return this.isInt() ? `${this.n}` : `${this.n}/${this.d}`;
	}
	
	toLatex(): string { // 轉為 latex 字串
		return this.isInt() ? `${this.n}` : `\\frac{${this.n}}{${this.d}}`;
	}
	
	add(x: number|bigint|Frac): Frac { // 加法
		x = ParamNorm.toFrac(x, "Frac.add"); // number|bigint|Frac -> Frac
		return F(this.n * x.d + this.d * x.n, this.d * x.d);
	}
	
	sub(x: number|bigint|Frac): Frac { // 減法
		x = ParamNorm.toFrac(x, "Frac.sub"); // number|bigint|Frac -> Frac
		return F(this.n * x.d - this.d * x.n, this.d * x.d);
	}
	
	mul(x: number|bigint|Frac): Frac { // 乘法
		x = ParamNorm.toFrac(x, "Frac.mul"); // number|bigint|Frac -> Frac
		return F(this.n * x.n, this.d * x.d);
	}
	
	div(x: number|bigint|Frac): Frac { // 除法
		x = ParamNorm.toFrac(x, "Frac.div"); // number|bigint|Frac -> Frac
		if (x.isZero()) throw new Frac.DivideZeroError("Frac.div"); // 除 0 錯誤
		return F(this.n * x.d, this.d * x.n);
	}
	
	pow(x: number|bigint): Frac { // 整數次方
		x = ParamNorm.toBigInt(x, "Frac.pow"); // number|bigint -> bigint
		if (x >= 0n) return F(this.n ** x, this.d ** x); // 非負整數次方
		if (this.equal(0)) throw new Frac.DivideZeroError("Frac.pow"); // 0^-n = 1/0^n 造成的除 0 錯誤
		return F(this.d ** -x, this.n ** -x); // 負整數次方
	}
	
	equal(x: number|bigint|Frac): boolean { // 相等
		x = ParamNorm.toFrac(x, "Frac.equal"); // number|bigint|Frac -> Frac
		return this.n === x.n && this.d === x.d;
	}
	
	lt(x: number|bigint|Frac): boolean { // 小於
		x = ParamNorm.toFrac(x, "Frac.lt"); // number|bigint|Frac -> Frac
		return this.n * x.d < this.d * x.n;
	}
}

export function SV(...inputTerms: [number|bigint|Frac, number|bigint|Frac][]) { // SqrtValue 工廠
	return new SqrtValue(...inputTerms);
}
export class SqrtValue { // 帶有根號的常數, √-1 也是一個基底
	static isSqrtValue(x: unknown): x is SqrtValue { // 檢查 x 是否為 SqrtValue 實例
		return x instanceof SqrtValue;
	}
	
	static fromStr(str: string): SqrtValue { // 將字串轉為 SqrtValue 實例, 例: "2/3 s 9/4 + 3.5s12" 會被視為 2/3 √(9/4) + 7/2 √12
		return SV(); // [todo]
	}
	
	readonly terms: Map<bigint, Frac>; // normalized terms
	
	constructor(...terms: [number|bigint|Frac, number|bigint|Frac][]) { // SV([a, b], [c, d], ...) = a√b + c√d + ...
		// this.terms = new Map<bigint, Frac>();
		
		const mapTerms = new Map<bigint, Frac>(); // normalized terms
		for (const term of terms) {
			const [frac_a, b] = SqrtValue.normalizeTerm(term); // 化簡 a√b, 使根號內為整數 & 最簡根號
			mapTerms.set(b, (mapTerms.get(b) ?? F(0)).add(frac_a)); // mapTerms[b] += frac_a, 若 key b 不存在會自動建立
		}
		for (const [b, frac_a] of mapTerms) if (frac_a.equal(0) || b === 0n) mapTerms.delete(b); // 無視所有的 0√b or a√0 項
		this.terms = mapTerms;
	}
	
	copy(): SqrtValue { // 複製
		return SV(); // [todo]
	}
	
	toStr(): string { // 轉為字串
		return ""; // [todo]
	}
	
	toLatex(): string { // 轉為 latex 字串
		return ""; // [todo]
	}
	
	real(): SqrtValue { // 取出實部
		return SV(); // [todo]
	}
	
	imag(): SqrtValue { // 取出虛部
		return SV(); // [todo]
	}
	
	add(x: number|bigint|Frac|SqrtValue): SqrtValue { // 加法
		return SV(); // [todo]
	}
	
	sub(x: number|bigint|Frac|SqrtValue): SqrtValue { // 減法
		return SV(); // [todo]
	}
	
	mul(x: number|bigint|Frac|SqrtValue): SqrtValue { // 乘法
		return SV(); // [todo]
	}
	
	div(x: number|bigint|Frac|SqrtValue): SqrtValue { // 除法
		return SV(); // [todo]
	}
	
	pow(x: number|bigint): SqrtValue { // 整數次方
		return SV(); // [todo]
	}
	
	equal(x: number|bigint|Frac|SqrtValue): boolean { // 相等
		return true; // [todo]
	}
	
	private static normalizeTerm(term: [number|bigint|Frac, number|bigint|Frac]): [Frac, bigint] { // 化簡 a√b, 使根號內為整數 & 最簡根號
		const frac_a = ParamNorm.toFrac(term[0], "SqrtValue.constructor");
		const frac_b = ParamNorm.toFrac(term[1], "SqrtValue.constructor");
		
		const [kn, n] = BigIntOp.getSquareFactor(frac_b.n); // 提出平方根
		const [kd, d] = BigIntOp.getSquareFactor(frac_b.d);
		return [F(kn, kd * d).mul(frac_a), n * d]; // a √(kn*kn*n / kd*kd*d) = a kn/kd √(n/d) = a kn/(kd*d) √(nd)
	}
	
	private addTerm(): void {
		
	}
}

export class Complex { // 浮點複數
	
}

export class Scalar { // 純量, 可能包含 SqrtValue 或 Complex
	
}
