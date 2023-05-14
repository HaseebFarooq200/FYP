from flask import Blueprint ,jsonify

auth = Blueprint('auth', __name__)

@auth.route('/getdataauth', methods = ['GET'])
def ReturnJSON():
        data = {
            "Modules" : 58,
            "Subject" : "This is auth",
        }
        print(data)
        return jsonify(data)
