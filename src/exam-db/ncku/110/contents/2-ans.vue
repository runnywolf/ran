<template>
	<vk>
		<MultiOption :optionNames="[ 'a', 'b' ]">
			<template #a>
				當 $x = -1$ 時，
				$$
				\begin{split}
				&\quad~ (-1)^5 - 2(-1)^4 + (-1)^3 - 2(-1)^2 - 7(-1) - 1;
				&= (-1) - 2 + (-1) - 2 - (-7) - 1;
				&= 0
				\end{split}
				$$
				所以有整數解 $x = -1$。
			</template>
			<template #b>
				假設有一個 $3 \times 18$ 的網格，其中有 $18+1$ 行，每行有 $3+1$ 點。<br>
				根據鴿籠原理，每一行的 $4$ 個點塗 $3$ 種顏色，必有其中一種顏色出現 $\ge 2$ 次。<br>
				若假設三種不同顏色的代號分別為 $1, 2, 3$，任意顏色以 $\cdot$ 表示，<br>
				則所有將行上色的方法都可以對應到以下 $18$ 種的其中一種：<br>
				$$
				\begin{gather*}
				@pm{ 1; 1; \cdot; \cdot }
				@pm{ 1; \cdot; 1; \cdot }
				@pm{ 1; \cdot; \cdot; 1 }
				@pm{ \cdot; 1; 1; \cdot }
				@pm{ \cdot; 1; \cdot; 1 }
				@pm{ \cdot; \cdot; 1; 1 } \\
				@pm{ 2; 2; \cdot; \cdot }
				@pm{ 2; \cdot; 2; \cdot }
				@pm{ 2; \cdot; \cdot; 2 }
				@pm{ \cdot; 2; 2; \cdot }
				@pm{ \cdot; 2; \cdot; 2 }
				@pm{ \cdot; \cdot; 2; 2 } \\
				@pm{ 3; 3; \cdot; \cdot }
				@pm{ 3; \cdot; 3; \cdot }
				@pm{ 3; \cdot; \cdot; 3 }
				@pm{ \cdot; 3; 3; \cdot }
				@pm{ \cdot; 3; \cdot; 3 }
				@pm{ \cdot; \cdot; 3; 3 }
				\end{gather*}
				$$
				根據鴿籠原理，$3 \times 18$ 網格之中的 $19$ 行一定有其中 $\ge 2$ 行被對應到某一種。<br>
				若網格內存在兩行是同一種塗法，例如：
				$$
				\cdots @pm{ \boxed{1}; \cdot; \boxed{1}; \cdot }
				\cdots @pm{ \boxed{1}; \cdot; \boxed{1}; \cdot }
				\cdots
				$$
				，就會形成一個四個角(點)都是相同顏色的矩形。<br>
				<br>
				因此 $3 \times 18$ 的網格一定存在四個角同色的矩形，而 $4 \times 82$ 的網格是 $3 \times 18$ 的擴展，<br>
				所以 $4 \times 82$ 的網格也一定存在四個角同色的矩形。
			</template>
		</MultiOption>
	</vk>
</template>
