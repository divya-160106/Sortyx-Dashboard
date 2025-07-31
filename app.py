
from flask import Flask, send_file
import os

app = Flask(__name__)

@app.route('/')
def serve_index():
    return send_file('index.html')

@app.route('/script.js')
def serve_script():
    return send_file('script.js')

if __name__ == '__main__':
    app.run(debug=True)
