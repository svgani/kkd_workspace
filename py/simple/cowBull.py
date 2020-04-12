import random

class Error(Exception):
   """Base class for other exceptions"""
   pass

class ValueLowError(Error):
   """Raised when the input value is too small"""
   pass

class ValueLargeError(Error):
   """Raised when the input value is too large"""
   pass

def userinput():
	try:
		b=int(input("enter the guessed number:"))
		b=str(b)
	except Exception as e:
		print(e)
		userinput()
	if len(b)!=n:
		print("enter ",n," digit number")
		userinput()
	exec(b)

def exec(b):
	bullc=0
	cowc=0
	for i in range(n):
		for j in range(n):
			if i!=j:
				if a[i]==b[j]:
					cowc+=1
	for i in range(n):
		if a[i]==b[i]:
			bullc+=1
	print('cowc = ',cowc,'\tbullc = ',bullc)
	if bullc!=n:
		userinput()
	else:
		return

while True:
	try:
		n=int(input("Enter the no .of digits in range(1 to 10):"))
		if n<1:
			raise ValueLowError
		elif n>10:
			raise ValueLargeError
		break
	except ValueLowError:
		print("This value is too small, try again!")
		print()
	except ValueLargeError:
		print("This value is too large, try again!")
		print()
	except ValueError:
		print('Enter numerical value')
		print()

while True:
	a=random.random()
	a=str(int(a*10**n//1))
	flag=0
	if len(a)==n:
		for i in range(n-1):
			if a[i] in a[i+1:]:
				flag=1
				break
		if flag==0:
			# print(a)
			break
userinput()
print('number guessed succesfully\nThanks for playing')
