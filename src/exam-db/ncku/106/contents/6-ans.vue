<template>
	<vk>
		<MultiOption :optionNames="[ 'a', 'b', 'c' ]">
			<template #a>
				先對第一行展開，再對係數為 $(-1)(-1)$ 的行列式的第一列展開：
				$$
				\begin{split}
				|D_n| &= @vm{
				\textcolor{blue}{2}, -1, , , , ;
				\textcolor{#090}{-1}, 2, -1, , , ;
				, -1, 2, -1, , ;
				, , -1, \ddots, \ddots, \rule{0em}{1.2em};
				, , , \ddots, 2, -1;
				, , , , -1, 2;
				}_{n \times n} \\
				&= \textcolor{blue}{2} @vm{
				2, -1, , , ;
				-1, 2, -1, , ;
				, -1, \ddots, \ddots, \rule{0em}{1.2em};
				, , \ddots, 2, -1;
				, , , -1, 2;
				}_{(n-1) \times (n-1)} + \\
				&\quad\,\, \textcolor{#090}{(-1)(-1)} @vm{
				\textcolor{#a0a}{-1}, , , , ;
				-1, 2, -1, , ;
				, -1, \ddots, \ddots, \rule{0em}{1.2em};
				, , \ddots, 2, -1;
				, , , -1, 2;
				}_{(n-1) \times (n-1)} \\
				&= 2 |D_{n-1}| + 1 \textcolor{#a0a}{(-1)} |D_{n-2}| \\
				&= 2 |D_{n-1}| - |D_{n-2}|
				\end{split}
				$$
				初始條件
				$$ |D_1| = |[2]| = 2 \quad;\quad |D_2| = @vm{2, -1; -1, 2} = 3 $$
				得到遞迴關係式：
				$$
				\boxed{
				\begin{gather*}
				|D_n| = 2 |D_{n-1}| - |D_{n-2}| ~,~~ n \ge 2 \\
				|D_1| = 2 ~,~~ |D_2| = 3
				\end{gather*}
				}
				$$
			</template>
			<template #b>
				令 $a_n = |D_n|$。<br>
				<Recur :recurCoef="[2, -1]" :initConst="[2, 3]"></Recur>
				可知
				$$ \boxed{ |D_n| = 2 + n } $$
			</template>
			<template #c>
				$$ |D_{100}| = 2 + 100 = \boxed{102} $$
			</template>
		</MultiOption>
	</vk>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue"; // 遞迴解答產生器
</script>
