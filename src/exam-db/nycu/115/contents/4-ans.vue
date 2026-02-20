<template>
	<vk>
		(1) 計算 $A^T A$ 的特徵值與特徵向量
		$$ A^T A = @bm{9, -1; -1, 9} $$
		$A^T A$ 的特徵值為 $\lambda_1 = 10 ,~ \lambda_2 = 8$，分別對應特徵向量 $x_1 = @bm{1; -1} ,~ x_2 = @bm{1; 1}$。<br>
		<div class="ts-divider is-section"></div>
		(2) 建構矩陣 $\Sigma$<br>
		將特徵值開根號後填入 $\Sigma$ 的對角線：($\Sigma$ 與 $A$ 階數相同)
		$$ \Sigma = @bm{ \sqrt{\lambda_1}, 0; 0, \sqrt{\lambda_2}; 0, 0 } = @bm{ \sqrt{10}, 0; 0, 2\sqrt{2}; 0, 0 } $$
		<div class="ts-divider is-section"></div>
		(3) 建構矩陣 $V$<br>
		將特徵向量單範化後，合併成矩陣 $V$：
		$$ v_1 = @f{1;\|x_1\|} x_1 = @bm{ @f{\sqrt{2}; 2}; @f{-\sqrt{2}; 2} } $$
		$$ v_2 = @f{1;\|x_2\|} x_2 = @bm{ @f{\sqrt{2}; 2}; @f{\sqrt{2}; 2} } $$
		$$ V = @bm{v_1, v_2} = @bm{ @f{\sqrt{2}; 2}, @f{\sqrt{2}; 2}; @f{-\sqrt{2}; 2}, @f{\sqrt{2}; 2} } $$
		<div class="ts-divider is-section"></div>
		(4) 建構矩陣 $U$<br>
		$$ u_1 = @f{1;\sqrt{\lambda_1}} A v_1 = @bm{ @f{2\sqrt{5}; 5}; 0; @f{\sqrt{5}; 5} } $$
		$$ u_2 = @f{1;\sqrt{\lambda_2}} A v_2 = @bm{ 0; 1; 0 } $$
		還需要一個與 $u_1 ,~ u_2$ 正交的單範向量 $u_3$。<br>
		注意到將 $u_1$ 兩個非零元素對調，並將其中一個變號：
		$$ u_3 = @bm{ @f{-\sqrt{5}; 5}; 0; @f{2\sqrt{5}; 5} } $$
		可以同時與 $u_1 ,~ u_2$ 正交。<br>
		<br>
		將向量合併成矩陣 $U$：
		$$ U = @bm{u_1, u_2, u_3}
		= @bm{ @f{2\sqrt{5}; 5}, 0, @f{-\sqrt{5}; 5}; 0, 1, 0; @f{\sqrt{5}; 5}, 0, @f{2\sqrt{5}; 5} } $$
		<div class="ts-divider is-section"></div>
		$A$ 的 SVD 分解：
		$$ A = U \Sigma V^T = @bm{ @f{2\sqrt{5}; 5}, 0, @f{-\sqrt{5}; 5}; 0, 1, 0; @f{\sqrt{5}; 5}, 0, @f{2\sqrt{5}; 5} }
		@bm{ \sqrt{10}, 0; 0, 2\sqrt{2}; 0, 0 }
		{ @bm{ @f{\sqrt{2}; 2}, @f{\sqrt{2}; 2}; @f{-\sqrt{2}; 2}, @f{\sqrt{2}; 2} } }^T $$
	</vk>
</template>
