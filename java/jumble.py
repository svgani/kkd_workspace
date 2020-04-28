def jumble(str):
	li=[0]*len(str)
	for i in range(len(str)):
		while True:
			a=random.random()
			a=a*10
			a=int(a)
			if li[a%len(str)]==0:
				li[a%len(str)]=str[i]
				break
	print(li)
