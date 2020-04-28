t=int(input())
while t:
    t-=1
    n=int(input())
    a=list(map(int,input().split()))
    a.sort()
    b=list(map(int,input().split()))
    b.sort()
    count=0
    k=0
    for i in range(n):
        if a[i]>b[k]:
            k+=1
            count+=1
    print(count)
