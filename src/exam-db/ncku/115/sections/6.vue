<template>
	<MakeProblem listEndLabel="c" :listItemScoreTexts="['(10%)', '(10%)', '(10%)']">
		<template #problem>
			By factoring $A$ into $LU$, the LU decomposition allows solving $Ax = b$ by first solving $Ly = b$,
			followed by $Ux = y$, each requiring only a single triangular solve.
			Thus, computing $A = LU$ is crucial in large‑scale computer engineering applications.
		</template>
		<template #a>
			Give the complexity of the classic LU decomposition, shown in Algorithm 1.
			<div class="algorithm-block" style="margin-top: 8px; margin-bottom: 12px;">
				<div>
					$\textbf{Algorithm 1: } \text{LU Decomposition Without Pivoting}$
				</div>
				<div>
					$\textbf{Require: } \text{Matrix } A \in \mathbb{R}^{n \times n}$<br>
					$\textbf{Ensure: } \text{Lower triangular matrix } L,$<br>
					$\qquad\qquad \text{ Upper triangular matrix } U \text{ such that } A = LU$
				</div>
				<ol>
					<li>$\text{Initialize } L \leftarrow I_n ,~ U \leftarrow 0_{n \times n}$</li>
					<li>$\text{for } k = 1 \text{ to } n \text{ do}$</li>
					<li>$\quad~ \text{for } j = k \text{ to } n \text{ do }$<span class="right-text">$\triangleright\ \text{Compute } k\text{-th row of } U$</span></li>
					<li>$\quad~ \quad~ U_{k,j} \leftarrow A_{k,j} - \sum_{s=1}^{k-1} L_{k,s} \cdot U_{s,j}$</li>
					<li>$\quad~ \text{end for}$</li>
					<li>$\quad~ \text{for } i = k+1 \text{ to } n \text{ do }$<span class="right-text">$\triangleright\ \text{Compute } k\text{-th column of } L$</span></li>
					<li>$\quad~ \quad~ L_{i,k} \leftarrow \frac{1}{U_{k,k}}\left(A_{i,k} - \sum_{s=1}^{k-1} L_{i,s} \cdot U_{s,k}\right)$</li>
					<li>$\quad~ \text{end for}$</li>
					<li>$\text{end for}$</li>
					<li>$\text{return } (L,U)$</li>
				</ol>
			</div>
		</template>
		<template #b>
			An improvement of (a) based on the block matrix multiplication is shown in Algorithm 2.
			Give the complexity of the speed-improved LU decomposition.
			<div class="algorithm-block" style="margin-top: 8px;">
				<div>
					$\textbf{Algorithm 2: } \text{Speed-Improved Block LU Decomposition}$
				</div>
				<div>
					$\textbf{Require: } \text{Matrix } A \in \mathbb{R}^{n \times n}, \text{ } n \text{ is a power of } 2$<br>
					$\textbf{Ensure: } \text{Matrices } L, U \text{ with } A = LU$
				</div>
				<ol>
					<li>$\text{function SpeedImprovedBlockLU}(A)$</li>
					<li>$\quad~ n \leftarrow \text{size of } A$</li>
					<li>$\quad~ \text{if } n = 1 \text{ then}$</li>
					<li>$\quad~ \quad~ \text{return } ([1], [A_{11}])$</li>
					<li>$\quad~ \text{end if}$</li>
					<li>$\quad~ \text{Partition } A \text{ into blocks: } A = @bm{ A_{11}, A_{12}; A_{21}, A_{22} }$</li>
					<li>$\quad~ (L_{11}, U_{11}) \leftarrow \text{SpeedImprovedBlockLU}(A_{11})$</li>
					<li>$\quad~ U_{12} \leftarrow \text{SISolve}(L_{11}, A_{12}, \mathrm{lower})$</li>
					<li>$\quad~ L_{21} \leftarrow \text{SISolve}(U_{11}, A_{21}, \mathrm{upper})$</li>
					<li>$\quad~ S \leftarrow A_{22} - \text{SIMultiply}(L_{21}, U_{12})$</li>
					<li>$\quad~ (L_{22}, U_{22}) \leftarrow \text{SpeedImprovedBlockLU}(S)$</li>
					<li>$\quad~ \text{Construct: } L = @bm{ L_{11}, 0; L_{21}, L_{22} } ,~~ U = @bm{ U_{11}, U_{12}; 0, U_{22} }$</li>
					<li>$\quad~ \text{return } (L,U)$</li>
					<li>$\text{end function}$</li>
				</ol>
			</div>
			<div class="algorithm-block">
				<ol>
					<li>$\text{function SISolve}(T, B, \mathrm{type})$</li>
					<li>$\quad~ \text{if } n = 1 \text{ then}$</li>
					<li>$\quad~ \quad~ \text{return } B / T$</li>
					<li>$\quad~ \text{end if}$</li>
					<li>$\quad~ \text{Partition } T, B \text{ into blocks: } T = @bm{ T_{11}, T_{12}; T_{21}, T_{22} } ,~~ B = @bm{ B_1; B_2 }$</li>
					<li>$\quad~ \text{if } \mathrm{type} = \mathrm{lower} \text{ then}$</li>
					<li>$\quad~ \quad~ X_1 \leftarrow \text{SISolve}(T_{11}, B_1)$</li>
					<li>$\quad~ \quad~ X_2 \leftarrow \text{SISolve}(T_{22}, B_2 - T_{21}X_1)$</li>
					<li>$\quad~ \text{else}$</li>
					<li>$\quad~ \quad~ X_2 \leftarrow \text{SISolve}(T_{22}, B_2)$</li>
					<li>$\quad~ \quad~ X_1 \leftarrow \text{SISolve}(T_{11}, B_1 - T_{12}X_2)$</li>
					<li>$\quad~ \text{end if}$</li>
					<li>$\quad~ \text{return } @bm{ X_1; X_2 }$</li>
					<li>$\text{end function}$</li>
				</ol>
			</div>
			<div class="algorithm-block" style="margin-bottom: 8px;">
				<ol>
					<li>$\text{function SIMultiply}(A, B)$</li>
					<li>$\quad~ \text{if } n = 1 \text{ then}$</li>
					<li>$\quad~ \quad~ \text{return } A \cdot B$</li>
					<li>$\quad~ \text{end if}$</li>
					<li>$\quad~ \text{Partition } A, B \text{ into: } A = @bm{ A_{11}, A_{12}; A_{21}, A_{22} } ,~~ B = @bm{ B_{11}, B_{12}; B_{21}, B_{22} }$</li>
					<li>$\quad~ M_1 \leftarrow (A_{11} + A_{22})(B_{11} + B_{22})$</li>
					<li>$\quad~ M_2 \leftarrow (A_{21} + A_{22})B_{11}$</li>
					<li>$\quad~ M_3 \leftarrow A_{11}(B_{12} - B_{22})$</li>
					<li>$\quad~ M_4 \leftarrow A_{22}(B_{21} - B_{11})$</li>
					<li>$\quad~ M_5 \leftarrow (A_{11} + A_{12})B_{22}$</li>
					<li>$\quad~ M_6 \leftarrow (A_{21} - A_{11})(B_{11} + B_{12})$</li>
					<li>$\quad~ M_7 \leftarrow (A_{12} - A_{22})(B_{21} + B_{22})$</li>
					<li>$\quad~ C_{11} \leftarrow M_1 + M_4 - M_5 + M_7$</li>
					<li>$\quad~ C_{12} \leftarrow M_3 + M_5$</li>
					<li>$\quad~ C_{21} \leftarrow M_2 + M_4$</li>
					<li>$\quad~ C_{22} \leftarrow M_1 - M_2 + M_3 + M_6$</li>
					<li>$\quad~ C \leftarrow @bm{ C_{11}, C_{12}; C_{21}, C_{22} }$</li>
					<li>$\quad~ \text{return } C$</li>
					<li>$\text{end function}$</li>
				</ol>
			</div>
		</template>
		<template #c>
			Given $A = @bm{ 4, 3; 6, 3 }$, compute the LU decomposition $A = LU$ using the speed‑improved
			LU decomposition method in (b).<br>
			(Note: List the key intermediate results from Algorithm 2 to receive full credit.)
		</template>
	</MakeProblem>
</template>

<style scoped>
.algorithm-block {
	margin-right: 80px;
	border-bottom: 2px solid #666;
}
.algorithm-block > div:first-child {
	border-top: 2px solid #666;
	border-bottom: 2px solid #666;
}
.algorithm-block .bold {
	font-weight: bold;
}
.algorithm-block > ol {
	list-style: none;
	counter-reset: item;
	margin-top: 0; padding-left: 0;
}
.algorithm-block > ol > li {
	counter-increment: item;
	display: flex;
	align-items: center;
	gap: 10px; /* ":" 與右側文字的寬度 */
}
.algorithm-block > ol > li::before {
	content: counter(item) ":";
	width: 24px;
	text-align: right;
	font-size: 16px;
	flex-shrink: 0;
}
.algorithm-block > ol > li span.right-text { /* 靠右對齊的一些文字 */
	margin-left: auto;
}
</style>
