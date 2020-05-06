def factors(a):
    # count=0
    # print(a)
    right=0
    index=0
    for b in range(len(a)):
        # count=fun(a[num])
        flag=0
        count1=0
        num=a[b]
        if num==1 or num==0:
            count1=0
        else:
            for x in range(2,num+1):
                for i in range(2,x):
                    if x%i==0:
                        flag=1
                if flag==0 and num%x==0:
                    count1 += 1
                    flag=0
                flag=0
                # print(a[b],count1)
        if count1>=right:
            right=count1
            index=b
            # print(a[b],count1,right)
        count1=0
    # print(a[index])
    return a[index]


def evaluate (a, x, n):
    # Write your code here
    li=[]
    res=[]
    for i in range(n-x+1):
        li.append(a[i:x+i])
    for i in range(len(li)):
        res.append(factors(li[i]))
    return min(res)


x,n = map(int,input().split(" "))
a = list(map(int, input().split(" ")))

out_ = evaluate(a, x, n)
print (out_)
