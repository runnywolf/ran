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

export class DivideZeroError extends RanMathError { // div 與 pow 的除零錯誤
	constructor(className: string, op: "div" | "pow") {
		if (op === "div") super(`${className}.${op}`, "Div 0 error.");
		else super(`${className}.${op}`, "0 cannot be raised to a negative power.");
	}
}
//#endregion

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
	static NanError = class extends RanMathError { // NaN error
		constructor(caller: string) {
			super(caller, "Parameter cannot be NaN.");
		}
	}
	
	static InfError = class extends RanMathError { // infinity number error
		constructor(caller: string) {
			super(caller, "Parameter cannot be infinity number.");
		}
	}
	
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
	
	static toFloat(x: number|bigint|Frac, caller: string): number { // 降級為 float number
		if (Frac.is(x)) x = x.toFloat(); // Frac -> number
		else if (typeof x === "bigint") x = Number(x); // bigint -> number, 無視精度損失
		
		if (Number.isNaN(x)) throw new ParamNorm.NanError(caller);
		if (!Number.isFinite(x)) throw new ParamNorm.InfError(caller);
		return x;
	}
	
	static toBigInt(x: number|bigint, caller: string): bigint { // 提升為 bigint
		if (typeof x === "bigint") return x; // bigint 不須處理, 直接回傳
		if (!Number.isInteger(x)) throw new ParamNorm.NonIntError(caller); // x 不是整數
		if (!Number.isSafeInteger(x)) throw new ParamNorm.UnsafeIntError(caller); // number 超過範圍會無法表示精確整數
		return BigInt(x); // 將 number -> bigint
	}
	
	static toFrac(x: number|bigint|Frac, caller: string): Frac { // 提升為 Frac
		if (Frac.is(x)) return x; // Frac 不須處理, 直接回傳
		return F(ParamNorm.toBigInt(x, caller)); // number|bigint -> bigint -> Frac
	}
	
	static toSqrtValue(x: number|bigint|Frac|SqrtValue, caller: string): SqrtValue { // 提升為 SqrtValue
		if (SqrtValue.is(x)) return x; // SqrtValue 不須處理, 直接回傳
		return SV([ParamNorm.toFrac(x, caller), 1]); // number|bigint|Frac -> Frac -> SqrtValue
	}
	
	static toComplex(x: number|bigint|Frac|SqrtValue|Complex, caller: string): Complex { // 降級為 Complex
		if (Complex.is(x)) return x; // Complex 不須處理, 直接回傳
		if (SqrtValue.is(x)) return x.toComplex(); // SqrtValue 降級為 Complex
		return CP(ParamNorm.toFloat(x, caller)); // number|bigint|Frac -> float
	}
	
	static toSvOrCp(x: number|bigint|Frac|SqrtValue|Complex|Scalar, caller: string): SqrtValue|Complex { // 優先提升為 SV, 否則降級為 CP
		if (Scalar.is(x)) return x.value; // 取出 Scalar 內的 SV|CP
		if (Complex.is(x)) return x; // Complex 不須處理, 直接回傳
		if (typeof x === "number" && !Number.isSafeInteger(x)) return CP(ParamNorm.toFloat(x, caller)); // non int number -> CP
		return ParamNorm.toSqrtValue(x, caller); // int-number|bigint|Frac -> Frac -> SqrtValue
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
	static InvalidStringError = class extends RanMathError { // 字串無法轉成分數的錯誤
		constructor(caller: string, str: string) {
			super(caller, `String "${str}" cannot be converted to Frac.`);
		}
	}
	
	static ZeroDenominatorError = class extends RanMathError { // 分母為 0
		constructor(caller: string) {
			super(caller, 'The denominator (param "d") cannot be 0.');
		}
	}
	
	static DivideZeroError = class extends DivideZeroError { // 除 0 錯誤
		constructor(op: "div" | "pow") {
			super("Frac", op);
		}
	}
	
	static is(x: unknown): x is Frac { // 檢查 x 是否為 Frac 實例
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
		if (x.isZero()) throw new Frac.DivideZeroError("div"); // 除 0 錯誤
		return F(this.n * x.d, this.d * x.n);
	}
	
	pow(x: number|bigint): Frac { // 整數次方
		x = ParamNorm.toBigInt(x, "Frac.pow"); // number|bigint -> bigint
		if (x >= 0n) return F(this.n ** x, this.d ** x); // 非負整數次方
		if (this.isZero()) throw new Frac.DivideZeroError("pow"); // 0^-n = 1/0^n 造成的除 0 錯誤
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
	
	static UnknownLatexModeError = class extends RanMathError { // 未知的 .toLatex 模式
		constructor(caller: string, mode: string) {
			super(caller, `Unknown mode "${mode}" for ".toLatex(mode)", use "sum" | "i" | "frac" .`);
		}
	}
	
	static NonPositiveBaseError = class extends RanMathError { // 無法取出非正整數基底的分量
		constructor(caller: string) {
			super(caller, "Base must be a positive integer.");
		}
	}
	
	static DivideZeroError = class extends DivideZeroError { // 除 0 錯誤
		constructor(op: "div" | "pow") {
			super("SqrtValue", op);
		}
	}
	
	static is(x: unknown): x is SqrtValue { // 檢查 x 是否為 SqrtValue 實例
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
	private readonly baseFactors: Map<bigint, Set<bigint>>; // √b 的質因數分解
	
	constructor(rawTerms: [number|bigint|Frac, number|bigint|Frac][]) { // SV([a, b], [c, d], ...) = a√b + c√d + ...
		this.terms = new Map<bigint, Frac>();
		this.baseFactors = new Map<bigint, Set<bigint>>();
		
		for (const rawTerm of rawTerms) this.addRawTerm(rawTerm, "SqrtValue.constructor"); // 化簡 a√b 為最簡根式項, 並累加到自身物件
		this.removeZeroTerm(); // 清除所有的 0√b | a√0
	}
	
	isZero(): boolean { // 是否為 0
		return this.terms.size === 0;
	}
	
	toComplex(): Complex { // 轉浮點複數
		let real = 0;
		let imag = 0;
		for (const [b, frac_a] of this.terms) {
			if (b > 0n) real += frac_a.toFloat() * Math.sqrt(Number(b));
			else imag += frac_a.toFloat() * Math.sqrt(Number(-b));
		}
		return CP(real, imag);
	}
	
	toStr(): string { // 轉為字串
		if (this.terms.size === 0) return "0"; // 沒有任何一項就是 0
		
		const arrTerms = Array.from(this.terms).sort(([x, _x], [y, _y]) => { // 排序成 √1 + √2 + ... + √-1 + √-2 + ...
			if (x < 0n === y < 0n) return Number(x < 0n ? y-x : x-y); // √+ 升序排列, √- 降序排列
			return x < 0n ? 1 : -1; // √- 排在 √+ 後面
		});
		return arrTerms.map(([b, frac_a]) => `${frac_a.toStr()} √${b}`).join(" + "); // 轉 debug 字串
	}
	
	toLatex(mode: string = "i"): string { // 轉為 latex 字串
		if (mode === "sum") {
			return "todo";
		}
		if (mode === "i") {
			return "todo";
		}
		if (mode === "frac") {
			return "todo";
		}
		throw new SqrtValue.UnknownLatexModeError("SqrtValue.toLatex", mode);
	}
	
	real(): SqrtValue { // 取出實部
		const sv = SV(); // 建立一個無參數的 sv. 因為 terms 已經是最簡根式, 避免計算 normalizeTerm
		sv.addTermsBy(this, (frac_a, b) => b > 0n ? frac_a : F(0)); // 將所有 √- 都改成 √0, 這樣就只剩實數部分了
		return sv;
	}
	
	imag(): SqrtValue { // 取出虛部
		const sv = SV();
		for (const [b, frac_a] of this.terms) if (b < 0n) sv.addTerm(frac_a, -b, this.getFactors(b)); // 將所有 √+ 都改成 √0, 這樣就只剩虛數部分了
		return sv;
	}
	
	comp(base: bigint, useSqrtBasis: boolean): SqrtValue { // 取出 {1, √base} 其一基底的分量 (component), base 必須是 1 or 質數
		if (base <= 0n) throw new SqrtValue.NonPositiveBaseError("SqrtValue.comp"); // 無法取出非正整數的分量
		
		const sv = SV(); // 例: 1+√6+√3+√-14 = (1+√3)1 + (√3+√-7)√2
		if (useSqrtBasis) {
			for (const [b, frac_a] of this.terms) if (b % base === 0n) { // 根式部分能被 √base 整除就保留
				sv.addTerm(frac_a, b / base, [...this.getFactors(b)].filter(x => x !== base));
			}
		} else {
			sv.addTermsBy(this, (frac_a, b) => (b % base !== 0n) ? frac_a : F(0)); // 根式部分不能被 √base 整除就保留
		}
		return sv;
	}
	
	copy(): SqrtValue { // 複製
		const sv = SV();
		sv.addTermsBy(this, (frac_a, b) => frac_a);
		return sv;
	}
	
	neg(): SqrtValue { // 取負號
		const sv = SV();
		sv.addTermsBy(this, (frac_a, b) => frac_a.neg());
		return sv;
	}
	
	add(x: number|bigint|Frac|SqrtValue): SqrtValue { // 加法
		x = ParamNorm.toSqrtValue(x, "SqrtValue.add"); // number|bigint|Frac|SqrtValue -> SqrtValue
		const sv = this.copy();
		sv.addTermsBy(x, (frac_a, b) => frac_a);
		sv.removeZeroTerm(); // 加法有可能導致某些項被消掉, 需要清除 zero term
		return sv;
	}
	
	sub(x: number|bigint|Frac|SqrtValue): SqrtValue { // 減法
		x = ParamNorm.toSqrtValue(x, "SqrtValue.sub"); // number|bigint|Frac|SqrtValue -> SqrtValue
		const sv = this.copy();
		sv.addTermsBy(x, (frac_a, b) => frac_a.neg());
		sv.removeZeroTerm(); // 減法有可能導致某些項被消掉, 需要清除 zero term
		return sv;
	}
	
	mul(x: number|bigint|Frac|SqrtValue): SqrtValue { // 乘法
		x = ParamNorm.toSqrtValue(x, "SqrtValue.mul"); // number|bigint|Frac|SqrtValue -> SqrtValue
		
		const sv = SV();
		for (const [b1, frac_a1] of this.terms) for (const [b2, frac_a2] of x.terms) { // 將 this 與 x 的每個 term 兩兩相乘再加總
			const newFactors = new Set(this.getFactors(b1)); // 獲取 b1 的質因數分解 (this = a1√b1)
			let k = 1n; // b1 * b2 提出的平方因數 k^2
			for (const b2Factor of x.getFactors(b2)) { // 遍歷 b2 的質因數分解 (x = a2√b2)
				if (newFactors.has(b2Factor)) { // 如果 b1 與 b2 有相同的質因數 p, 代表 √b1b2 可以提出 p^2
					newFactors.delete(b2Factor);
					k *= b2Factor;
				}
				else newFactors.add(b2Factor); // 如果 b1 與 b2 沒有相同的質因數
			}
			if (b1 < 0n && b2 < 0n) k *= -1n; // 如果 b1 與 b2 都為負數, 代表 √b1b2 必須提出 -1
			sv.addTerm(frac_a1.mul(frac_a2).mul(k), (b1 / k) * (b2 / k), newFactors); // a1√b1 * a2√b2 = a1 a2 k √(b1/k * b2/k)
		}
		sv.removeZeroTerm(); // 乘法有可能導致某些項被消掉, 需要清除 zero term
		
		return sv;
	}
	
	div(x: number|bigint|Frac|SqrtValue): SqrtValue { // 除法
		let sv_d = ParamNorm.toSqrtValue(x, "SqrtValue.div"); // 分母
		if (sv_d.isZero()) throw new SqrtValue.DivideZeroError("div"); // div 0 error
		
		let loopCount = 0; // 雖然理論上會收斂, 這個計數用於避免非預期的無窮迴圈
		let sv_n = this.copy(); // 分子
		while (true) {
			let base = 1n;
			for (const [b, frac_a] of sv_d.terms) if (b !== 1n) { base = b; break; } // 找出非 √1 的基底
			if (base === 1n) break; // 如果分母的基底只剩 √1, 代表分母已化簡為有理數, 可以跳出迴圈了
			
			if (base < 0n) base = -1n; // 如果取到的基底是 √-, 就分解 √-1
			else base = [...sv_d.getFactors(base)].reduce((a, b) => a < b ? a : b); // 取出最小的 √+ 質數基底
			
			const alpha = base > 0n ? sv_d.comp(base, false) : sv_d.real(); // 如果分母 base > 0, 則分解為 α + β √base
			const beta = base > 0n ? sv_d.comp(base, true) : sv_d.imag(); // 如果分母 base < 0 (複數), 則分解為 α + β √-1
			
			const sv_base = SV();
			sv_base.addTerm(F(1), base, [base]); // √base
			sv_n = sv_n.mul(alpha.sub(beta.mul(sv_base))); // 分子 <- 分子 * (α - β √base)
			sv_d = alpha.mul(alpha).sub(beta.mul(beta).mul(base)); // 分母 <- (α + β √base) * (α - β √base) = α^2 - β^2 * base; 消去基底 √base
			
			if (++loopCount >= 100) throw new RanMathError("SqrtValue.div", "Unexpected infinity loop error.");
		}
		const frac_d = sv_d.terms.get(1n) as Frac; // 將分母轉為有理數
		return sv_n.mul(F(1).div(frac_d)); // return 分子/分母
	}
	
	pow(x: number|bigint): SqrtValue { // 整數次方
		x = ParamNorm.toBigInt(x, "SqrtValue.pow"); // number|bigint -> bigint
		
		if (x >= 1n) {
			const sv_halfPow = this.pow(x / 2n);
			let sv = sv_halfPow.mul(sv_halfPow);
			if (x % 2n === 1n) sv = sv.mul(this);
			return sv;
		}
		if (x === 0n) return SV([1, 1]); // n^0 = 1
		
		if (this.isZero()) throw new SqrtValue.DivideZeroError("pow"); // 0^-n = 1/0^n 造成的除 0 錯誤
		return SV([1, 1]).div(this.pow(-x)); // n^-x = 1/(n^x)
	}
	
	equal(x: number|bigint|Frac|SqrtValue): boolean { // 相等
		x = ParamNorm.toSqrtValue(x, "SqrtValue.equal"); // number|bigint|Frac|SqrtValue -> SqrtValue
		
		if (this.terms.size !== x.terms.size) return false; // 如果項數不一樣, 必定不相等
		for (const [b, frac_a] of this.terms) if (!frac_a.equal(x.terms.get(b) ?? 0)) return false; // 逐一檢查每個基底的係數是否相等
		return true;
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
	
	private getFactors(b: bigint): Set<bigint> { // 取得基底 b 的質因數分解, 你必須保證 b 一定在 this.terms 或 this.baseFactors 內
		return this.baseFactors.get(b) as Set<bigint>; // 注意: 回傳的是 Set<bigint> 參考
	}
	
	private addTerm(frac_a: Frac, b: bigint, bFactors: Set<bigint> | bigint[]): void { // 將最簡根式項 a√b 累加到自身物件, bFactors 為 b 的質因數分解
		if (frac_a.isZero() || b === 0n) return; // 無視 +0
		
		bFactors = new Set(bFactors); // array 轉 set, 若 bFactors 為 set 則 copy
		
		let frac = this.terms.get(b) ?? F(0); // 讀取 terms[b]
		this.terms.set(b, frac.add(frac_a)); // terms[b] += frac_a, 若 key b 不存在會自動建立
		this.baseFactors.set(b, bFactors); // 保存質因數分解
	} // 注意: addTerm 的參數 frac_a 不需要額外複製, 因為 .add(frac_a) 會回傳新物件
	
	private addRawTerm(rawTerm: [number|bigint|Frac, number|bigint|Frac], caller: string): void { // 化簡 a√b 為最簡根式項, 並累加到自身物件
		const frac_a = ParamNorm.toFrac(rawTerm[0], caller);
		const frac_b = ParamNorm.toFrac(rawTerm[1], caller);
		
		const [kn, n, nFactors] = SqrtValue.getSquareFactor(frac_b.n); // 提出平方根
		const [kd, d, dFactors] = SqrtValue.getSquareFactor(frac_b.d);
		nFactors.push(...dFactors); // n*d 的質因數分解, 由於 frac_b 為最簡分數 (n, d 互質), 所以可以保證 √(nd) 是最簡根式
		
		this.addTerm(F(kn, kd * d).mul(frac_a), n * d, nFactors); // a √(kn*kn*n / kd*kd*d) = a kn/kd √(n/d) = a kn/(kd*d) √(nd)
	}
	
	private addTermsBy(sv: SqrtValue, fn: (frac_a: Frac, b: bigint) => Frac): void { // 用 fn 處理 sv 的所有 terms, 並累加到自身物件
		for (const [b, frac_a] of sv.terms) this.addTerm(fn(frac_a, b), b, sv.getFactors(b));
	}
	
	private removeZeroTerm(): void { // 清除所有的 0√b & a√0
		for (const [b, frac_a] of this.terms) if (frac_a.isZero() || b === 0n) {
			this.terms.delete(b); // 刪除 0√b & a√0 項
			this.baseFactors.delete(b); // 刪除 b 的質因數快取
		}
	}
}

export function CP(real: number = 0, imag: number = 0): Complex { // Complex 工廠
	return new Complex(real, imag);
}
export class Complex { // 浮點複數
	static DivideZeroError = class extends DivideZeroError { // 除 0 錯誤
		constructor(op: "div" | "pow") {
			super("Complex", op);
		}
	}
	
	static eps = 1e-13; // 最大容許誤差, 可以改
	
	static is(x: unknown): x is Complex { // 檢查 x 是否為 Complex 實例
		return x instanceof Complex;
	}
	
	readonly real: number; // 實部
	readonly imag: number; // 虛部
	
	constructor(real: number = 0, imag: number = 0) {
		this.real = Math.abs(real) <= Complex.eps ? 0 : real;
		this.imag = Math.abs(imag) <= Complex.eps ? 0 : imag;
	}
	
	isZero(eps: number = Complex.eps): boolean { // 是否為 0
		return Math.abs(this.real) <= eps && Math.abs(this.imag) <= eps;
	}
	
	toStr(digits: number = 4): string { // 轉為字串, 小數取 digits 位
		const s_real = Complex.floatStr(this.real, digits);
		const s_imag = Complex.floatStr(this.imag, digits);
		return `${s_real} + ${s_imag} i`;
	}
	
	toLatex(digits: number = 4): string { // 轉為 latex 字串, 小數取 digits 位
		return ""; // todo
	}
	
	copy(): Complex { // 複製
		return CP(this.real, this.imag);
	}
	
	neg(): Complex { // 取負號
		return CP(-this.real, -this.imag);
	}
	
	add(x: number|bigint|Frac|SqrtValue|Complex): Complex { // 加法
		x = ParamNorm.toComplex(x, "Complex.add"); // ... -> Complex
		return CP(this.real + x.real, this.imag + x.imag);
	}
	
	sub(x: number|bigint|Frac|SqrtValue|Complex): Complex { // 減法
		x = ParamNorm.toComplex(x, "Complex.sub"); // ... -> Complex
		return CP(this.real - x.real, this.imag - x.imag);
	}
	
	mul(x: number|bigint|Frac|SqrtValue|Complex): Complex { // 乘法
		x = ParamNorm.toComplex(x, "Complex.mul"); // ... -> Complex
		return CP(this.real * x.real - this.imag * x.imag, this.real * x.imag + this.imag * x.real);
	}
	
	div(x: number|bigint|Frac|SqrtValue|Complex): Complex { // 除法
		x = ParamNorm.toComplex(x, "Complex.div"); // ... -> Complex
		if (x.isZero()) throw new Complex.DivideZeroError("div"); // div 0 error
		
		const l = x.real ** 2 + x.imag ** 2;
		return this.mul(CP(x.real / l, -x.imag / l)); // (a+bi)/(c+di) = (a+bi)*(c-di)/(c^2+d^2)
	}
	
	pow(x: number|bigint|Frac): Complex { // 實數次方
		x = ParamNorm.toFloat(x, "Complex.pow"); // number|bigint|Frac -> number
		
		if (this.isZero()) {
			if (x === 0) return CP(1); // 0^0 = 1
			if (x > 0) return CP(0); // 0^+ = 0
			throw new Complex.DivideZeroError("pow"); // 0^- = div 0 error
		}
		
		const rPowX = Math.hypot(this.real, this.imag) ** x; // r^x = |z|^x
		const theta = x * Math.atan2(this.imag, this.real); // θ = x * atan2(z)
		return CP(rPowX * Math.cos(theta), rPowX * Math.sin(theta)); // z^x = r^x cosθ + r^x sinθ
	}
	
	equal(x: number|bigint|Frac|SqrtValue|Complex, eps: number = Complex.eps): boolean { // 相等
		x = ParamNorm.toComplex(x, "Complex.equal"); // ... -> Complex
		return Math.abs(this.real - x.real) <= eps && Math.abs(this.imag - x.imag) <= eps;
	}
	
	private static floatStr(x: number, maxDigits: number): string { // float -> string
		return Intl.NumberFormat("en", { maximumFractionDigits: maxDigits }).format(x);
	}
}

export function SC(x: number|bigint|Frac|SqrtValue|Complex, cloneInput = true): Scalar { // Scalar 工廠
	return new Scalar(x, cloneInput);
}
export class Scalar { // 純量, 可能包含 SqrtValue 或 Complex
	static DivideZeroError = class extends DivideZeroError { // 除 0 錯誤
		constructor(op: "div" | "pow") {
			super("Scalar", op);
		}
	}
	
	static is(x: unknown): x is Scalar { // 檢查 x 是否為 Scalar 實例
		return x instanceof Scalar;
	}
	
	readonly value: SqrtValue|Complex;
	
	constructor(x: number|bigint|Frac|SqrtValue|Complex = 0n, cloneInput = true) { // cloneInput: 是否要複製輸入的 SV|CP 建立 Scalar
		if (cloneInput && (SqrtValue.is(x) || Complex.is(x))) this.value = x.copy(); // 預設會複製 SV|CP
		else this.value = ParamNorm.toSvOrCp(x, "Scalar.constructor"); // 若 toSvOrCp 輸入 num|bigint|F 會產生新物件, SV|CP 則不會
	}
	
	isSqrtValue(): boolean {
		return SqrtValue.is(this.value);
	}
	
	isComplex(): boolean {
		return Complex.is(this.value);
	}
	
	isZero(): boolean { // 是否為 0
		return this.value.isZero();
	}
	
	toStr(): string { // 轉為字串, 無法調整 Complex 的小數點後位數
		return this.value.toStr();
	}
	
	toLatex(): string { // 轉為 latex 字串
		return ""; // todo
	}
	
	real(): Scalar { // 取出實部
		if (this.value instanceof SqrtValue) return SC(this.value.real(), false); // SV.real 會產生新物件, 建立 SC 時不複製
		return SC(this.value.real); // CP.real
	}
	
	imag(): Scalar { // 取出虛部
		if (this.value instanceof SqrtValue) return SC(this.value.imag(), false); // SV.imag 會產生新物件, 建立 SC 時不複製
		return SC(this.value.imag); // CP.imag
	}
	
	copy(): Scalar { // 複製
		return SC(this.value); // copy SV|CP in constructor
	}
	
	neg(): Scalar { // 取負號
		return SC(this.value.neg(), false); // SV.neg & CP.neg 會產生新物件, 建立 SC 時不複製
	}
	
	add(x: number|bigint|Frac|SqrtValue|Complex|Scalar): Scalar { // 加法
		return this.makeOp(x, "add");
	}
	
	sub(x: number|bigint|Frac|SqrtValue|Complex|Scalar): Scalar { // 減法
		return this.makeOp(x, "sub");
	}
	
	mul(x: number|bigint|Frac|SqrtValue|Complex|Scalar): Scalar { // 乘法
		return this.makeOp(x, "mul");
	}
	
	div(x: number|bigint|Frac|SqrtValue|Complex|Scalar): Scalar { // 除法
		return this.makeOp(x, "div");
	}
	
	pow(x: number|bigint): Scalar { // 整數次方
		x = ParamNorm.toBigInt(x, "Scalar.pow"); // number|bigint -> bigint
		if (this.isZero() && x < 0n) throw new Scalar.DivideZeroError("pow"); // 0^-n = 1/0^n 造成的除 0 錯誤
		return SC(this.value.pow(x), false); // SV.pow & CP.pow 會產生新物件, 建立 SC 時不複製
	}
	
	equal(x: number|bigint|Frac|SqrtValue|Complex|Scalar): boolean { // 相等
		let v = this.value;
		x = ParamNorm.toSvOrCp(x, `Scalar.equal`); // ... -> SqrtValue|Complex
		if (SqrtValue.is(v)) return x.equal(v); // 因為無法進行 SV == CP, 所以這邊會將 SV == SV|CP 對調為 SV|CP == SV
		return v.equal(x); // CP == SV|CP 運算
	}
	
	private makeOp(x: number|bigint|Frac|SqrtValue|Complex|Scalar, op: "add"|"sub"|"mul"|"div"): Scalar { // 通用算子
		let v = this.value;
		x = ParamNorm.toSvOrCp(x, `Scalar.${op}`); // ... -> SqrtValue|Complex
		if (op === "div" && x.isZero()) throw new Scalar.DivideZeroError("div"); // div 0 error
		
		if (SqrtValue.is(v)) {
			if (SqrtValue.is(x)) return SC(v[op](x), false); // SV @ SV = SV, SV.<op> 會產生新物件, 建立 SC 時不複製
			v = v.toComplex(); // SV @ CP 會降級為 CP @ CP 運算
		}
		return SC(v[op](x), false); // CP @ SV|CP 運算, CP.<op> 會產生新物件, 建立 SC 時不複製
	}
}

export class Matrix { // 矩陣
	static NonPosIntDimensionError = class extends RanMathError { // 矩陣的維度必須是正整數
		constructor(caller: string, paramName: string, dim: number) {
			super(caller, `Parameter "${paramName}" must be a positive integer dimension, get: ${dim}`);
		}
	}
	
	static DimensionMismatchError = class extends RanMathError { // 矩陣加減法時, 兩個矩陣的列數或行數不一致
		constructor(caller: string, m1: Matrix, m2: Matrix) {
			super(caller, `Matrix dimension mismatch: (${m1.m}, ${m1.n}) +/- (${m2.m}, ${m2.n})`);
		}
	}
	
	static is(x: unknown): x is Matrix { // 檢查 x 是否為 Matrix 實例
		return x instanceof Matrix;
	}
	
	static diag(m: number, a: Scalar = SC(1n), b: Scalar = SC(0n)): Matrix { // 生成對角矩陣, 對角線元素 a 預設為 1, 非對角線元素 b 預設為 0
		m = Matrix.checkDimension(m, "Matrix.diag", "m"); // 保證 m 為正整數
		return new Matrix(m, m, (i, j) => i === j ? a : b); // 複製矩陣元素, 不然整個矩陣的 Scalar 會指向同一個參考
	}
	
	readonly m: number; // 矩陣的列數
	readonly n: number; // 矩陣的行數
	readonly arr: Scalar[][]; // arr \in Scalar^{m \times n}, 這裡宣告 readonly Array 表示不建議修改
	
	constructor(m: number, n: number, elementFn: (i: number, j: number) => Scalar, cloneInput = true) { // cloneInput: 是否要複製 elementFn 回傳的 Scalar
		this.m = Matrix.checkDimension(m, "Matrix.constructor", "m"); // 保證 m, n 為正整數
		this.n = Matrix.checkDimension(n, "Matrix.constructor", "n");
		this.arr = Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => { // 利用 elementFn 建構整個矩陣
			return cloneInput ? elementFn(i, j).copy() : elementFn(i, j); // cloneInput 決定是否要複製 elementFn 回傳的 Scalar
		}));
	}
	
	toStr(): string { // 轉為字串
		return ""; // todo
	}
	
	toLatex(): string { // 轉為 latex 字串
		return ""; // todo
	}
	
	trans(): Matrix { // 轉置
		return new Matrix(this.n, this.m, (i, j) => this.arr[j][i]); // 複製矩陣元素
	}
	
	inverse(): Matrix { // 逆矩陣
		
	}
	
	copy(): Matrix { // 複製
		return new Matrix(this.m, this.n, (i, j) => this.arr[i][j]); // 複製矩陣元素
	}
	
	neg(): Matrix { // 取負號
		return new Matrix(this.m, this.n, (i, j) => this.arr[i][j].neg(), false); // 因為 Scalar.neg 會產生新物件, 不複製矩陣元素
	}
	
	add(matrix: Matrix): Matrix { // 加法
		if (this.m !== matrix.m || this.n !== matrix.n) { // 矩陣加法時, 兩個矩陣的列數或行數不一致
			throw new Matrix.DimensionMismatchError("Matrix.add", this, matrix);
		}
		return new Matrix(this.m, this.n, (i, j) => this.arr[i][j].add(matrix.arr[i][j]), false); // 因為 Scalar.add 會產生新物件, 不複製矩陣元素
	}
	
	sub(matrix: Matrix): Matrix { // 減法
		if (this.m !== matrix.m || this.n !== matrix.n) { // 矩陣減法時, 兩個矩陣的列數或行數不一致
			throw new Matrix.DimensionMismatchError("Matrix.sub", this, matrix);
		}
		return new Matrix(this.m, this.n, (i, j) => this.arr[i][j].sub(matrix.arr[i][j]), false); // 因為 Scalar.sub 會產生新物件, 不複製矩陣元素
	}
	
	mul(matrix: Matrix): Matrix { // 乘法
		
	}
	
	muls(sc: Scalar): Matrix { // 乘常數
		return new Matrix(this.m, this.n, (i, j) => this.arr[i][j].mul(sc), false); // 因為 Scalar.mul 會產生新物件, 不複製矩陣元素
	}
	
	private static checkDimension(dim: number, caller: string, paramName: string): number { // 若 dim 為正整數則回傳 dim, 如果 dim 不是正整數會報錯
		if (!Number.isInteger(dim) || dim <= 0) {
			throw new Matrix.NonPosIntDimensionError(caller, paramName, dim);
		}
		return dim;
	}
}

export const __test__ = { Prime }; // only for test
