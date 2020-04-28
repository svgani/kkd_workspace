n=int(input('enter no .of cities:'))
cities=[]
for _ in range(n):
    li=[0]*n
    cities.append(li)
temp=n-1
while temp:
    temp-=1
    i,j=map(int,input('give edge:').split())
    cities[i-1][j-1]=1

waterBlocks=list(map(int,input('water Blocks:').split()))
print(waterBlocks)
