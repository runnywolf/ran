<template>
	<vk>
		<MultiOption :optionNames="[ 'a', 'b', 'c', 'd' ]">
			<template #a>
				<div style="margin: 8px 0;">下表是 8 個相異任務分配給 3 個相同伺服器的分法。</div>
				<div class="ts-box is-collapsed">
					<table class="ts-table is-collapsed is-dense is-celled">
						<thead>
							<tr>
								<th>分法</th><th>組合數</th><th>組合數</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>$8, 0, 0$</td><td>$\binom{8}{8}$</td><td>$1$</td>
							</tr>
							<tr>
								<td>$7, 1, 0$</td><td>$\binom{8}{7} \binom{1}{1}$</td><td>$8$</td>
							</tr>
							<tr>
								<td>$6, 2, 0$</td><td>$\binom{8}{6} \binom{2}{2}$</td><td>$28$</td>
							</tr>
							<tr>
								<td>$6, 1, 1$</td><td>$\frac{1}{2!} \binom{8}{6} \binom{2}{1} \binom{1}{1}$</td><td>$28$</td>
							</tr>
							<tr>
								<td>$5, 3, 0$</td><td>$\binom{8}{5} \binom{3}{3}$</td><td>$56$</td>
							</tr>
							<tr>
								<td>$5, 2, 1$</td><td>$\binom{8}{5} \binom{3}{2} \binom{1}{1}$</td><td>$168$</td>
							</tr>
							<tr>
								<td>$4, 4, 0$</td><td>$\frac{1}{2!} \binom{8}{4} \binom{4}{4}$</td><td>$35$</td>
							</tr>
							<tr>
								<td>$4, 3, 1$</td><td>$\binom{8}{4} \binom{4}{3} \binom{1}{1}$</td><td>$280$</td>
							</tr>
							<tr>
								<td>$4, 2, 2$</td><td>$\frac{1}{2!} \binom{8}{4} \binom{4}{2} \binom{2}{2}$</td><td>$210$</td>
							</tr>
							<tr>
								<td>$3, 3, 2$</td><td>$\frac{1}{2!} \binom{8}{3} \binom{5}{3} \binom{2}{2}$</td><td>$280$</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="margin: 8px 0;">總和為 $\boxed{1094}$。</div>
			</template>
			<template #b>
				每台伺服器至少要做 1 個任務的分法為：
				$$(6, 1, 1),~(5, 2, 1),~(4, 3, 1),~(4, 2, 2),~(3, 3, 2)$$
				參考題 (a) 已計算完成的排列數，加總後得到：
				$$28+168+280+210+280 = \boxed{966}$$
			</template>
			<template #c>
				每台伺服器只能做 1 ~ 4 個任務的分法為：
				$$(4, 3, 1),~(4, 2, 2),~(3, 3, 2)$$
				參考題 (a) 已計算完成的排列數，加總後得到：
				$$280+210+280 = \boxed{770}$$
			</template>
			<template #d>
				由於題 (a) 的排列數已扣除相同任務數的伺服器的重複排列，且本題與題 (c)
				僅多出「 相異伺服器的條件 」，因此將題 (c) 的排列數乘上 $3!$ 即可。
				$$770 \cdot 3! = \boxed{4620}$$
			</template>
		</MultiOption>
	</vk>
</template>
