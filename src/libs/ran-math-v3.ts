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

/*
export function isNum(value: unknown): value is number { // 是否為數字
	return typeof value === "number";
}

export function isInt(value: unknown): value is number|bigint { // 是否為整數
	return Number.isInteger(value) || isBigInt(value);
}
*/

export function isBigInt(x: unknown): x is bigint { // 是否為 bigint
	return typeof x === "bigint";
}

export class BigIntOp { // bigint 擴充運算子
	public static abs(x: bigint) { // 絕對值
		return x < 0n ? -x : x;
	}
	
	public static gcd(x: bigint, y: bigint): bigint { // 最大公因數, 注: gcd(0, 0) = 0
		x = BigIntOp.abs(x); // x, y 取正值再計算 gcd
		y = BigIntOp.abs(y);
		
		while (y !== 0n) { const swap = x % y; x = y; y = swap; }
		return x;
	}
}

export function F(n: number|bigint = 0n, d: number|bigint = 1n): Frac { // Frac 工廠
	return new Frac(n, d);
}
export class Frac {
	static UnsafeIntError = class extends RanMathError { // number 超過範圍會無法表示精確整數
		constructor(caller: string) {
			super(caller, "Parameter must be a safe integer (|n| <= 2^53-1).");
		}
	}
	
	static NonIntError = class extends RanMathError { // 浮點數 number 轉 bigint 的錯誤
		constructor(caller: string) {
			super(caller, "Parameter must be a integer number.");
		}
	}
	
	static ZeroDenominatorError = class extends RanMathError { // 分母為 0
		constructor(caller: string) {
			super(caller, 'The denominator (param "d") cannot be 0.');
		}
	}
	
	static NonFracStringError = class extends RanMathError { // 字串無法轉成分數的錯誤
		constructor(caller: string) {
			super(caller, "This string cannot be converted to Frac.");
		}
	}
	
	static DivideZeroError = class extends RanMathError { // 除 0 錯誤
		constructor(caller: string) {
			super(caller, "Div 0 error.");
		}
	}
	
	private static toBigInt(x: number|bigint, caller: string): bigint { // number|bigint 轉 bigint (參數標準化)
		if (isBigInt(x)) return x; // bigint 不須處理, 直接回傳
		
		if (!Number.isInteger(x)) throw new Frac.NonIntError(caller); // x 不是整數
		if (!Number.isSafeInteger(x)) throw new Frac.UnsafeIntError(caller); // number 超過範圍會無法表示精確整數
		return BigInt(x); // 將 number 轉為 bigint
	}
	
	private static toFrac(x: number|bigint|Frac, caller: string): Frac { // number|bigint|Frac 轉 Frac (參數標準化)
		if (Frac.isFrac(x)) return x; // Frac 不須處理, 直接回傳
		return F(Frac.toBigInt(x, caller)); // number|bigint -> bigint -> Frac
	}
	
	static isFrac(x: unknown): x is Frac { // 檢查 x 是否為 Frac 實例
		return x instanceof Frac;
	}
	
	static fromStr(str: string): Frac { // 將浮點數字串, 分數字串轉為 Frac
		str = str.replaceAll(" ", ""); // 去除所有空白符
		if (/^-?\d+\.\d+$/.test(str)) { // 小數字串 a.b
			const [str_a, str_b] = str.split(".");
			const a = F(BigInt(str_a)); // 整數部分 a
			const b = F(BigInt(str_b), 10n ** BigInt(str_b.length)); // 小數部分 b
			return str_a.includes("-") ? a.sub(b) : a.add(b); // b 的正負要與 a 相同
		}
		if (/^-?\d+\/-?\d+$/.test(str)) { // 分數字串 a/b
			const [str_a, str_b] = str.split("/");
			if (BigInt(str_b) === 0n) throw new Frac.NonFracStringError("Frac.fromStr"); // 除 0 錯誤
			return F(BigInt(str_a), BigInt(str_b));
		}
		if (/^-?\d+$/.test(str)) { // 整數字串
			return F(BigInt(str));
		}
		throw new Frac.NonFracStringError("Frac.fromStr"); // 字串無法轉成分數的錯誤
	}
	
	readonly n: bigint = 0n; // 分子
	readonly d: bigint = 1n; // 分母
	
	constructor(n: number|bigint = 0n, d: number|bigint = 1n) {
		n = Frac.toBigInt(n, "Frac.constructor"); // 將分子和分母的 number 型態轉為 bigint
		d = Frac.toBigInt(d, "Frac.constructor");
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
		x = Frac.toFrac(x, "Frac.add"); // number|bigint|Frac -> Frac
		return F(this.n * x.d + this.d * x.n, this.d * x.d);
	}
	
	sub(x: number|bigint|Frac): Frac { // 減法
		x = Frac.toFrac(x, "Frac.sub"); // number|bigint|Frac -> Frac
		return F(this.n * x.d - this.d * x.n, this.d * x.d);
	}
	
	mul(x: number|bigint|Frac): Frac { // 乘法
		x = Frac.toFrac(x, "Frac.mul"); // number|bigint|Frac -> Frac
		return F(this.n * x.n, this.d * x.d);
	}
	
	div(x: number|bigint|Frac): Frac { // 乘法
		x = Frac.toFrac(x, "Frac.div"); // number|bigint|Frac -> Frac
		if (x.isZero()) throw new Frac.DivideZeroError("Frac.div"); // 除 0 錯誤
		return F(this.n * x.d, this.d * x.n);
	}
	
	pow(n: number|bigint): Frac { // 整數次方
		n = Frac.toBigInt(n, "Frac.pow"); // number|bigint -> bigint
		if (n < 0n) return F(this.d ** -n, this.n ** -n); // 負整數次方
		return F(this.n ** n, this.d ** n);
	}
	
	equal(x: number|bigint|Frac): boolean { // 相等
		x = Frac.toFrac(x, "Frac.equal"); // number|bigint|Frac -> Frac
		return this.n === x.n && this.d === x.d;
	}
	
	lt(x: number|bigint|Frac): boolean { // 小於
		x = Frac.toFrac(x, "Frac.lt"); // number|bigint|Frac -> Frac
		return this.n * x.d < this.d * x.n;
	}
}
