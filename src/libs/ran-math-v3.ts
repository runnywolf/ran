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
	
	static gcd(x: bigint, y: bigint): bigint { // 最大公因數, gcd(0, 0) = 0
		x = BigIntOp.abs(x); // x, y 取正值再計算 gcd
		y = BigIntOp.abs(y);
		
		while (y !== 0n) { const swap = x % y; x = y; y = swap; }
		return x;
	}
	
	static lcm(x: bigint, y: bigint): bigint { // 最小公倍數, lcm(0, 0) = 0
		if (x === 0n || y === 0n) return 0n;
		return BigIntOp.abs(x / BigIntOp.gcd(x, y) * y);
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
	
	static getFactors(x: bigint): bigint[] { // 回傳 x 的因數 array (升序排列), getFactors(0n) 會回傳 []
		if (x === 0n) return [];
		
		x = BigIntOp.abs(x); // x 取正值再取因數
		const factorMap = BigIntOp.factorize(x); // 將 x 分解為 p1^e1 * p2^e2 * ...
		
		let factors: bigint[] = [1n]; // 已處理完的質因數所能組合出的因數
		for (const [p, exp] of factorMap) {
			const factorNum = factors.length; // 目前累積的因數個數
			for (let k = 1, pPow = p; k <= exp; k++, pPow *= p) { // 舊因數分別乘上 p^1, ..., p^exp, 產生新的因數
				for (let i = 0; i < factorNum; i++) factors.push(factors[i] * pPow); // 舊因數乘上 p^k, 生成新的因數
			}
		}
		
		return factors.sort((a, b) => a < b ? -1 : 1); // 升序排列
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
			const [strA, strB] = str.split(".");
			const a = F(BigInt(strA)); // 整數部分 a
			const b = F(BigInt(strB), 10n ** BigInt(strB.length)); // 小數部分 b
			return strA.includes("-") ? a.sub(b) : a.add(b); // b 的正負要與 a 相同
		}
		if (/^-?\d+\/-?\d+$/.test(str)) { // 分數字串 a/b
			const [strA, strB] = str.split("/");
			if (BigInt(strB) === 0n) throw new Frac.InvalidStringError("Frac.fromStr", str); // 分母為 0 錯誤
			return F(BigInt(strA), BigInt(strB));
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
export class SqrtValue { // 帶有根號的常數, √-1 也視為一個根式生成元
	static InvalidStringError = class extends RanMathError { // 字串無法轉成 SV 的錯誤
		constructor(caller: string, str: string, s_term: string, caughtErrorMessage?: string) {
			let errorMessage = `"${s_term}" in "${str}" cannot be converted to SqrtValue.`;
			if (caughtErrorMessage) errorMessage += `\n-> Caught error: ${caughtErrorMessage}`;
			super(caller, errorMessage);
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
		for (const strTerm of str.split("+")) { // 用 "+" 將輸入字串切分成多個 term 字串
			const segments = strTerm.split("s"); // 用 "s" 將 term 字串切分成多個 segment 字串, strTerm 只有 "...s..." & "..." 是合法的
			if (segments.length >= 3) throw new SqrtValue.InvalidStringError("SqrtValue.fromStr", str, strTerm); // "...s...s.." 視為非法字串
			
			try {
				const toF = (i: number) => Frac.fromStr(segments[i]); // 將第 i 個 segment 轉為 Frac
				if (segments.length === 2 && segments[0] === "") rawTerms.push([F(1), toF(1)]); // "s..." 視為 1√(...)
				else if (segments.length === 2) rawTerms.push([toF(0), toF(1)]); // "...s..." 視為 ...√(...)
				else if (segments.length === 1) rawTerms.push([toF(0), F(1)]); // "..." 視為 ...√1
			}
			catch (e) {
				if (e instanceof Frac.InvalidStringError) {
					throw new SqrtValue.InvalidStringError("SqrtValue.fromStr", str, strTerm, e.message);
				}
				throw e; // 將未知錯誤再拋出
			}
		}
		return new SqrtValue(rawTerms); // 避免 SV 工廠展開參數 terms, 所以用 new SqrtValue
	}
	
	private readonly terms: Map<bigint, Frac>; // 儲存最簡根式項 a1√b1 + a2√b2 + ..., 其中 key 為根式生成元的 bitmask, 保證 a != 0
	private bitToBasis: bigint[]; // 記錄每個 bit 對應的生成元, 會包含 -1, 必為由小到大排序, 有可能存在沒有被任何 term 使用的 basis
	private basisToBit: Map<bigint, number>; // 記錄每個生成元對應的 bit 位置
	// 多數運算不會引入新的 basis; 即使運算結果含有未使用的 basis, 也直接沿用 this 的 basis, 避免頻繁的 remap
	
	constructor(rawTerms: [number|bigint|Frac, number|bigint|Frac][]) { // SV([a, b], [c, d], ...) = a√b + c√d + ...
		const normalizedTerms: [Frac, bigint[]][] = []; // 暫存已化簡的根式項, 等 bitToBasis 建立後再轉成 bitmask
		const basisSet = new Set<bigint>(); // 收集所有 raw term 實際使用到的根式生成元
		for (const rawTerm of rawTerms) {
			const a = ParamNorm.toFrac(rawTerm[0], "SqrtValue.constructor"); // a√b
			const b = ParamNorm.toFrac(rawTerm[1], "SqrtValue.constructor");
			if (a.isZero() || b.isZero()) continue; // 忽略掉 0√b 或是 a√0
			
			const [kn, _, nBasisList] = SqrtValue.getSquareFactor(b.n); // 提出平方根
			const [kd, d, dBasisList] = SqrtValue.getSquareFactor(b.d); // 由於 b 為最簡分數 (n, d 互質), 所以可以保證 √(nd) 是最簡根式
			const basisList = SqrtValue.unionSortedArray(nBasisList, dBasisList); // nd 的生成元集合. 由於 Frac.d 必 > 0, 所以不會聯集兩個 -1 basis
			
			normalizedTerms.push([F(kn, kd * d).mul(a), basisList]); // a √(kn*kn*n / kd*kd*d) = a kn/kd √(n/d) = a kn/(kd*d) √(nd)
			for (const basis of basisList) basisSet.add(basis);
		}
		
		this.bitToBasis = [...basisSet].sort((a, b) => a < b ? -1 : 1); // basis set 轉 sorted basis array
		this.basisToBit = new Map<bigint, number>(this.bitToBasis.map((basis, bit) => [basis, bit])); // 建立 bit index <-> basis 雙向映射
		
		this.terms = new Map<bigint, Frac>();
		for (const [a, basisList] of normalizedTerms) { // 因為要先遍歷完所有 rawTerm 才能確定 basis 順序, 所以最後才做 remap bitmask
			const allOnesMask = (1n << BigInt(basisList.length)) - 1n; // 因為 a√b 的 b 的所有生成元都在 basisList 內
			this.addTerm(a, this.remapBitmask(allOnesMask, basisList)); // 傳入 basisList, 執行 remap
		}
	}
	
	isZero(): boolean { // 是否為 0
		return this.terms.size === 0;
	}
	
	toComplex(): Complex { // 轉浮點複數
		let real = 0;
		let imag = 0;
		for (const [bitmask, a] of this.terms) {
			const b = this.bitmaskToBase(bitmask);
			if (b > 0n) real += a.toFloat() * Math.sqrt(Number(b));
			else imag += a.toFloat() * Math.sqrt(Number(-b));
		}
		return CP(real, imag);
	}
	
	toStr(): string { // 轉為字串
		if (this.isZero()) return "0"; // 沒有任何一項就是 0
		return this.getSortedTerms().map(([a, b]) => `${a.toStr()} √${b}`).join(" + "); // 轉 debug 字串
	}
	
	toLatex(options: { complexForm?: "expand"|"group", fracMode?: "none"|"frac" } = {}): string { // 轉為 latex 字串
		const { complexForm = "group", fracMode = "frac" } = options; // 預設值
		
		let commonDenom = 1n; // 共同分母
		if (fracMode === "frac") { // 如果分母需要通分
			for (const a of this.terms.values()) commonDenom = BigIntOp.lcm(commonDenom, a.d); // 對所有 term 的係數分母求 lcm
		}
		
		const ls = new LatexSum();
		if (complexForm === "expand") { // 顯示 a1 + a2√2 + ... + a? i + a?√2 i + ...
			for (const [a, b] of this.getSortedTerms()) {
				const absB = BigIntOp.abs(b);
				const baseLatex = ml.term(absB === 1n ? "1" : `\\sqrt{${absB}}`, b > 0n ? "1" : "i"); // 根號內若為 1 就不顯示根號; 根號內 < 1 需要提出 i
				ls.addTerm(a.mul(commonDenom), baseLatex); // 乘上共同分母後, 加入到 latex sum buffer
			}
		}
		if (complexForm === "group") { // 顯示 a1 + a2√2 + ... + (a? + a?√2 + ...) i
			const lsReal = new LatexSum();
			const lsImag = new LatexSum();
			
			let realTermCount = 0; // 實部項數, 用來決定是否要為實部加上小括號
			for (const [a, b] of this.getSortedTerms()) {
				const absB = BigIntOp.abs(b);
				const baseLatex = absB === 1n ? "1" : `\\sqrt{${absB}}`;
				(b > 0n ? lsReal : lsImag).addTerm(a.mul(commonDenom), baseLatex);
				if (b > 0n) realTermCount++;
			}
			
			let realLatex = lsReal.toLatex();
			if (realTermCount >= 2 && lsImag.toLatex() !== "0") realLatex = ml.delim(realLatex); // 當實部項數 >= 2 並且虛部存在, 實部需要加上括號
			ls.add(realLatex).addTerm(lsImag.toLatex(), "i"); // 將實部和虛部的 latex 加入到 latex sum buffer
		}
		
		return commonDenom === 1n ? ls.toLatex() : `\\frac{${ls.toLatex()}}{${commonDenom}}`; // 如果共同分母不是 1, 需要轉為分數形式
	}
	
	real(): SqrtValue { // 取出實部
		const [sv] = SqrtValue.createEmptySvWithMergedBasis(this); // 直接沿用 this 的 basis
		sv.addTermsBy(this, (a, bitmask) => this.isNegativeBase(bitmask) ? [F(0)] : [a]); // 只保留 √+
		return sv;
	}
	
	imag(): SqrtValue { // 取出虛部
		const [sv] = SqrtValue.createEmptySvWithMergedBasis(this); // 直接沿用 this 的 basis
		if (!this.basisToBit.has(-1n)) return sv; // this 為實數時提前回傳 0, 但仍然沿用 basis; 也避免後續假設 bit 0 為 -1
		
		sv.addTermsBy(this, (a, bitmask) => this.isNegativeBase(bitmask) ? [a, bitmask & ~1n] : [F(0)]); // 只保 √-, 並移除 √-1, 得到虛部係數
		return sv; // 若 basis -1 存在, 由於 bitToBasis 為升序, 所以 bitmask 最低位必為 basis -1
	}
	
	conj(basis: bigint = -1n): SqrtValue { // 對指定根式生成元做共軛, 將含該生成元的項取負號, basis 若為 -1 就是複共軛, 必須輸入 -1 或質因數
		const bit = this.basisToBit.get(basis);
		if (bit === undefined) return this.copy(); // 若 basis 不存在, 共軛後值不變
		
		const basisMask = 1n << BigInt(bit);
		const [sv] = SqrtValue.createEmptySvWithMergedBasis(this); // 直接沿用 this 的 basis
		sv.addTermsBy(this, (a, bitmask) => (bitmask & basisMask) !== 0n ? [a.neg()] : [a]); // 若 basis bit 為 1, 代表含有生成元, 取負號
		return sv;
	}
	
	rationalCoef(): Frac { // 取出有理數項的係數
		return this.terms.get(0n) ?? F(0); // 若 bitmask 全為 0, 代表不含任何根式生成元, 即為有理數項
	}
	
	copy(): SqrtValue { // 複製
		const [sv] = SqrtValue.createEmptySvWithMergedBasis(this); // 直接沿用 this 的 basis
		sv.addTermsBy(this, (a, bitmask) => [a]);
		return sv;
	}
	
	neg(): SqrtValue { // 取負號
		const [sv] = SqrtValue.createEmptySvWithMergedBasis(this); // 直接沿用 this 的 basis
		sv.addTermsBy(this, (a, bitmask) => [a.neg()]);
		return sv;
	}
	
	add(x: number|bigint|Frac|SqrtValue): SqrtValue { // 加法
		x = ParamNorm.toSqrtValue(x, "SqrtValue.add"); // number|bigint|Frac|SqrtValue -> SqrtValue
		
		const [sv, remapSv1, remapSv2] = SqrtValue.createEmptySvWithMergedBasis(this, x); // 合併 basis
		sv.addTermsBy(this, (a, bitmask) => [a, remapSv1 ? sv.remapBitmask(bitmask, this.bitToBasis) : bitmask]);
		sv.addTermsBy(x, (a, bitmask) => [a, remapSv2 ? sv.remapBitmask(bitmask, x.bitToBasis) : bitmask]);
		return sv; // 必須先將執行 sv.remapBitmask(bitmask, ...) 才能呼叫 sv.addTermsBy, 否則值會錯誤
	}
	
	sub(x: number|bigint|Frac|SqrtValue): SqrtValue { // 減法
		x = ParamNorm.toSqrtValue(x, "SqrtValue.sub"); // number|bigint|Frac|SqrtValue -> SqrtValue
		
		const [sv, remapSv1, remapSv2] = SqrtValue.createEmptySvWithMergedBasis(this, x); // 合併 basis
		sv.addTermsBy(this, (a, bitmask) => [a, remapSv1 ? sv.remapBitmask(bitmask, this.bitToBasis) : bitmask]);
		sv.addTermsBy(x, (a, bitmask) => [a.neg(), remapSv2 ? sv.remapBitmask(bitmask, x.bitToBasis) : bitmask]);
		return sv; // 必須先將執行 sv.remapBitmask(bitmask, ...) 才能呼叫 sv.addTermsBy, 否則值會錯誤
	}
	
	mul(x: number|bigint|Frac|SqrtValue): SqrtValue { // 乘法
		x = ParamNorm.toSqrtValue(x, "SqrtValue.mul"); // number|bigint|Frac|SqrtValue -> SqrtValue
		
		const [sv, remapSv1, remapSv2] = SqrtValue.createEmptySvWithMergedBasis(this, x); // 合併 basis
		const terms1 = remapSv1 ? this.remapTermsBitmask(sv) : this.terms; // 將 this.terms 的 key 轉換到坐標系 sv.bitToBasis, 這樣才能進行 bitmask 操作
		const terms2 = remapSv2 ? x.remapTermsBitmask(sv) : x.terms; // 將 x.terms 的 key 轉換到坐標系 sv.bitToBasis
		
		for (const [bitmask1, a1] of terms1) for (const [bitmask2, a2] of terms2) { // this & x 的 terms 兩兩相乘並加總
			const squareFactor = sv.bitmaskToBase(bitmask1 & bitmask2); // 兩項共同的 basis 會提出根號成為係數
			sv.addTerm(a1.mul(a2).mul(squareFactor), bitmask1 ^ bitmask2); // square-free 部分保留在根號內
		} // a1√b1 * a2√b2 = a1 a2 k √(b1/k * b2/k), k = squareFactor
		
		return sv;
	}
	
	div(x: number|bigint|Frac|SqrtValue): SqrtValue { // 除法
		let d = ParamNorm.toSqrtValue(x, "SqrtValue.div"); // 分母
		if (d.isZero()) throw new SqrtValue.DivideZeroError("div"); // div 0 error
		
		let n = this.copy(); // 分子
		for (const basis of d.bitToBasis) { // 對分母中每個根式生成元逐一做共軛, 使該生成元在分母中被消去
			if (!d.getUsedBasis().includes(basis)) continue; // 跳過沒有被使用的 basis & 被前面步驟消掉的 basis, 避免額外的乘法
			
			const dConj = d.conj(basis); // 取得分母對 basis 的共軛, 也就是將含該生成元的項取負號
			n = n.mul(dConj); // 分子同步乘上共軛, 保持分式值不變
			d = d.mul(dConj); // 分母乘上共軛後, 該 basis 會被消去; 全部 basis 處理完後分母會變成有理數
		}
		
		return n.mul(F(1).div(d.rationalCoef())); // 先將 SqrtValue 型態的有理數分母轉為 Frac, 再回傳 分子/分母
	}
	
	pow(x: number|bigint): SqrtValue { // 整數次方
		x = ParamNorm.toBigInt(x, "SqrtValue.pow"); // number|bigint -> bigint
		
		if (x >= 1n) {
			const halfPow = this.pow(x / 2n);
			let sv = halfPow.mul(halfPow);
			if (x % 2n === 1n) sv = sv.mul(this);
			return sv;
		}
		if (x === 0n) return SV([1, 1]); // n^0 = 1
		
		if (this.isZero()) throw new SqrtValue.DivideZeroError("pow"); // 0^-n = 1/0^n 造成的除 0 錯誤
		return SV([1, 1]).div(this.pow(-x)); // n^-x = 1/(n^x)
	}
	
	equal(x: number|bigint|Frac|SqrtValue): boolean { // 相等
		x = ParamNorm.toSqrtValue(x, "SqrtValue.equal"); // number|bigint|Frac|SqrtValue -> SqrtValue
		
		const [sv, remapSv1, remapSv2] = SqrtValue.createEmptySvWithMergedBasis(this, x); // 合併 basis
		const terms1 = remapSv1 ? this.remapTermsBitmask(sv) : this.terms; // 將 this.terms 的 key 轉換到坐標系 sv.bitToBasis, 這樣才能進行 bitmask 操作
		const terms2 = remapSv2 ? x.remapTermsBitmask(sv) : x.terms; // 將 x.terms 的 key 轉換到坐標系 sv.bitToBasis
		
		if (terms1.size !== terms2.size) return false; // 因為不可能存在零項, 所以如果項數不一樣, 必定不相等
		for (const [bitmask, a] of terms1) if (!a.equal(terms2.get(bitmask) ?? F(0))) return false; // 用 term1 的 bitmask 查詢 term2 的係數 a, 做比較
		return true;
	}
	
	private static getSquareFactor(x: bigint): [bigint, bigint, bigint[]] { // 若 k^2 為 x 的最大平方因數, 回傳 [k, x/k/k, x/k/k的根式生成元]
		if (x === 0n) return [1n, 0n, []]; // 若 x 為 0, 回傳 [1, 0, []]
		
		let k = 1n;
		const basisList = x < 0n ? [-1n] : []; // x/k/k 的根式生成元. 如果 x < 0, 會包含 basis -1
		for (const [p, exp] of BigIntOp.factorize(BigIntOp.abs(x))) { // 對 x 進行質因數分解
			k *= p ** (BigInt(exp) / 2n); // 提出平方根
			if (exp % 2 === 1) basisList.push(p); // 紀錄 x/k/k 的質因數 (正質數生成元)
		}
		
		basisList.sort((a, b) => a < b ? -1 : 1); // 將生成元由小到大排序, 雖然 BigIntOp.factorize 在實作上保證升序
		return [k, x/k/k, basisList];
	}
	
	private static arrayEqual(arr1: bigint[], arr2: bigint[]): boolean { // 檢查兩個 array 是否相等
		if (arr1.length !== arr2.length) return false;
		for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
		return true;
	}
	
	private static unionSortedArray(arr1: bigint[], arr2: bigint[]): bigint[] { // 合併兩個已排序且元素不重複的 array
		let i = 0, j = 0, result: bigint[] = [];
		while (i < arr1.length && j < arr2.length) {
			if (arr1[i] < arr2[j]) result.push(arr1[i++]);
			else {
				if (arr1[i] === arr2[j]) i++;
				result.push(arr2[j++]);
			}
		}
		while (i < arr1.length) result.push(arr1[i++]);
		while (j < arr2.length) result.push(arr2[j++]);
		return result;
	}
	
	private static createEmptySvWithMergedBasis( // 建立一個具有合併後 basis 的 0 terms SV, 並回傳 sv1, sv 是否需要重新映射 bitmask
		sv1: SqrtValue, sv?: SqrtValue
	): [emptySv: SqrtValue, remapSv1Bitmask: boolean, remapSvBitmask: boolean] {
		if (sv === undefined || SqrtValue.arrayEqual(sv1.bitToBasis, sv.bitToBasis)) { // 如果不提供 sv, 直接沿用 sv1 的 basis
			const emptySv = SV();
			emptySv.bitToBasis = sv1.bitToBasis; // 若 bitToBasis 相同, 代表 sv1, sv, emptySv 的 bitmask 是可以互通的
			emptySv.basisToBit = sv1.basisToBit; // 只有在建立新物件時, 才能修改 bitToBasis & basisToBit, 此處可直接共用 sv1 成員變數的參考
			return [emptySv, false, false]; // 因為 bitToBasis 相同, 所以 sv1 和 sv 的 bitmask 不需要重新映射至 emptySv 的 bitmask
		} // 為了避免 bitToBasis 相同時, bitmask 重映射帶來的額外開銷
		
		const emptySv = SV(); // 若 bitToBasis 不相同, 需要過濾掉沒有使用的 basis, 再合併成新的 bitToBasis, 防止無用的 basis 無限累積
		emptySv.bitToBasis = SqrtValue.unionSortedArray(sv1.getUsedBasis(), sv.getUsedBasis());
		emptySv.basisToBit = new Map<bigint, number>(emptySv.bitToBasis.map((prime, bit) => [prime, bit])); // 建立 bit index <-> basis 雙向映射
		const remapSv1Bitmask = !SqrtValue.arrayEqual(sv1.bitToBasis, emptySv.bitToBasis); // 如果 union basis 與來源 basis 不同, 運算元需要轉換 bitmask
		const remapSvBitmask = !SqrtValue.arrayEqual(sv.bitToBasis, emptySv.bitToBasis);
		return [emptySv, remapSv1Bitmask, remapSvBitmask];
	}
	
	private isNegativeBase(bitmask: bigint): boolean { // 判斷 bitmask 代表的根號底數 b 是否 < 0
		return this.basisToBit.has(-1n) && (bitmask & 1n) !== 0n; // 若 basis -1 存在, 由於 bitToBasis 為升序, 所以 bitmask 最低位必為 basis -1
	}
	
	private getUsedBasis(): bigint[] { // 取得目前所有 term 實際使用到的 basis, 排除沒有用到的 basis
		let usedBitmask = 0n;
		for (const bitmask of this.terms.keys()) usedBitmask |= bitmask; // 對所有 term 的 bitmask key 取 union, 得到使用中 basis 的 union mask
		
		const usedBasis: bigint[] = [];
		for (let bit = 0, mask = usedBitmask; mask > 0n; bit++, mask >>= 1n) if ((mask & 1n) !== 0n) { // 從低位到高位逐一檢查使用中的 bit
			usedBasis.push(this.bitToBasis[bit]); // bit 轉 basis
		}
		return usedBasis;
	}
	
	private remapBitmask(bitmask: bigint, bitToBasis: bigint[]): bigint { // 將 bitmask, bitToBasis 映射到 newBitmask, this.bitToBasis
		let newBitmask = 0n;
		for (let bit = 0, mask = bitmask; mask > 0n; bit++, mask >>= 1n) if ((mask & 1n) !== 0n) { // 從低位到高位逐一檢查使用中的 bit
			const newBit = this.basisToBit.get(bitToBasis[bit]); // 舊的 bit 位置 -> basis -> 新的 bit 位置
			if (newBit === undefined) throw new RanMathError("SqrtValue.remapBitmask", `Unregistered basis.`); // 必須保證 basis 都存在
			newBitmask |= 1n << BigInt(newBit); // 新的 bit 位置 -> 新的 bitmask
		}
		return newBitmask;
	}
	
	private remapTermsBitmask(sv: SqrtValue): Map<bigint, Frac> { // 將 this.terms 內所有的 bitmask key 轉換到坐標系 sv.bitToBasis
		const newTerms = new Map<bigint, Frac>();
		for (const [bitmask, a] of this.terms) newTerms.set(sv.remapBitmask(bitmask, this.bitToBasis), a);
		return newTerms;
	}
	
	private bitmaskToBase(bitmask: bigint): bigint { // 根據 this.bitToBasis, 將 bitmask 轉換為根號底數 b
		let base = 1n;
		for (let bit = 0, mask = bitmask; mask > 0n; bit++, mask >>= 1n) if ((mask & 1n) !== 0n) {
			base *= this.bitToBasis[bit];
		}
		return base;
	}
	
	private getSortedTerms(): [a: Frac, b: bigint][] { // 將 this.terms 排序成 a1√1 + a2√2 + ... + a?√-1 + a?√-2 + ...
		const arrTerms: [Frac, bigint][] = Array.from(this.terms,
			([bitmask, a]) => [a, this.bitmaskToBase(bitmask)] // bitmask 轉 base, 這樣才能排序
		);
		return arrTerms.sort(([_x, x], [_y, y]) => { // 排序成 √1 + √2 + ... + √-1 + √-2 + ...
			if (x < 0n === y < 0n) return Number(x < 0n ? y-x : x-y); // √+ 升序排列, √- 降序排列
			return x < 0n ? 1 : -1; // √- 排在 √+ 後面
		});
	}
	
	private addTerm(a: Frac, bitmask: bigint): void { // 累加一個 a√b 到 this, b 為 bitmask 形式
		if (a.isZero()) return; // 無視 +0
		
		const oldCoef = this.terms.get(bitmask) ?? F(0); // 舊的 a√b 項的 a
		const newCoef = oldCoef.add(a); // 新的 a√b 項的 a
		
		if (newCoef.isZero()) this.terms.delete(bitmask);
		else this.terms.set(bitmask, newCoef);
	} // 注意: 必須保證 bitmask 對應到坐標系 this.bitToBasis 才能使用 addTerm, 否則值會錯誤
	
	private addTermsBy( // 用 fn 處理 sv 的所有 terms, 並累加到自身物件
		sv: SqrtValue,
		fn: (a: Frac, bitmask: bigint) => [newA: Frac, newBitMask?: bigint], // 如果 newBitMask 沒有傳, 會沿用原本的 bitmask
	): void {
		for (const [bitmask, a] of sv.terms) {
			const [newA, newBitmask] = fn(a, bitmask);
			this.addTerm(newA, newBitmask ?? bitmask);
		}
	} // 注意: 必須保證 bitmask 對應到坐標系 this.bitToBasis 才能使用 addTermsBy, 否則值會錯誤
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
		this.real = ParamNorm.toFloat(Math.abs(real) <= Complex.eps ? 0 : real, "Complex.constructor");
		this.imag = ParamNorm.toFloat(Math.abs(imag) <= Complex.eps ? 0 : imag, "Complex.constructor");
	}
	
	isZero(eps: number = Complex.eps): boolean { // 是否為 0
		return Math.abs(this.real) <= eps && Math.abs(this.imag) <= eps;
	}
	
	toStr(digits: number = 4): string { // 轉為字串, 小數取 digits 位
		const realStr = ml.floatToStr(this.real, digits);
		const imagStr = ml.floatToStr(this.imag, digits);
		return `${realStr} + ${imagStr} i`;
	}
	
	toLatex(digits: number = 4): string { // 轉為 latex 字串, 小數取 digits 位
		const realLatex = ml.floatToStr(this.real, digits);
		const imagLatex = ml.floatToStr(this.imag, digits);
		return new LatexSum().add(realLatex).addTerm(imagLatex, "i").toLatex();
	}
	
	conj(): Complex { // 複共軛
		return CP(this.real, -this.imag);
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
	
	isZero(): boolean { // 是否為 0
		return this.value.isZero();
	}
	
	toStr(): string { // 轉為字串, 無法調整 Complex 的小數點後位數
		return this.value.toStr();
	}
	
	toLatex(): string { // 轉為 latex 字串, 無法調整 Complex 的小數點後位數
		return this.value.toLatex();
	}
	
	real(): Scalar { // 取出實部
		if (this.value instanceof SqrtValue) return SC(this.value.real(), false); // SV.real 會產生新物件, 建立 SC 時不複製
		return SC(this.value.real); // CP.real
	}
	
	imag(): Scalar { // 取出虛部
		if (this.value instanceof SqrtValue) return SC(this.value.imag(), false); // SV.imag 會產生新物件, 建立 SC 時不複製
		return SC(this.value.imag); // CP.imag
	}
	
	conj(): Scalar { // 複共軛
		return SC(this.value.conj(), false); // SV.conj & CP.conj 會產生新物件, 建立 SC 時不複製
	}
	
	copy(): Scalar { // 複製
		return SC(this.value); // copy SV & CP in constructor
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

interface MatrixElement<T> { // 定義矩陣元素
	isZero(): boolean;
	toStr(): string;
	toLatex(options?: Record<string, unknown>): string; // 可以額外定義 T.toLatex(option) 控制矩陣元素的 latex 語法風格
	copy(): T;
	neg(): T;
	add(x: T): T;
	sub(x: T): T;
	mul(x: T): T;
	div(x: T): T;
}
export class Matrix<T extends MatrixElement<T>> { // 矩陣
	static NonPosIntDimensionError = class extends RanMathError { // 矩陣的維度必須是正整數
		constructor(caller: string, paramName: string, dim: number) {
			super(caller, `Parameter "${paramName}" must be a positive integer dimension, got ${dim}`);
		}
	}
	
	static RowIndexError = class extends RanMathError { // row index 不為整數 0 ~ m-1
		constructor(caller: string, paramName: string, m: number, i: number) {
			super(caller, `Parameter "${paramName}" must be an integer in [${0}, ${m-1}], got ${i}`);
		}
	}
	
	static InverseNonSquareMatrixError = class extends RanMathError { // 只有方陣才能求逆
		constructor(caller: string, m1: { m: number, n: number }) {
			super(caller, `Non-square matrix cannot be inverted, got (${m1.m}, ${m1.n})`);
		}
	}
	
	static InverseSingularMatrixError = class extends RanMathError { // 只有非奇異矩陣才能求逆
		constructor(caller: string) {
			super(caller, `Singular matrix (or nearly) cannot be inverted.`);
		}
	}
	
	static AddDimensionMismatchError = class extends RanMathError { // 矩陣加減法時, 兩個矩陣的列數或行數不一致
		constructor(caller: string, m1: { m: number, n: number }, m2: { m: number, n: number }) {
			super(caller, `Matrix dimension mismatch: (${m1.m}, ${m1.n}) +/- (${m2.m}, ${m2.n})`);
		}
	}
	
	static MulDimensionMismatchError = class extends RanMathError { // 矩陣乘法時, 兩個矩陣的列數或行數無法對上
		constructor(caller: string, m1: { m: number, n: number }, m2: { m: number, n: number }) {
			super(caller, `Matrix dimension mismatch: (${m1.m}, ${m1.n}) * (${m2.m}, ${m2.n})`);
		}
	}
	
	static is(x: unknown): x is Matrix<any> { // 檢查 x 是否為 Matrix 實例
		return x instanceof Matrix;
	}
	
	static diag<T extends MatrixElement<T>>(m: number, a: T, b: T): Matrix<T> { // 生成對角矩陣, 對角線元素為 a, 非對角線元素為 b
		Matrix.checkDimension(m, "Matrix.diag", "m"); // 保證 m 為正整數
		return new Matrix(m, m, (i, j) => i === j ? a : b); // 複製矩陣元素, 不然整個矩陣的物件 T 會指向同一個參考
	}
	
	readonly m: number; // 矩陣的列數
	readonly n: number; // 矩陣的行數
	readonly arr: T[][]; // arr \in T^{m \times n}, 這裡宣告 readonly Array 表示不建議修改
	
	constructor(m: number, n: number, elementFn: (i: number, j: number) => T, cloneInput = true) { // cloneInput: 是否要複製 elementFn 回傳的 T
		this.m = Matrix.checkDimension(m, "Matrix.constructor", "m"); // 保證 m, n 為正整數
		this.n = Matrix.checkDimension(n, "Matrix.constructor", "n");
		this.arr = Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => { // 利用 elementFn 建構整個矩陣
			return cloneInput ? elementFn(i, j).copy() : elementFn(i, j); // cloneInput 決定是否要複製 elementFn 回傳的 T
		}));
	}
	
	toStr(): string { // 轉為字串
		const strArr = this.arr.map(rowI => rowI.map(aij => aij.toStr())); // 將矩陣的每個元素轉為 string
		for (let j = 0; j < this.n; j++) {
			const colWidth = Math.max(...strArr.map(rowI => rowI[j].length)); // 計算行寬
			for (let i = 0; i < this.m; i++) strArr[i][j] = strArr[i][j].padStart(colWidth); // 將同一欄的元素補齊到相同寬度, 使各列對齊
		}
		return strArr.map(rowI => `| ${rowI.join(" | ")} |`).join("\n"); // 將每一列加上左右邊界與分隔線後合併
	}
	
	toLatex(mode: "m"|"pm"|"bm"|"vm" = "bm", options: Record<string, unknown> = {}): string { // 轉為 latex 字串, 會將 options 傳入 MatrixElement.toLatex
		let latex = this.arr.map(rowI => rowI.map(aij => aij.toLatex(options)).join("&")).join("\\\\"); // 插入 latex 矩陣語法的元素分隔符
		latex = `\\begin{${mode}atrix}${latex}\\end{${mode}atrix}`; // latex 矩陣語法
		if (mode === "bm") latex = `\\!${latex}\\!`; // 因為 bmatrix 的左右間距太寬了, 減少一點
		if (latex.includes("\\frac")) latex = `\\def\\arraystretch{1.35}${latex}\\def\\arraystretch{1}`; // 如果矩陣元素包含分數, 則增加列距
		return latex;
	} // 例子: mode = "bm" 會生成 \begin{bmatrix} ... \end{bmatrix}
	
	swapRow(i: number, j: number): void { // 矩陣列運算: 交換 i, j 兩列 (不回傳新矩陣)
		this.checkRowIndex(i, "Matrix.swapRow", "i");
		this.checkRowIndex(j, "Matrix.swapRow", "j");
		[this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
	}
	
	scaleRow(i: number, x: T): void { // 矩陣列運算: 列 i 乘常數 x (不回傳新矩陣)
		this.checkRowIndex(i, "Matrix.scaleRow", "i");
		for (let [k, aik] of this.arr[i].entries()) this.arr[i][k] = aik.mul(x);
	}
	
	addRow(i: number, j: number, x: T): void { // 矩陣列運算: 列 i 乘常數 x 加到列 j (不回傳新矩陣)
		this.checkRowIndex(i, "Matrix.addRow", "i");
		this.checkRowIndex(j, "Matrix.addRow", "j");
		for (let [k, aik] of this.arr[i].entries()) this.arr[j][k] = this.arr[j][k].add(aik.mul(x));
	}
	
	trans(): Matrix<T> { // 轉置
		return new Matrix(this.n, this.m, (i, j) => this.arr[j][i]); // 複製矩陣元素
	}
	
	inverse(zero: T, one: T): Matrix<T> { // 逆矩陣, 需要提供泛型 T 的 0/1 元素
		if (this.m !== this.n) throw new Matrix.InverseNonSquareMatrixError("Matrix.inverse", this);
		
		const m = this.m; // m*m 方陣
		let matSimplify = this.copy(); // 執行簡化列運算的矩陣
		let matInverse = Matrix.diag(m, one, zero); // 反矩陣的計算結果, 初始化為 I (Gauss-Jordan Elimination)
		
		for (let i = 0; i < m; i++) { // 消去原矩陣的下三角部分
			let swapI = i;
			while (matSimplify.arr[swapI][i].isZero()) { // 若對角線元素為 0, 尋找適合交換的列編號
				swapI++;
				if (swapI >= m) throw new Matrix.InverseSingularMatrixError("Matrix.inverse"); // 若找不到適合交換的列, 矩陣為奇異矩陣, 不可逆
			}
			matSimplify.swapRow(i, swapI); // 交換兩列, 使對角線元素不為 0
			matInverse.swapRow(i, swapI);
			
			for (let j = i+1; j < m; j++) {
				const x = matSimplify.arr[j][i].neg().div(matSimplify.arr[i][i]); // 列 i 乘常數 x 加到列 j, 逐漸消去原矩陣的下三角部分
				matSimplify.addRow(i, j, x);
				matInverse.addRow(i, j, x);
			}
		}
		
		for (let i = m-1; i >= 0; i--) for (let j = i-1; j >= 0; j--) { // 消去原矩陣的上三角部分
			const x = matSimplify.arr[j][i].neg().div(matSimplify.arr[i][i]); // 列 i 乘常數 x 加到列 j, 逐漸消去原矩陣的上三角部分
			matInverse.addRow(i, j, x); // 此步驟不需要修改原矩陣也能完成運算
		}
		
		for (let i = 0; i < m; i++) matInverse.scaleRow(i, one.div(matSimplify.arr[i][i])); // 同除對角線
		
		return matInverse;
	}
	
	copy(): Matrix<T> { // 複製
		return new Matrix(this.m, this.n, (i, j) => this.arr[i][j]); // 複製矩陣元素
	}
	
	neg(): Matrix<T> { // 取負號
		return new Matrix(this.m, this.n, (i, j) => this.arr[i][j].neg(), false); // 因為 T.neg 會產生新物件, 不複製矩陣元素
	}
	
	add(matrix: Matrix<T>): Matrix<T> { // 加法
		if (this.m !== matrix.m || this.n !== matrix.n) { // 矩陣加法時, 兩個矩陣的列數或行數不一致
			throw new Matrix.AddDimensionMismatchError("Matrix.add", this, matrix);
		}
		return new Matrix(this.m, this.n, (i, j) => this.arr[i][j].add(matrix.arr[i][j]), false); // 因為 T.add 會產生新物件, 不複製矩陣元素
	}
	
	sub(matrix: Matrix<T>): Matrix<T> { // 減法
		if (this.m !== matrix.m || this.n !== matrix.n) { // 矩陣減法時, 兩個矩陣的列數或行數不一致
			throw new Matrix.AddDimensionMismatchError("Matrix.sub", this, matrix);
		}
		return new Matrix(this.m, this.n, (i, j) => this.arr[i][j].sub(matrix.arr[i][j]), false); // 因為 T.sub 會產生新物件, 不複製矩陣元素
	}
	
	mul(matrix: Matrix<T>): Matrix<T> { // 乘法
		if (this.n !== matrix.m) { // 矩陣乘法時, 兩個矩陣的列數或行數無法對上
			throw new Matrix.MulDimensionMismatchError("Matrix.mul", this, matrix);
		}
		return new Matrix(this.m, matrix.n, (i, j) => {
			let aij = this.arr[i][0].mul(matrix.arr[0][j]);
			for (let k = 1; k < this.n; k++) aij = aij.add(this.arr[i][k].mul(matrix.arr[k][j]));
			return aij;
		}, false); // 因為 T.add 會產生新物件, 不複製矩陣元素
	}
	
	muls(x: T): Matrix<T> { // 乘常數 x
		return new Matrix(this.m, this.n, (i, j) => this.arr[i][j].mul(x), false); // 因為 T.mul 會產生新物件, 不複製矩陣元素
	}
	
	private static checkDimension(dim: number, caller: string, paramName: string): number { // 若 dim 為正整數則回傳 dim, 如果 dim 不是正整數會報錯
		if (!Number.isInteger(dim) || dim <= 0) {
			throw new Matrix.NonPosIntDimensionError(caller, paramName, dim);
		}
		return dim;
	}
	
	private checkRowIndex(i: number, caller: string, paramName: string): void { // 如果 row index 不為整數 0 ~ m-1 會報錯
		if (!Number.isInteger(i) || i < 0 || i >= this.m) {
			throw new Matrix.RowIndexError(caller, paramName, this.m, i);
		}
	}
}

export class SolveQuad { // 解二次方程式 ax^2 + bx + c = 0
	static NonQuadEquationError = class extends RanMathError { // a = 0 時無法視為二次方程式
		constructor(caller: string) {
			super(caller, "0x^2 + bx + c = 0 is not a quadratic equation.");
		}
	}
	
	readonly roots: [Scalar, Scalar];
	
	constructor(a: number|bigint|Frac, b: number|bigint|Frac, c: number|bigint|Frac) {
		const A = SC(ParamNorm.toSvOrCp(a, "SolveQuad.constructor"), false);
		const B = SC(ParamNorm.toSvOrCp(b, "SolveQuad.constructor"), false);
		const C = SC(ParamNorm.toSvOrCp(c, "SolveQuad.constructor"), false);
		
		if (A.isZero()) throw new SolveQuad.NonQuadEquationError("SolveQuad.constructor"); // a = 0 時無法視為二次方程式
		
		const center = B.neg().div(2n).div(A); // -b/2a
		const squareOffset = center.mul(center).sub(C.div(A)); // (-b/2a)^2 - c/a
		const offset = SqrtValue.is(squareOffset.value) ? // √( (-b/2a)^2 - c/a )
			SV([1n, squareOffset.value.rationalCoef()]) : // 因為是有理數, 所以直接把 √1 基底取出, 開根號
			squareOffset.value.pow(0.5); // 浮點數就直接 ^ 0.5 即可
		
		this.roots = [center.sub(offset), center.add(offset)]; // x = -b/2a ± √( (-b/2a)^2 - c/a )
	}
	
	toStr(): string { // 轉為字串
		return this.roots.map(root => root.toStr()).join(" , ");
	}
}

export class SolveCubic { // 解三次方程式 ax^3 + bx^2 + cx + d = 0
	static NonCubicEquationError = class extends RanMathError { // a = 0 時無法視為三次方程式
		constructor(caller: string) {
			super(caller, "0x^3 + bx^2 + cx + d = 0 is not a cubic equation.");
		}
	}
	
	readonly roots: [Scalar, Scalar, Scalar];
	
	constructor(a: number|bigint|Frac, b: number|bigint|Frac, c: number|bigint|Frac, d: number|bigint|Frac) {
		if (SC(a).isZero()) throw new SolveCubic.NonCubicEquationError("SolveCubic.constructor"); // a = 0 時無法視為三次方程式
		
		let roots: [Scalar, Scalar, Scalar] | null = null;
		try { // Frac mode
			const [A, B, C, D] = [a, b, c, d].map(coef => ParamNorm.toFrac(coef, "?")); // 如果所有係數都是有理數, 會走 Frac mode; 否則走 float mode
			const root = SolveCubic.findRationalRoot(A, B, C, D);
			if (root !== null) { // 如果存在有理數根, 會走 Frac mode; 否則走 float mode
				const quadA = A; // a' = a; 若至少一根為有理數, 可以簡化為二次方程式, 再求剩餘兩根
				const quadB = quadA.mul(root).add(B); // b' = a'r + b
				const quadC = quadB.mul(root).add(C); // c' = b'r + c
				const quad = new SolveQuad(quadA, quadB, quadC); // 解二次方程式 a'x^2 + b'x + c'
				roots = [SC(root), ...quad.roots];
			}
		} catch {}
		
		if (roots === null) { // float mode
			const [A, B, C, D] = [a, b, c, d].map(coef => ParamNorm.toFloat(coef, "SolveCubic.constructor"));
			const root = SolveCubic.findRealRoot(A, B, C, D, Complex.eps);
			const quadA = A; // a' = a; 若至少一根為有理數, 可以簡化為二次方程式, 再求剩餘兩根
			const quadB = quadA * root + B; // b' = a'r + b
			const quadC = quadB * root + C; // c' = b'r + c
			const quad = new SolveQuad(quadA, quadB, quadC); // 解二次方程式 a'x^2 + b'x + c'
			roots = [SC(root), ...quad.roots];
		}
		
		if (roots.every(root => root.imag().isZero())) { // 如果三個根都是實根, 則由小排到大
			const toFloat = (sc: Scalar) => (SqrtValue.is(sc.value) ? sc.value.toComplex() : sc.value).real;
			roots.sort((a, b) => toFloat(a) - toFloat(b));
		}
		
		this.roots = roots;
	}
	
	toStr(): string { // 轉為字串
		return this.roots.map(root => root.toStr()).join(" , ");
	}
	
	private static findRationalRoot(a: Frac, b: Frac, c: Frac, d: Frac): Frac|null { // 嘗試尋找有理數根, 若找不到則回傳 null
		if (d.isZero()) return F(0); // d 若為 0, 必存在一根為 0
		
		const coefLcm = BigIntOp.lcm(BigIntOp.lcm(a.d, b.d), BigIntOp.lcm(c.d, d.d));
		const [ia, ib, ic, id] = [a, b, c, d].map(coef => coef.mul(coefLcm).n); // 將三次方程式的係數通分, 轉為整數
		
		for (const af of BigIntOp.getFactors(ia)) for (const df of BigIntOp.getFactors(id)) { // 遍歷所有可能的有理根
			const root = F(df, af); // 可能的有理根
			const fxMain = root.mul(root).mul(ib).add(id); // 當 +- 根代入方程式時, b x^2 + d 這部分的值會相同
			const fxPN = root.mul(root).mul(ia).add(ic).mul(root); // 當 +- 根代入方程式時, a x^3 + c x 這部分的值會異號
			
			if (fxMain.add(fxPN).isZero()) return root; // 若正根為方程式的解, 直接回傳
			if (fxMain.sub(fxPN).isZero()) return root.neg(); // 若負根為方程式的解, 直接回傳
		}
		return null; // 找不到有理根, 回傳 null
	}
	
	private static findRealRoot(a: number, b: number, c: number, d: number, eps: number): number { // 尋找三次方程式的某個實根
		if (Math.abs(d) <= eps) return 0; // d 若為 0, 必存在一根為 0
		
		if (a < 0) [a, b, c, d] = [-a, -b, -c, -d]; // 使 a 為正數
		
		const f = (x: number) => a*x**3 + b*x*x + c*x + d;
		let [r1, r2] = [0, f(0) < 0 ? 1 : -1]; // 搜尋範圍. 因為 a > 0, 如果 f(0) < 0 就搜尋正根, 如果 f(0) > 0 就搜尋負根
		while ((f(r1) < 0) === (f(r2) < 0)) [r1, r2] = [r2, r2*2]; // 如果範圍 [r1, r2] 沒有變號 -> 指數擴大搜尋範圍
		if (r1 > r2) [r1, r2] = [r2, r1]; // 保證 r1 < r2
		
		while (Math.abs(r1-r2) > eps) { // 二分搜
			if (f((r1+r2)/2) > 0) r2 = (r1+r2)/2;
			else r1 = (r1+r2)/2;
		}
		return (r1+r2)/2;
	}
}

export class MakeLatex { // latex 字串處理
	static NonPosIntDimensionError = class extends RanMathError { // 維度必須是正整數
		constructor(caller: string, paramName: string, dim: number) {
			super(caller, `Parameter "${paramName}" must be a positive integer dimension, got ${dim}`);
		}
	}
	
	static floatToStr(x: number, maxDigits: number): string { // float -> string
		let str = x.toFixed(maxDigits);
		if (maxDigits > 0) str = str.replace(/\.?0+$/, ""); // 去除浮點數尾端的 0
		return str === "-0" ? "0" : str;
	}
	
	static removePrefix(str: string, prefix: string): string { // 嘗試移除字串的前綴, 如果字串開頭不是 prefix 則不做任何事
		if (prefix === "") return str;
		return str.startsWith(prefix) ? str.slice(prefix.length) : str;
	}
	
	static removeSuffix(str: string, suffix: string): string { // 嘗試移除字串的後綴, 如果字串結尾不是 suffix 則不做任何事
		if (suffix === "") return str;
		return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
	}
	
	static delim(str: string): string { // 在 latex 字串兩端加上自動調整大小的小括號
		return `\\left(${str}\\right)`;
	}
	
	static term(coef: any, base: any = "1", pow: any = "1"): string { // 自動推導 c b^p 的 latex 字串
		const coefLatex = ml.anyToLatex(coef); // 係數部分
		const baseLatex = ml.anyToLatex(base); // 底數部分
		const powLatex = (Frac.is(pow) && !pow.isInt()) ? `${pow.n}/${pow.d}` : ml.anyToLatex(pow); // 分數次方會顯示 "n/d" 而非分數
		
		const cfg = { ld: false, dot: false, rd: false }; // cfg.ld -> (c)b^p ; cfg.dot -> c \cdot b^p ; cfg.rd -> c(b)^p
		if (ml.hasOuterSign(coefLatex.replace(/^[+-]+|[+-]+$/g, ""))) cfg.ld = true; // coef 的 {...} 區塊外如果包含 +/-, 但忽略首尾, 則需要加左括號
		if (ml.hasOuterSign(baseLatex) || baseLatex.includes("\\frac")) cfg.rd = true; // base 的 {...} 區塊外如果包含 +/-, 或是存在分數, 則需要加右括號
		if (coefLatex === "1" && powLatex === "1") cfg.rd = false; // 例外: 如果是 1 b^1 這種情況, b 一定不用括號
		if (/^[0-9]$/.test(baseLatex[0])) cfg.dot = true; // 底數 base 的開頭若為數字 -> coef \cdot base
		if (cfg.ld || cfg.rd) cfg.dot = false; // 例外: 如果左括號或右括號已經存在, 不需要額外加乘點
		
		let latex; // 生成 b^p 的部分
		if (powLatex === "0" || baseLatex === "1") latex = "1"; // b^0 -> 1 ; 1^p -> 1
		else if (baseLatex === "0") latex = "0"; // 0^p -> 0, 不包含 0^0
		else if (powLatex === "1") latex = cfg.rd ? ml.delim(baseLatex) : baseLatex; // (b)^1 -> (b) ; b^1 -> b
		else latex = `{${cfg.rd ? ml.delim(baseLatex) : baseLatex}}^{${powLatex}}`; // (b)^p ; b^p
		
		if (coefLatex === "0" || latex === "0") latex = "0"; // 0b^p -> 0 ; c0 -> 0
		else if (coefLatex === "1") latex = latex; // 1b^p -> b^p
		else if (coefLatex === "-1") latex = `-${latex}`; // -1b^p -> -b^p
		else if (latex === "1") latex = coefLatex; // c1 -> c
		else latex = (cfg.ld ? ml.delim(coefLatex) : coefLatex) + (cfg.dot ? "\\cdot" : "") + latex; // c b^p ; (c)b^p ; c \cdot b^p
		
		return latex;
	}
	
	static equationSystem( // 生成聯立方程式的 LaTeX 字串
		row: number, // row 為方程式列數
		col: number, // col 為每列的項數
		coefFn: (i: number, j: number) => any, // 回傳第 i 列第 j 項的係數
		baseFn: (i: number, j: number) => any, // 回傳第 i 列第 j 項的未知數或底數
		equalFn: (i: number) => any, // 回傳第 i 列等號另一側的值
		equalMode: "none"|"right"|"left" = "right" // 控制等號是否顯示, 以及等號值放左邊或右邊
	): string {
		MakeLatex.checkDimension(row, "MakeLatex.equationSystem", "row"); // 保證 row 為正整數
		MakeLatex.checkDimension(col, "MakeLatex.equationSystem", "col"); // 保證 col 為正整數
		
		let latex = Array.from({ length: row }, (_, i) => { // 逐列生成每一條方程式的 LaTeX
			let addPos = false; // 記錄目前列是否已經出現非零項, 用來判斷正項前面是否要補 "+"
			let equationLatex = Array.from({ length: col }, (_, j) => { // 逐項生成第 i 列的每一個項
				const coefLatex = ml.anyToLatex(coefFn(i, j) ?? "?"); // 取得係數並轉為 LaTeX, null/undefined 以 "?" 代替
				const baseLatex = ml.anyToLatex(baseFn(i, j) ?? "?"); // 取得未知數並轉為 LaTeX, null/undefined 以 "?" 代替
				let termLatex = ml.term(coefLatex, baseLatex); // 將係數與未知數合成單項 LaTeX
				if (termLatex === "0") return ""; // 零項不顯示, 但仍保留欄位位置
				
				if (termLatex[0] !== "-" && addPos) termLatex = `+${termLatex}`; // 非首項且為正項時補上 "+"
				addPos = true; // 標記這一列已經出現至少一個非零項
				return termLatex; // 回傳該項 LaTeX
			}).join("&"); // 用 array 欄位分隔符連接同一列的所有項
			
			const equalLatex = ml.anyToLatex(equalFn(i) ?? "?"); // 取得等號另一側的值並轉為 LaTeX
			if (equalMode === "left") equationLatex = `${equalLatex}&=&${equationLatex}`; // 等號值放左側
			else if (equalMode === "right") equationLatex = `${equationLatex}&=&${equalLatex}`; // 等號值放右側
			return equationLatex; // 回傳第 i 列完整方程式
		}).join("\\\\"); // 用 LaTeX 換列符號連接所有方程式
		
		const colNum = col + (equalMode !== "none" ? 2 : 0); // 若顯示等號, 需要額外加入等號與等號值兩欄
		latex = `\\begin{array}{${"r".repeat(colNum)}}${latex}\\end{array}`; // 建立 array 環境並設定所有欄位靠右對齊
		return `\\left\\{${latex}\\right.`; // 加上左大括號, 右側使用不可見 delimiter
	}
	
	private static checkDimension(dim: number, caller: string, paramName: string): number { // 若 dim 為正整數則回傳 dim, 如果 dim 不是正整數會報錯
		if (!Number.isInteger(dim) || dim <= 0) {
			throw new MakeLatex.NonPosIntDimensionError(caller, paramName, dim);
		}
		return dim;
	}
	
	private static anyToLatex(x: any): string { // 嘗試回傳 x.toLatex(), 如果失敗則回傳 String(x)
		return String(typeof x?.toLatex === "function" ? x.toLatex() : x); // 不會特別處理小數位數
	}
	
	private static hasOuterSign(str: string): boolean { // 字串的 {...} 區塊外是否包含 +, - 兩種符號
		let depth = 0;
		for (const char of str) {
			if (char === "{") depth++;
			else if (char === "}") depth--;
			else if (depth === 0 && (char === "+" || char === "-")) return true;
		}
		return false;
	}
}
const ml = MakeLatex;

export class LatexSum { // 將多個 latex 字串串接為一個和式，並自動處理各項之間的 +/- 連接
	private buffer = ""; // latex string buffer
	
	add(latex: string): LatexSum { // 在尾端串接一個 latex 字串, 可 chaining
		if (["", "0", "+0", "-0"].includes(latex)) return this; // 若為 0 或空字串, 那麼不新增這一項, 但不禁止 "{0}"
		if (latex[0] !== "+" && latex[0] !== "-") latex = `+${latex}`; // 如果 latex 首字元不是 +/-, 補上 "+" (為了將多個 term 連接起來)
		this.buffer += latex; // 串接至 buffer
		return this; // chaining
	}
	
	addTerm(coef: any, base: any = "1", pow: any = "1"): LatexSum { // 等價於 .add(ml.term(coef, base, pow)), 可 chaining
		return this.add(ml.term(coef, base, pow)); // chaining
	}
	
	toLatex(): string { // 回傳連接完成的 latex 語法字串
		if (this.buffer === "") return "0"; // 如果 buffer 沒有任何一項, 回傳 "0"
		return ml.removePrefix(this.buffer, "+"); // 首字元如果出現 "+", 必須移除
	}
}

export const __test__ = { Prime }; // only for test
