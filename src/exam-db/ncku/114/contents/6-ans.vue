<template>
	<vk>
		參考 <RanLink to="https://en.wikipedia.org/wiki/Vandermonde_matrix">Vandermonde matrix</RanLink>。
		$$ \det(A) = @vm{ 1, x_1, {x_1}^2 ; 1, x_2, {x_2}^2 ; 1, x_3, {x_3}^2 }
		= (x_3-x_2)(x_3-x_1)(x_2-x_1) $$
		只要有兩個 $x_i$ 相同，那麼 $\det(A) = 0$，$A$ 為奇異矩陣。<br>
		答案為 (B)。<br>
		<br>
		※ 其他的條件都有可能使 $A$ 為奇異矩陣。
	</vk>
</template>
