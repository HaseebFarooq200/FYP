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

client = MongoClient("mongodb+srv://haseeb:health123@cluster0.kzcener.mongodb.net/?retryWrites=true&w=majority")

db = client['HealthCare']
print("Connection Successfully Established")

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
            'userName': user_data['userName'],
            'email': user_data['email'],
            'age': user_data['age'],
            'gender': user_data['gender'],
            'phoneNumber': user_data['phoneNumber']
        }

        if (not user_dict['userName'] or not user_dict['age'] or not user_dict['email'] or not user_dict['gender'] or not user_dict['phoneNumber']):
            print("Fill all credentials")
            return jsonify("Fill all credentials"), 400
        else:
            UserExist = userSchema.find_patient(user_dict['email'])
            if (UserExist):
                print("Email Already Exist")
                return jsonify("Email Already Exist"), 400
            else:
                newUser = userSchema.create_patient(
                    user_dict['userName'], user_dict['email'], user_dict['age'], user_dict['gender'], user_dict['phoneNumber']
                )
                print("Patient Registered Successfully", newUser)
                return jsonify("Patient Registered Successfully"), 200

@app.route('/doctorjoin', methods=['POST'])
def Join_Doctor():
    if (request.method == 'POST'):
        user_data = request.get_json()
        user_dict = {
            'firstName': user_data['firstName'],
            'lastName': user_data['lastName'],
            'email': user_data['email'],
            'age': user_data['age'],
            'phoneNumber': user_data['phoneNumber'],
            'city': user_data['city'],
            'address': user_data['address'],
            'hospital': user_data['hospital'],
            'pmc_Number': user_data['pmc_Number'],
            'specialization': user_data['specialization'],
            'gender': user_data['gender']
        }

        if (not user_dict['firstName'] or not user_dict['age'] or not user_dict['email'] or not user_dict['gender'] or not user_dict['phoneNumber'] or
           not user_dict['pmc_Number'] or not user_dict['hospital'] or not user_dict['specialization'] or not user_dict['address']):
            print("Fill all credentials")
            return jsonify("Fill all credentials"), 400
        else:
            UserExist = userSchema.find_doctor(user_dict['email'])
            if (UserExist):
                print("Email Already Exist")
                return jsonify("Email Already Exist"), 400
            else:
                newUser = userSchema.create_doctor(
                    user_dict['firstName'], user_dict['lastName'] ,user_dict['email'], user_dict['age'], user_dict['gender'], user_dict['phoneNumber'],
                    user_dict['pmc_Number'], user_dict['hospital'], user_dict['specialization'], user_dict['address'], user_dict['city']
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
        'yourName': user_data['yourName'],
        'doctorName': user_data['doctorName'],
        'purpose': user_data['purpose'],
        'timeSlot': user_data['timeSlot']
    }
    if (not user_dict['yourName'] or not user_dict['doctorName'] or not user_dict['purpose'] or not user_dict['timeSlot']):
        return jsonify("Fill the credentials"), 400
    else:
        appointment.set_appointment(
            user_dict['yourName'], user_dict['doctorName'], user_dict['purpose'], user_dict['timeSlot'])
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


@app.route('/getpatient', methods=['GET'])
def GetPatientProfile():
    getpatient = userSchema.get_patient()
    resp = dumps(getpatient)
    return (resp), 200


@app.route('/predict', methods=['POST'])
def Prediction():
    user_data = request.get_json()
    user_dict = {
        's1': user_data['s1'],
        's2': user_data['s2'],
        's3': user_data['s3'],
        's4': user_data['s4'],
        # 's5': user_data['s5'],
        # 's6': user_data['s6'],
        # 's7': user_data['s7'],
        # 's8': user_data['s8'],
        # 's9': user_data['s9'],
        # 's10': user_data['s10'],
        # 's11': user_data['s11'],
        # 's12': user_data['s12'],
        # 's13': user_data['s13'],
        # 's14': user_data['s14'],
        # 's15': user_data['s15'],
        # 's16': user_data['s16'],
        # 's17': user_data['s17'],
    }

    if (user_dict['s1'] or  
        user_dict['s2'] or 
        user_dict['s3'] or 
        user_dict['s4'] 
        # user_dict['s5'] or
        # user_dict['s6'] or
        # user_dict['s7'] or
        # user_dict['s8'] or
        # user_dict['s9'] or
        # user_dict['s10'] or
        # user_dict['s11'] or
        # user_dict['s12'] or
        # user_dict['s13'] or
        # user_dict['s14'] or
        # user_dict['s15'] or
        # user_dict['s16'] or
        # user_dict['s17'] 
        ):
        
        df = pd.read_csv('newseverity.csv')
        for key in user_dict.keys():
            if user_dict[key] in df["Symptom"].values:
                user_dict[key] = df.loc[df["Symptom"] == user_dict[key], "weight"].values[0]
            elif user_dict[key] not in df["Symptom"].values:user_dict[key] = 0

        X = np.array([
            user_dict['s1'], 
            user_dict['s2'], 
            user_dict['s3'],
            user_dict['s4'], 
            # user_dict['s5'], 
            # user_dict['s6'], 
            # user_dict['s7'], 
            # user_dict['s8'], 
            # user_dict['s9'], 
            # user_dict['s10'], 
            # user_dict['s11'], 
            # user_dict['s12'], 
            # user_dict['s13'], 
            # user_dict['s14'], 
            # user_dict['s15'], 
            # user_dict['s16'], 
            # user_dict['s17'],
            ]).reshape(1, -1)
            
        y_pred = model.predict(X)
        resp = dumps(y_pred)
        print(type(resp))
        print("Disease",y_pred)
        return (resp), 200
 
    else:
        print("Kaha p ha ?",user_dict['s1'])
        return jsonify("Enter at least 1 Symptom"),404
       

@app.route('/trysome', methods=['GET'])
def Getsome():
    # user_data = request.get_json()
    user_dict = {
        'title': "This is my title",
        'description': "This is description of title"
    }
    resp = dumps(user_dict['title'])
    return resp
