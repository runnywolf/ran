<template>
	<vk>
		二分圖 $\Rightarrow$ 圖沒有奇環：<br>
		二分圖一定可以用兩種顏色著色 ( 一邊塗一種 )，但奇環不可能，因此二分圖不可能存在奇環。<br>
		<br>
		圖沒有奇環 $\Rightarrow$ 二分圖：<br>
		圖沒有奇環 $\Rightarrow$ 圖都是偶環<br>
		而偶環可以只用兩種顏色著色，只存在偶環的圖最小著色數也是 2。<br>
		因此色數為 2 的圖的節點可以被分為兩個不同顏色的集合，且相鄰節點位於相異集合，所以圖是二分圖。
	</vk>
</template>
