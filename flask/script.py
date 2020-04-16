from flask import Flask,render_template,make_response,redirect

app = Flask(__name__) #creating the Flask class object

@app.route('/')
def home():
    return render_template('first.html')

@app.route('/g')
def g():
    return redirect('/')

@app.route('/res')
def res():
    response = make_response('<h1>This document carries a cookie!</h1>')
    response.set_cookie('answer', '42')
    return response

if __name__ =='__main__':
    app.run(debug = True)
