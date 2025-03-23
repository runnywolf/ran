export function gcd(a, b) {
	[a, b] = [Math.abs(a), Math.abs(b)];
	while (b != 0) [a, b] = [b, a % b];
	return a;
}

export function isPerfectSquare(n) { // 是不是完全平方數
	if (n < 0) return false;
	const sqrt_int = Math.floor(Math.sqrt(n));
	return sqrt_int ** 2 == n;
}

export class Frac { // 分數
	constructor(n, d = 1) {
		this.n = n; // 分子, n ∈ Z
		this.d = d; // 分母, d ∈ Z+
		this.std(); // 標準化
	}
	
	toStr() { // 轉為 debug 字串
		return `${this.n}/${this.d}`;
	}
	
	std() { // 標準化
		if (this.d < 0) { // 若分母為負數, 同乘 -1
			this.n *= -1;
			this.d *= -1;
		}
		
		const nd_gcd = gcd(this.n, this.d);
		if (nd_gcd != 1) { // 約分
			this.n /= nd_gcd;
			this.d /= nd_gcd;
		}
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
		return new Frac(this.n * frac.d, this.d * frac.n);
	}
	
	sqrt() { // 開根號. 若出現複數或根號無法約分, 回傳 null
		if (!isPerfectSquare(this.n) || !isPerfectSquare(this.d)) return null;
		return new Frac(Math.sqrt(this.n), Math.sqrt(this.d));
	}
}

export class ConjugateRoot { // 共軛根
	static fromPoly(frac_a, frac_b, frac_c) { // 由二次式計算共軛根
		const frac_axis = frac_b.muli(-1).div(frac_a.muli(2))
		const frac_sqrt = frac_axis.mul(frac_axis).sub(frac_c.div(frac_a))
		return new ConjugateRoot(
			frac_axis.n * frac_sqrt.d,
			frac_axis.d,
			frac_sqrt.n * frac_sqrt.d,
			frac_axis.d * frac_sqrt.d
		);
	}
	
	std() { // 標準化
		
	}
	
	constructor(n, m, s, d) { // (n ± m√s) / d
		this.n = n;
		this.m = m;
		this.s = s;
		this.d = d;
	}
}
