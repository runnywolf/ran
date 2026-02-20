<template>
	<vk>
		$i, j, k$ 三層迴圈滿足 $1 \le k \le j \le i \le 12$。<br>
		最內層迴圈的執行個數等於：$1 \sim 12$ 裡挑 $3$ 個可重複的數並排成非嚴格遞增三元組 $(i,j,k)$ 的個數。<br>
		因此執行個數為重複組合：
		$$ H^{12}_3 = \binom{14}{3} = 364 $$
		<br>
		由於 increment 的值會先 +1 再對 sum 累加，所以 sum 的值為
		$$ 1 + 2 + \cdots + 364 = @f{364 \cdot 365; 2} = \boxed{66430} $$
	</vk>
</template>
