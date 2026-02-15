<template>
	<vk>
		<MultiOption :optionNames="['1', '2', '3', '4']" :optionAnswers="[false, true, true, false]">
			<template #1>
				非奇異矩陣 $A$ 一定可逆，所以錯。<br>
				反例：$I_n^{-1} = I_n$
			</template>
			<template #2>
				反矩陣的定義：<br>
				若存在 $B$ 使得 $AB = BA = I$，則 $B = A^{-1}$。<br>
				非奇異矩陣 $A$ 一定可逆。
			</template>
			<template #3>
				$A$ 非奇異 $\Leftrightarrow A$ 可逆 $\Leftrightarrow \det(A) \neq 0$。
			</template>
			<template #4>
				反例：<br>
				非奇異矩陣 $A = I_n ~\Rightarrow~ I_n x = x = 0$，矛盾。
			</template>
		</MultiOption>
	</vk>
</template>
