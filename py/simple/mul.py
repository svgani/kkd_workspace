li=[[0,0,0],[0,0,0],[0,0,0]]

for i in range(1,10):
    li[0][0]=i
    # print(i,end='')
    for j in range(1,10):
        if(i!=j):
            li[0][1]=j
            # print(j,end='')
            for k in range(1,10):
                if(i!=k and j!=k):
                    li[0][2]=k
                    # print(k,end='')
                    for l in range(1,10):
                        if(i!=l and j!=l and k!=l):
                            li[1][0]=l
                            # print(l,end='')
                            for m in range(1,10):
                                if(i!=m and j!=m and k!=m and l!=m):
                                    li[1][1]=m
                                    # print(m,end='')
                                    for n in range(1,10):
                                        if(i!=n and j!=n and k!=n and l!=n and m!=n):
                                            li[1][2]=n
                                            # print(n,end='')
                                            for o in range(1,10):
                                                if(i!=o and j!=o and k!=o and l!=o and m!=o and n!=o):
                                                    li[2][0]=o
                                                    # print(o,end='')
                                                    for p in range(1,10):
                                                        if(i!=p and j!=p and k!=p and l!=p and m!=p and n!=p and o!=p):
                                                            li[2][1]=p
                                                            # print(p,end='')
                                                            for q in range(1,10):
                                                                if(i!=q and j!=q and k!=q and l!=q and m!=q and n!=q and o!=q and p!=q):
                                                                    li[2][2]=q
                                                                    # print(i,j,k,l,m,n,o,p,q)
                                                                    if li[0][0]*li[0][1]*li[0][2]==54 and li[1][0]*li[1][1]*li[1][2]==120 and li[2][0]*li[2][1]*li[2][2]==56 and li[0][0]*li[1][0]*li[2][0]==96 and li[0][1]*li[1][1]*li[2][1]==180 and li[0][2]*li[1][2]*li[2][2]==21:
                                                                        print(i,j,k)
                                                                        print(l,m,n)
                                                                        print(o,p,q)
