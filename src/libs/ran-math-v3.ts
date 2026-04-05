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
	
	static isPrime(x: bigint): boolean { // 檢查 x 是否是質數
		if (x <= 1n) return false;
		for (let i = 0, p = 2n; p*p <= x; p = Prime.getNth(++i)) if (x % p === 0n) return false; // Trial division
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
	
	static InvalidStringError = class extends RanMathError { // 字串無法轉成分數的錯誤
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
		str = str.replaceAll(" ", ""); // 去除所有空白字符
		
		if (/^-?\d+\.\d+$/.test(str)) { // 小數字串 a.b
			const [str_a, str_b] = str.split(".");
			const a = F(BigInt(str_a)); // 整數部分 a
			const b = F(BigInt(str_b), 10n ** BigInt(str_b.length)); // 小數部分 b
			return str_a.includes("-") ? a.sub(b) : a.add(b); // b 的正負要與 a 相同
		}
		if (/^-?\d+\/-?\d+$/.test(str)) { // 分數字串 a/b
			const [str_a, str_b] = str.split("/");
			if (BigInt(str_b) === 0n) throw new Frac.InvalidStringError("Frac.fromStr", str); // 分母為 0 錯誤
			return F(BigInt(str_a), BigInt(str_b));
		}
		if (/^-?\d+$/.test(str)) { // 整數字串
			return F(BigInt(str));
		}
		throw new Frac.InvalidStringError("Frac.fromStr", str); // 字串無法轉成分數的錯誤
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
	
	copy(): Frac { // 複製
		return F(this.n, this.d);
	}
	
	neg(): Frac { // 取負號
		return F(-this.n, this.d);
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

export function SV(...rawTerms: [number|bigint|Frac, number|bigint|Frac][]) { // SqrtValue 工廠
	return new SqrtValue(rawTerms);
}
export class SqrtValue { // 帶有根號的常數, √-1 也是一個基底
	static InvalidStringError = class extends RanMathError { // 字串無法轉成 SV 的錯誤
		constructor(caller: string, str: string, s_term: string, caughtErrorMessage?: string) {
			let errorMessage = `"${s_term}" in "${str}" cannot be converted to SqrtValue.`;
			if (caughtErrorMessage) errorMessage += `\n-> Caught error: ${caughtErrorMessage}`;
			super(caller, errorMessage);
		}
	}
	
	static NonPositiveBaseError = class extends RanMathError { // 無法取出非正整數基底的分量
		constructor(caller: string) {
			super(caller, "Base must be a positive integer.");
		}
	}
	
	static DivideZeroError = class extends RanMathError { // 除 0 錯誤
		constructor(caller: string) {
			if (caller === "SqrtValue.div") super(caller, "Div 0 error."); // for SqrtValue.div
			else super(caller, "0 cannot be raised to a negative power."); // for SqrtValue.pow
		}
	}
	
	static isSqrtValue(x: unknown): x is SqrtValue { // 檢查 x 是否為 SqrtValue 實例
		return x instanceof SqrtValue;
	}
	
	static fromStr(str: string): SqrtValue { // 將字串轉為 SqrtValue 實例, 例: "2/3 s 9/4 + 3.5s12" 會被視為 2/3 √(9/4) + 7/2 √12
		str = str.replaceAll(" ", ""); // 去除所有空白字符
		
		const rawTerms: [Frac, Frac][] = [];
		for (const s_term of str.split("+")) { // 用 "+" 將輸入字串切分成多個 term 字串
			const segments = s_term.split("s"); // 用 "s" 將 term 字串切分成多個 segment 字串, s_term 只有 "...s..." & "..." 是合法的
			if (segments.length >= 3) throw new SqrtValue.InvalidStringError("SqrtValue.fromStr", str, s_term); // "...s...s.." 視為非法字串
			
			try {
				const toF = (i: number) => Frac.fromStr(segments[i]); // 將第 i 個 segment 轉為 Frac
				if (segments.length === 2 && segments[0] === "") rawTerms.push([F(1), toF(1)]); // "s..." 視為 1√(...)
				else if (segments.length === 2) rawTerms.push([toF(0), toF(1)]); // "...s..." 視為 ...√(...)
				else if (segments.length === 1) rawTerms.push([toF(0), F(1)]); // "..." 視為 ...√1
			}
			catch (e) {
				if (e instanceof Frac.InvalidStringError) {
					throw new SqrtValue.InvalidStringError("SqrtValue.fromStr", str, s_term, e.message);
				}
				throw e; // 將未知錯誤再拋出
			}
		}
		return new SqrtValue(rawTerms); // 避免 SV 工廠展開參數 terms, 所以用 new SqrtValue
	}
	
	private readonly terms: Map<bigint, Frac>; // 最簡根式項
	private readonly baseFactors: Map<bigint, bigint[]>; // √b 的質因數分解
	
	constructor(rawTerms: [number|bigint|Frac, number|bigint|Frac][]) { // SV([a, b], [c, d], ...) = a√b + c√d + ...
		this.terms = new Map<bigint, Frac>();
		this.baseFactors = new Map<bigint, bigint[]>();
		
		for (const rawTerm of rawTerms) this.addRawTerm(rawTerm); // 化簡 a√b 為最簡根式項, 並累加到自身物件
		this.removeZeroTerm(); // 清除所有的 0√b | a√0
	}
	
	isZero(): boolean { // 是否為 0
		return this.terms.size === 0;
	}
	
	toComplex(): Complex { // 轉浮點複數
		return new Complex();
	}
	
	toStr(): string { // 轉為字串
		const arrTerms: [bigint, Frac][] = Array.from(this.terms); // Map 轉 array, 因為要排序再轉字串
		arrTerms.sort(([x, _x], [y, _y]) => { // 排序成 √1 + √2 + ... + √-1 + √-2 + ...
			if (x < 0n === y < 0n) return Number(x < 0n ? y-x : x-y); // √+ 升序排列, √- 降序排列
			return x < 0n ? 1 : -1; // √- 排在 √+ 後面
		});
		
		if (arrTerms.length === 0) return "0"; // 沒有任何一項就是 0
		return arrTerms.map(([b, frac_a]) => `${frac_a.toStr()} √${b}`).join(" + "); // 轉 debug 字串
	}
	
	toLatex(): string { // 轉為 latex 字串
		return ""; // [todo]
	}
	
	real(): SqrtValue { // 取出實部
		const sv = SV();
		for (const [b, frac_a] of this.terms) if (b > 0n) sv.addTerm(frac_a, b);
		return sv;
	}
	
	imag(): SqrtValue { // 取出虛部
		const sv = SV();
		for (const [b, frac_a] of this.terms) if (b < 0n) sv.addTerm(frac_a, -b);
		return sv;
	}
	
	comp(base: bigint, useSqrtBasis: boolean): SqrtValue { // 取出 {1, √base} 其一基底的分量 (component)
		if (base <= 0n) throw new SqrtValue.NonPositiveBaseError("SqrtValue.comp"); // 無法取出非正整數的分量
		
		const sv = SV();
		for (const [b, frac_a] of this.terms) { // 例: 1+√6+√3+√-14 = (1+√3)1 + (√3+√-7)√2
			if (b % base === 0n && useSqrtBasis) sv.addTerm(frac_a, b / base);
			if (b % base !== 0n && !useSqrtBasis) sv.addTerm(frac_a, b);
		}
		return sv;
	}
	
	copy(): SqrtValue { // 複製
		const sv = SV(); // 建立一個無參數的 sv. 因為 terms 已經是最簡根式, 避免計算 normalizeTerm
		for (const [b, frac_a] of this.terms) sv.addTerm(frac_a.copy(), b);
		return sv;
	}
	
	neg(): SqrtValue { // 取負號
		const sv = SV();
		for (const [b, frac_a] of this.terms) sv.addTerm(frac_a.neg(), b);
		return sv;
	}
	
	add(x: number|bigint|Frac|SqrtValue): SqrtValue { // 加法
		x = ParamNorm.toSqrtValue(x, "SqrtValue.add"); // number|bigint|Frac|SqrtValue -> SqrtValue
		const sv = this.copy();
		for (const [b, frac_a] of x.terms) sv.addTerm(frac_a, b);
		sv.removeZeroTerm();
		return sv;
	}
	
	sub(x: number|bigint|Frac|SqrtValue): SqrtValue { // 減法
		x = ParamNorm.toSqrtValue(x, "SqrtValue.sub"); // number|bigint|Frac|SqrtValue -> SqrtValue
		const sv = this.copy();
		for (const [b, frac_a] of x.terms) sv.addTerm(frac_a.neg(), b);
		sv.removeZeroTerm();
		return sv;
	}
	
	mul(x: number|bigint|Frac|SqrtValue): SqrtValue { // 乘法
		x = ParamNorm.toSqrtValue(x, "SqrtValue.mul"); // number|bigint|Frac|SqrtValue -> SqrtValue
		
		const sv = SV();
		for (const [b1, frac_a1] of this.terms) for (const [b2, frac_a2] of x.terms) {
			const gcd = BigIntOp.gcd(b1, b2);
			sv.addTerm(frac_a1.mul(frac_a2).mul(gcd), (b1 / gcd) * (b2 / gcd)); // b1, b2 為最簡根式, 因此同除 gcd 後相乘, 也是最簡根式
		}
		sv.removeZeroTerm();
		
		return sv;
	}
	
	div(x: number|bigint|Frac|SqrtValue): SqrtValue { // 除法
		x = ParamNorm.toSqrtValue(x, "SqrtValue.div"); // number|bigint|Frac|SqrtValue -> SqrtValue
		
		let sv = this.copy(); // 分子
		while (true) {
			let base = 1n;
			for (const [b, frac_a] of x.terms) if (b !== 1n) { base = b; break; } // 找出非 √1 的基底
			if (base === 1n) break; // 如果分母的基底只剩 √1, 代表分母完全不包含根號, 可以跳出迴圈了
			
			if (base < 0n) base = -1n;
			else base = 1n;
			
			const alpha = base > 0n ? x.comp(base, false) : x.real(); // 如果 base > 0, 則分解為 α + β √base
			const beta = base > 0n ? x.comp(base, true) : x.imag(); // 如果 base < 0 (複數), 則分解為 α + β √-1
			
			sv = sv.mul(alpha.sub(SV([1, base]).mul(beta)));
		}
		
		return sv; // [todo]
	}
	
	pow(x: number|bigint): SqrtValue { // 整數次方
		return SV(); // [todo]
	}
	
	equal(x: number|bigint|Frac|SqrtValue): boolean { // 相等
		return true; // [todo]
	}
	
	private static getSquareFactor(x: bigint): [bigint, bigint, bigint[]] { // 若 k^2 為 x 的最大平方因數, 回傳 [k, x/k/k, x/k/k質因數分解]
		if (x === 0n) return [1n, 0n, []]; // 若 x 為 0, 回傳 [1, 0, []]
		
		let k = 1n;
		const bFactors = []; // x/k/k 的質因數分解
		for (const [p, exp] of BigIntOp.factorize(BigIntOp.abs(x))) {
			k *= p ** (BigInt(exp) / 2n); // 提出平方根
			if (exp % 2 === 1) bFactors.push(p); // 紀錄 x/k/k 的質因數
		}
		return [k, x/k/k, bFactors];
	}
	
	private addTerm(frac_a: Frac, b: bigint, bFactors: bigint[]): void { // 將最簡根式項 a√b 累加到自身物件, bFactors 為 b 的質因數分解
		if (frac_a.isZero() || b === 0n) return; // 無視 +0
		
		let frac = this.terms.get(b) ?? F(0); // 讀取 terms[b]
		this.terms.set(b, frac.add(frac_a)); // terms[b] += frac_a, 若 key b 不存在會自動建立
		this.baseFactors.set(b, bFactors); // 保存質因數分解
	}
	
	private addRawTerm(rawTerm: [number|bigint|Frac, number|bigint|Frac]): void { // 化簡 a√b 為最簡根式項, 並累加到自身物件
		const frac_a = ParamNorm.toFrac(rawTerm[0], "SqrtValue.constructor");
		const frac_b = ParamNorm.toFrac(rawTerm[1], "SqrtValue.constructor");
		
		const [kn, n, nFactors] = SqrtValue.getSquareFactor(frac_b.n); // 提出平方根
		const [kd, d, dFactors] = SqrtValue.getSquareFactor(frac_b.d);
		nFactors.push(...dFactors); // n*d 的質因數分解, 由於 frac_b 為最簡分數 (n, d 互質), 所以可以保證 √(nd) 是最簡根式
		
		this.addTerm(F(kn, kd * d).mul(frac_a), n * d, nFactors); // a √(kn*kn*n / kd*kd*d) = a kn/kd √(n/d) = a kn/(kd*d) √(nd)
	}
	
	private removeZeroTerm(): void { // 清除所有的 0√b & a√0
		for (const [b, frac_a] of this.terms) if (frac_a.equal(0) || b === 0n) {
			this.terms.delete(b); // 刪除 0√b & a√0 項
			this.baseFactors.delete(b); // 刪除 b 的質因數快取
		}
	}
}

export class Complex { // 浮點複數
	
}

export class Scalar { // 純量, 可能包含 SqrtValue 或 Complex
	
}

export const __test__ = { Prime }; // only for test
