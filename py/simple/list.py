list=[0,1,2,3,4,5,6,7,8,9]
print(len(list))
print(list)
for i in range (len(list)//2):
	list[i],list[len(list)-i-1]=list[len(list)-i-1],list[i]
print(list)
