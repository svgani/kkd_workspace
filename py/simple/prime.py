def prime(x):
    for i in range(2,x):
        if x%i==0:
            return 1
    return 0

n=int(input())
c=0
for i in range(n+1):
    for j in range(i,n+1):
        if i!=j:
            # print('(',i,j,')','=',i+j)
            b=prime(i+j)
            if b==0:
                print('(',i,j,')','=',i+j)
                c+=1
                # print(c)

print(c-1)
