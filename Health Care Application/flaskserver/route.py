from __main__ import app
from bson.json_util import dumps
from flask import jsonify, request
from flask_mail import *
from flask_login import login_user, login_required, logout_user, LoginManager, current_user
from pymongo import MongoClient
import numpy as np
import pandas as pd 
import random
import pickle
from model import User
from model import Appointment
from model import HealthBlogs
from bson import ObjectId


client = MongoClient("mongodb+srv://haseeb:health123@cluster0.kzcener.mongodb.net/?retryWrites=true&w=majority")

try:
    client.admin.command('ping')
    print("You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client['HealthCare']

userSchema = User(db)
appointment = Appointment(db)
blogs = HealthBlogs(db)

model = pickle.load(open('newmodel.pkl', 'rb'))

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


# @login_manager.user_loader
# def load_user(_id):
    # return doctors.get(_id)s


mail = Mail(app)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'haseebfarooq200@gmail.com'
app.config['MAIL_PASSWORD'] = 'thgevdwvprumjktv'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

# Generate Random OTP
otp = random.randint(1000, 9999)


@app.route('/patientjoin', methods=['POST'])
def Join_Patient():
    if (request.method == 'POST'):
        user_data = request.get_json()
        user_dict = {
            'fullName': user_data['fullName'],
            'email': user_data['email'],
            'cellnum': user_data['cellnum'],
            'gender': user_data['gender']
        }

        if (not user_dict['fullName'] or not user_dict['cellnum'] or not user_dict['email'] or not user_dict['gender'] ):
            print("Fill all credentials")
            return jsonify("Fill all credentials"), 400
        else:          
                newUser = userSchema.create_patient(
                    user_dict['fullName'], user_dict['email'], user_dict['cellnum'], user_dict['gender']
                )
                print("Patient Registered Successfully", newUser)
                return jsonify("Patient Registered Successfully"), 200

@app.route('/doctorjoin', methods=['POST'])
def Join_Doctor():
    if (request.method == 'POST'):
        user_data = request.get_json()
        user_dict = {
            'fullName':user_data['fullName'],
            'email': user_data['email'],
            'D.O.B':user_data['date'],
            'gender':user_data['gender'],
            'phoneNumber': user_data['cellnum'],
            'city': user_data['city'],
            'address': user_data['address'],
            'hospital': user_data['hospital'],
            'pmc_Number': user_data['pmc_Number'],
            'specialization': user_data['specialization'],
            'consultFee':user_data['consultFee'],
            'timing':user_data['timing']
        }

        if (not user_dict['fullName'] or not user_dict['D.O.B'] or not user_dict['email'] or not user_dict['gender'] or not user_dict['phoneNumber'] or
           not user_dict['pmc_Number'] or not user_dict['hospital'] or not user_dict['specialization'] or not user_dict['address'] 
           or not user_dict['city'] or not user_dict['timing'] or not user_dict['consultFee']):
            print("Fill all credentials")
            return jsonify("Fill all credentials"), 400
        else:
            UserExist = userSchema.find_doctor(user_dict['email'])
            if (UserExist):
                print("Email Already Exist")
                return jsonify("Email Already Exist"), 400
            else:
                newUser = userSchema.create_doctor(
                    user_dict['fullName'] ,user_dict['email'], user_dict['D.O.B'], user_dict['gender'], user_dict['phoneNumber'],
                    user_dict['pmc_Number'], user_dict['hospital'], user_dict['specialization'], user_dict['address'], user_dict['city'],
                    user_dict['timing'], user_dict['consultFee']
                )
                print("Doctor Registered Successfully", newUser)
                return jsonify("Doctor Registered Successfully"), 200

@app.route('/login', methods=['POST'])
def Login():
    if (request.method == 'POST'):
        user_data = request.get_json()
        user_dict = {
            'email': user_data['email']
        }
        if(not user_dict['email']):
            return jsonify("Enter your email address"),400
        else:
            msg = Message('OTP Code for Health Care Login',
                sender='haseebfarooq200@gmail.com',
                recipients=[user_dict['email']])
            msg.body = str(otp)
            mail.send(msg)
            print("Navigate to OTP page", msg.body)
            return jsonify('OTP Page'), 200
    
# @app.route('/logout', methods=['POST'])
# @login_required
# def Logout():
#     logout_user()
#     return jsonify("User Logout")

@app.route('/verifyotp', methods=['POST'])
def verifyOTP():
    user_data = request.get_json()
    user_dict = {
        'myotp': user_data['myotp']
    }
    intnum = int(user_dict['myotp'])
    print("OTP",type(otp))
    print("Entered OTP",type(intnum))

    if (otp == intnum):
        print("Email",user_dict['email'])
        print("Signed in Successfully OTP valid")
        return jsonify('Signed in Successfully OTP valid '),200
    else:
        print("OTP",otp,"Enter OTP",user_dict['myotp'])
        print("Invalid OTP")
        return jsonify('Invalid OTP'),400
   
@app.route('/resendotp', methods=['POST'])
def resendOTP():
    user_data = request.get_json()
    user_dict = {
        'email': user_data['email']
    }
    msg = Message('OTP Code for Health Care Login',
                  sender='haseebfarooq200@gmail.com',
                  recipients=[user_dict['email']])
    msg.body = str(otp)
    mail.send(msg)
    print("Login as Doctor + OTP", msg)
    return jsonify('OTP Page'), 200


@app.route('/bookappointment', methods=['POST'])
def Book_Appointment():
    user_data = request.get_json()
    user_dict = {
        'yourName': user_data['fullName'],
        'yourmail': user_data['email'],
        'yourcellnum': user_data['cellnum'],
        'gender': user_data['gender'],
        'doctorName': user_data['docname'],
        'doctormail':user_data['docmail'],
        'doctorspecialization': user_data['docspecialization'],
        'doctoraddress':user_data['docaddress'],
        'doctortiming':user_data['doctiming'],
        'subject':user_data['Subject'],
    }
    if (not user_dict['yourName'] or not user_dict['doctorName'] or not user_dict['yourmail'] or not user_dict['yourcellnum'] or not user_dict['gender'] 
        or not user_dict['doctormail'] or not user_dict['doctorspecialization'] or not user_dict['doctoraddress'] or not user_dict['doctortiming'] or not user_dict['subject'] ):
        return jsonify("Fill the credentials"), 400
    else:
        appointment.set_appointment(
            user_dict['yourName'], user_dict['doctorName'], user_dict['yourmail'], user_dict['yourcellnum'], user_dict['gender'], user_dict['doctormail'], user_dict['doctorspecialization'],
            user_dict['doctoraddress'], user_dict['doctortiming'], user_dict['subject']  )
        print("Appontment Booked")
        return jsonify("Appointment Successfully Booked"), 200


@app.route('/sendfeedback', methods=['POST'])
def Send_Feedback():
    user_data = request.get_json()
    user_dict = {
        'rating': user_data['rating'],
        'feedback': [user_data['feedback']]
    }
    if (not user_dict['rating'] or not user_dict['feedback']):
        return jsonify("Fill the credentials"), 400
    else:
        userSchema.set_feedback(user_dict['rating'], user_dict['feedback'])
        print("Feedback sent")
        return jsonify("Feedback sent"), 200

@app.route('/setblogs', methods=['POST'])
def Set_Blog():
    user_data = request.get_json()
    user_dict = {
        'title': user_data['title'],
        'description': user_data['description']
    }
    if (not user_dict['title'] or not user_dict['description']):
        return jsonify("Fill the credentials"), 400
    blogs.set_healthblog(user_dict['title'], user_dict['description'])
    print("Blog uploaded")
    return jsonify("Blog Uploaded"), 200

@app.route('/getblogs', methods=['GET'])
def Get_Blog():
    getblog = blogs.get_healthblog()
    resp = dumps(getblog)
    return (resp), 200


@app.route('/getdoctor', methods=['GET'])
def GetDoctorList():
    getdoc = userSchema.get_doctor()
    resp = dumps(getdoc)
    return (resp), 200


@app.route('/getdoctor/<string:id>', methods=['GET'])
def GetDoctor(id):
    obj_id = ObjectId(id)
    getdoc = userSchema.get_doctorbyid(obj_id)
    resp = dumps(getdoc)
    return (resp), 200

@app.route('/getpatient', methods=['GET'])
def GetPatientProfile():
    getpatient = userSchema.get_patient()
    resp = dumps(getpatient)
    return (resp), 200


@app.route('/predict', methods=['POST'])
def Prediction():
    user_data = request.get_json()
    if len(user_data)>4:
        return jsonify('Enter 4 symptoms only'),401
    user_dict = {}

    # Ensure the user_data list contains exactly four values
    user_data += [None] * (4 - len(user_data))
    user_data = user_data[:4]

    # Store the values of the list in the dictionary
    for i, value in enumerate(user_data):
        key = f's{i}'  # Generate a key based on the index
        user_dict[key] = value
        all_null = all(value is None for value in user_dict.values())
    if(all_null):
        print("Enter atleast 1 field")
        return jsonify('Enter atleast 1 field'), 402

    df = pd.read_csv('newseverity.csv')
    for key in user_dict.keys():
        if user_dict[key] in df["Symptom"].values:
            user_dict[key] = df.loc[df["Symptom"] == user_dict[key], "weight"].values[0]
        elif user_dict[key] not in df["Symptom"].values:user_dict[key] = 0

    X = np.array(list(user_dict.values())).reshape(1, -1)
    y_pred = model.predict(X)
    resp = dumps(y_pred)
    print("Disease",y_pred)
    return (resp), 200
 
    # else:
    #     print("Kaha p ha ?",user_dict['s1'])
    #     return jsonify("Enter at least 1 Symptom"),404

@app.route('/getdoctorrandom', methods=['GET'])
def GetDoctorRandom():
    getdoc = userSchema.get_doctorrandom()
    resp = dumps(getdoc)
    return (resp), 200 

@app.route('/getsymptom', methods=['GET'])
def Getsymptom():
    df = pd.read_csv('newseverity.csv')
    symptoms = df['Symptom'].unique()
    sorted_arr = sorted(symptoms)
    print(type(sorted_arr))
    resp = dumps(sorted_arr)
    return resp
