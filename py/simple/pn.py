def prime(x):
    for i in range(2,x):
        if x%i==0:
            return 1
    return 0

n=int(input())
for i in range(2,n+1):
    b=prime(i)
    if b==0:
        print(i)
