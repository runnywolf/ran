<template>
	<MakeProblem scoreText="">
		<template #problem>
			For the following Matlab code:
			a=11; %Set \'a\' as the number of rows/cols. in a square matrix A
			A=ones(a,a); %Set A as an 11x11 all-one matrix (All the elements are 1) for m=1:a
			A(m,m)=0.9; %Set all the elements on the main diagonal of A as 0.9 end
			d=det(A); %Calculate the determinant of A
			c=abs(d*(10^a)+7); %Adjust the value, and abs(.) is the absolute-value func. answer=mod($c, 5$); %mod(.) is the modulo operation
			What is the value of "answer"?
			A) 0 B) 1 C) 2 D) 3 E) 4
		</template>
	</MakeProblem>
</template>
