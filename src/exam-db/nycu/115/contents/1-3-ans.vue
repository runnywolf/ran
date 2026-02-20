<template>
	<vk>
		<MultiOption :optionNames="['1', '2', '3', '4']" :optionAnswers="[false, false, true, false]">
			<template #1>
				反例：<br>
				$$ \det(@bm{0, 0; 0, 0}) = \det(@bm{1, 0; 0, 0}) = 0 ,~~ \text{but } @bm{0, 0; 0, 0} \neq @bm{1, 0; 0, 0} $$
			</template>
			<template #2>
				反例：<br>
				如果 $A = B = I_n$，則
				$$ \det(rA+B) = \det((r+1)I_n) = (r+1)^n $$
				$$ r\det(rA) + \det(B) = r\det(rI_n) + \det(I_n) = r \cdot r^n + 1 = r^{n+1} + 1 $$
			</template>
			<template #3>
				$$ \det((AB)^T) = \det(AB) = \det(A)\det(B) $$
			</template>
			<template #4>
				如果可以透過「 有限次基本列運算 」把 $A$ 變為 $B$，則 $A$ 與 $B$ 列等價。<br>
				只有「 乘常數加到另一行 」這個操作不會改變行列式的值，另外兩個會。<br>
				<br>
				反例：$A = @bm{1, 0; 0, 1}$，兩列交換後得到 $B = @bm{0, 1; 1, 0}$，$A$ 與 $B$ 列等價。<br>
				但 $\det(A) = 1 ,~~ \det(B) = -1$。
			</template>
		</MultiOption>
	</vk>
</template>
