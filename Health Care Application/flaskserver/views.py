from flask import Blueprint ,jsonify

views = Blueprint('views', __name__)

@views.route('/getdata', methods = ['GET'])
def ReturnJSON():
        data = {
            "Modules" : 98,
            "Subject" : "Data Structures and Algorithms",
        }
        print(data)
        return jsonify(data)
