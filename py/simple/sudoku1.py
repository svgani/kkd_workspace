def printing(matrix):
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

def emptyLoc (matrix,l):
	for i in range(9):
		for j in range(9):
			if matrix[i][j]==0:
				l[0]=i
				l[1]=j
				return True
	return False

def used_in_row(matrix,row,num):
	for i in range(9):
		if(matrix[row][i] == num):
			return True
	return False

def used_in_col(matrix,col,num):
	for i in range(9):
		if(matrix[i][col] == num):
			return True
	return False

def used_in_box(matrix,row,col,num):
	for i in range(3):
		for j in range(3):
			if(matrix[i+row][j+col] == num):
				return True
	return False

def check_location_is_safe(matrix,row,col,num):
	return not used_in_row(matrix,row,num) and not used_in_col(matrix,col,num) and not used_in_box(matrix,row - row%3,col - col%3,num)

def solve_sudoku(matrix):
	l=[0,0]
	if not emptyLoc(matrix,l):
		return True
	row=l[0]
	col=l[1]
	for num in range(1,10):
		if(check_location_is_safe(matrix,row,col,num)):
			matrix[row][col]=num
			if(solve_sudoku(matrix)):
				return True
			matrix[row][col] = 0
	return False

if __name__=="__main__":
	# matrix=[[7,0,0,0,0,0,0,0,3],
	# 		[0,6,0,0,2,0,0,0,0],
	# 		[0,0,0,6,0,0,4,9,2],
	# 		[0,0,5,0,0,9,0,0,0],
	# 		[9,1,0,0,4,0,7,3,0],
	# 		[0,0,3,0,0,6,0,0,0],
	# 		[0,0,0,2,0,0,9,1,8],
	# 		[0,4,0,0,7,0,0,0,0],
	# 		[5,0,0,0,0,0,0,0,7]]

	# la=[[3,0,6,5,0,8,4,0,0],
	# 		[5,2,0,0,0,0,0,0,0],
	# 		[0,8,7,0,0,0,0,3,1],
	# 		[0,0,3,0,1,0,0,8,0],
	# 		[9,0,0,8,6,3,0,0,5],
	# 		[0,5,0,0,9,0,6,0,0],
	# 		[1,3,0,0,0,0,2,5,0],
	# 		[0,0,0,0,0,0,0,7,4],
	# 		[0,0,5,2,0,6,3,0,0]]

	la=[]
	print("enter the lines:")
	for _ in range(9):
		l=list(map(int,input().split()))
		la.append(l)

	if(solve_sudoku(la)):
		printing(la)
	else:
		print("No solution exists")
