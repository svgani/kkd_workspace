import itertools
from itertools import combinations as c
from collections import Counter
count = 0
th = input("enter the threshold: ")
n = [["A","B","C"],["A","C"],["A","D"],["B","E","F"]]
thre = int(th)*len(n)/100
a = [ ]
v= [ ]
totals = Counter(i for i in list(itertools.chain.from_iterable(n)))
for i in totals:
    if totals[i] >= thre:
        a.append(i)
b = list(c(a,2))

for i in b:
    for j in n:
        if i[0] in j and i[1] in j:
            v.append(i)

t = Counter(v)
for i in t:
    if t[i] >= thre:
        print(i)
