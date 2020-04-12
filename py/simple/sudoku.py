def printing():
	count=0
	print()
	for i in range(9):
		for j in range(9):
			print(matrix[i][j],end=' ')
			if matrix[i][j]==0:
				count+=1
			if j==2 or j==5:
				print('| ',end='')
		if i==2 or i==5:
			print('\n------ ------- ------',end='')
		print()
	print("\nno .of zeros=",count)

def iter ():
	for i in range(9):
		for j in range(9):
			if matrix[i][j]==0:
				findvalues(i,j)

def findvalues (i,j):
	nc=0
	x=i
	y=j
	find[x][y]=[0,1,1,1,1,1,1,1,1,1]
	#row execution
	for y in range(9):
		find[i][j][matrix[i][y]]=0
	#col execution
	for x in range(9):
		find[i][j][matrix[x][j]]=0
	#box execution
	x=i
	y=j
	lx=[]
	ly=[]

	if i%3==0:
		lx=[i,i+1,i+2]
	elif i%3==1:
		lx=[i-1,i,i+1]
	else:
		lx=[i-2,i-1,i]

	if j%3==0:
		ly=[j,j+1,j+2]
	elif j%3==1:
		ly=[j-1,j,j+1]
	else:
		ly=[j-2,j-1,j]

	for x in lx:
		for y in ly:
			find[i][j][matrix[x][y]]=0

	print('at ',i+1,j+1,' is:',end='')
	for x in range(10):
		if find[i][j][x]==1:
			nc+=1
			print(' ',x,end='')
	print()
	if nc==1:
		matrix[i][j]=find[i][j].index(1)
		iter()

if __name__=="__main__":
	print("enter the lines:")
	matrix=[]
	for _ in range(9):
		l=list(map(int,input().split()))
		matrix.append(l)

	find=[]
	for _ in range(9):
		l=[0]*9
		find.append(l)
	printing()
