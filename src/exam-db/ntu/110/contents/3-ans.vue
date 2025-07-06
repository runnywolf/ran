<template>
	「 從位置 <vl exp="0" /> 開始，走 <vl exp="2n" /> 步，每一步可以 <vl exp="\pm 1" />，最後必須回到
	<vl exp="0" />，並且不可以走到 <vl exp="\lt 0" /> 的位置。 」<br>
	上述問題的合法路徑數量恰好是第 <vl exp="n" /> 個 Catalan 數：
	<vl c exp="C_n = \frac{1}{n+1} \binom{2n}{n}" />
	<br>
	而本題規定「 第一次回到原點剛好走了 <vl exp="2n" /> 步 」，意思是回到原點的途中不可以經過位置
	<vl exp="0" />，也就是不能走到 <vl exp="\lt 1" /> 的位置。<br>
	因此第一步必須 <vl exp="+1" />。 ( 如果 <vl exp="-1" /> 的話會 <vl exp="\lt 1" /> )<br>
	最後一步只能 <vl exp="-1" />，因為不可能從位置 <vl exp="-1 (+1)" /> 移動至 <vl exp="0" />。<br>
	<br>
	以下是 <vl exp="2n" /> 步的合法路徑：<br>
	「 <vl exp="+1" /> 」<br>
	<vl exp="\to" />「 從位置 <vl exp="1" /> 開始，走 <vl exp="2n-2" /> 步，每一步可以 <vl exp="\pm 1" />，<br>
	最後必須回到 <vl exp="1" />，並且不可以走到 <vl exp="\lt 1" /> 的位置。 」<vl exp="\Rightarrow" />
	第 <vl exp="n-1" /> 個 Catalan 數<br>
	<vl exp="\to" />「 <vl exp="-1" /> 」<br>
	<br>
	上面只考慮了第一步 <vl exp="+1" /> 的路徑，第一步 <vl exp="-1" /> 的路徑同理。<br>
	因此本題的合法路徑數量為：
	<vl c exp="2 C_{n-1} = \boxed{ \frac{2}{n} \binom{2n-2}{n-1} }" />
</template>
