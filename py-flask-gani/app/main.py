from flask import Flask,render_template,request,flash,redirect
import random

class Error(Exception):
   """Base class for other exceptions"""
   pass

class ValueLowError(Error):
   """Raised when the input value is too small"""
   pass

class NullError(Error):
   """Raised when the input value size is zero"""
   pass

class ValueLargeError(Error):
   """Raised when the input value is too large"""
   pass

history=[]
n=0
app = Flask(__name__)

@app.route("/")
def home_view():
    print('in welcomePage')
    global n
    global history
    n=0
    history=[]
    return render_template('welcomePage.html')

@app.route("/game",methods=['post'])
def game():
    try:
        num=request.form['nd']
        if num=='':
            raise NullError
        global n
        n=int(num)
        print('n=',n)
        if n<1:
            raise ValueLowError
        elif n>10:
            raise ValueLargeError
    except ValueLowError:
        return render_template('userPage.html',name=user,text="This value is too small, try again!")
    except NullError:
        return render_template('userPage.html',name=user,text="Enter the Value, try again!")
    except ValueLargeError:
        return render_template('userPage.html',name=user,text="This value is too large, try again!")

    #random number assigning
    while True:
        ra=random.random()
        ra=str(int(ra*10**n//1))
        flag=0
        if len(ra)==n:
            for i in range(n-1):
                if ra[i] in ra[i+1:]:
                    flag=1
                    break
            if flag==0:
                break
    global a
    a=ra
    # global history
    # history=[]
    return render_template('gamePage.html',digit=n)


@app.route("/user",methods=['post'])
def user():
    print('in user fn n=',n)
    try:
        name=request.form['name']
        if name=='':
            raise NullError
    except NullError:
        return render_template('welcomePage.html',text="Enter the name!")
    global user
    user=name
    return render_template('userPage.html',name=name)

@app.route("/exec",methods=['post'])
def userinput():
    global n
    print('in exec fn n=',n)
    global history
    b=request.form['number']
    if b == "":
        return redirect("/")
    if len(b)!=n:
        return render_template('gamePage.html',digit=n,len=len(history),list=history,textRepeat='_')
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
        history.append([b,cowc,bullc])
        print(history)
        return render_template('gamePage.html',digit=n,len=len(history),list=history)
    else:
        history.append([b,cowc,bullc])
        return render_template('end.html',digit=n,len=len(history),list=history,fintext='Game Over!')

@app.route("/rules")
def rules():
    return render_template('rules.html')

@app.route("/exec",methods=['get'])
def defRoute():
    return redirect('/')
