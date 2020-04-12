from flask import Flask,render_template

app = Flask(__name__) #creating the Flask class object

@app.route('/')
def home():
    return render_template('first.html')

if __name__ =='__main__':
    app.run(debug = True)
