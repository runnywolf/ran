<template>
	<vk>
		$$ \begin{split}
		p_{AB}(t) &= \det(AB - tI) \\
		&= \det(B) \det(AB - tI) \det(B)^{-1} \\
		&= \det(B) \det(AB - tI) \det(B^{-1}) \\
		&= \det(B (AB - tI) B^{-1}) \\
		&= \det(BABB^{-1} - tBIB^{-1}) \\
		&= \det(BA - tI) \\
		&= p_{BA}(t)
		\end{split} $$
		$\Rightarrow~ AB$ 與 $BA$ 的特徵多項式相同<br>
		$\Rightarrow~ AB$ 與 $BA$ 的特徵值相同
	</vk>
</template>
