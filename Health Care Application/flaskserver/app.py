from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

import route

if __name__=='__main__':
    app.run(debug=True)

