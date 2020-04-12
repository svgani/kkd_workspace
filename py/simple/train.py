num=5
temp=num%12
if temp==1 or temp==6 or temp==7 or temp==0:
	print("Ws")
if temp==2 or temp==5 or temp==8 or temp==11:
	print("Ms")
if temp==3 or temp==4 or temp==9 or temp==10:
	print("As")

if temp==1:
	print("opposite seat : ",num+11)
if temp==2:
	print("opposite seat : ",num+9)
if temp==3:
	print("opposite seat : ",num+7)
if temp==4:
	print("opposite seat : ",num+5)
if temp==5:
	print("opposite seat : ",num+3)
if temp==6:
	print("opposite seat : ",num+1)
if temp==7:
	print("opposite seat : ",num-1)
if temp==8:
	print("opposite seat : ",num-3)
if temp==9:
	print("opposite seat : ",num-5)
if temp==10:
	print("opposite seat : ",num-7)
if temp==11:
	print("opposite seat : ",num-9)
if temp==0:
	print("opposite seat : ",num-11)
