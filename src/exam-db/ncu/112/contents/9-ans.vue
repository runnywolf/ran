<template>
	<vk>
		由於一個合法的字串不能包含上面四個子字串，因此合法字串的產生，只能通過延長另一個更短的合法字串。<br>
		將字串 $P_n$ 分成兩個互斥集合，將子集的大小加起來，求遞迴式：<br>
		<br>
		1. 在 $P_{n-1}$ 字串左側添加 $\alpha_3 \sim \alpha_8$，形成的 $P_n$ 字串：<br>
		添加 $\alpha_3 \sim \alpha_8$ 並不會使合法字串產生子字串
		$\{\alpha_1 \alpha_1 ,~ \alpha_1 \alpha_2 ,~ \alpha_2 \alpha_1 ,~ \alpha_2 \alpha_2 \}$，這個子集的大小為 $6 P_{n-1}$。<br>
		<br>
		2. 在 $P_{n-1}$ 字串左側添加 $\alpha_1 ,~ \alpha_2$，形成的 $P_n$ 字串：<br>
		添加 $\alpha_1 ,~ \alpha_2$ 有可能會產生不合法的子字串，將不合法的情況排除後，<br>
		得到字串 [$\alpha_1, \alpha_2$][$\alpha_3 \sim \alpha_8$][字串 $P_{n-2}$]，這個子集的大小為 $12 P_{n-2}$。<br>
		<br>
		得到遞迴關係：
		$$ \boxed{ P_n = 6 P_{n-1} + 12 P_{n-2} ~,~~ n \ge 2 }_{\text{ (B)}} $$
		<div class="ts-list is-unordered">
			<div class="item">$P_0$ 是長度為 $1$ 的合法字串的數量，$P_0 = 8$。</div>
			<div class="item">$P_1$ 是長度為 $2$ 的合法字串的數量，$P_1 = 8^2 - 4 = 60$。</div>
		</div>
		得到遞迴的初始條件
		$$ P_0 = 8 ~,~~ P_1 = 60 $$
	</vk>
</template>
