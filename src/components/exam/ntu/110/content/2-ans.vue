<template>
	套用 Master theorem 得到以下遞迴關係式：
	<vl c exp="T(n) = 3T(n / 2) + O(1)" />
	遞迴成本 <vl exp="n^{\log_2{3}}" /> 大於合併成本 <vl exp="1" />，所以
	<vl exp="a_n \approx T(n) = \Theta(n^{\log_2{3}})" />。<br>
	<br>
	當 <vl exp="n \to \infty" /> 時：
	<vl c exp="\log_2{a_n} \approx \log_2 n^{\log_2{3}} = \boxed{\log_2{3}} \times \log_2{n}" />
</template>
