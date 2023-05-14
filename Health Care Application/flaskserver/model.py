from flask_login import UserMixin


class User(UserMixin):
    def __init__(self, db):
        self.doctors = db.doctors
        self.patients = db.patients

    def create_doctor(self, firstname,lastname, email, age, gender, phonenumber, pmc_Number, hospital, specialization,address,city):
        user = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "age": age,
            "gender": gender,
            "phonenumber": phonenumber,
            'pmc_Number': pmc_Number,
            'hospital': hospital,
            'specialization': specialization,
            'address': address,
            'city':city
        }
        self.doctors.insert_one(user)
        return user


    def create_patient(self, username, email, age, gender, phonenumber):
        user = {
            "username": username,
            "email": email,
            "age": age,
            "gender": gender,
            "phonenumber": phonenumber
        }
        self.patients.insert_one(user)
        return user

    
    def find_doctor(self, email):
        user = {
            "email": email,
        }
        UserExist = self.doctors.find_one({"email": user['email']})
        return UserExist
    
    def find_patient(self, email):
        user = {
            "email": email,
        }
        UserExist = self.patients.find_one({"email": user['email']})
        return UserExist
    
    def get_doctor(self):
        getdoc = self.doctors.find()
        return getdoc
    
    def get_patient(self):
        getpatient = self.patients.find()
        return getpatient
    
    def set_feedback(self,rating, feedback):
        user_feedback = {
            "rating": rating,
            "feedback": feedback
        }
        self.doctors.insert_one(user_feedback)
        return user_feedback

class Appointment:
    def __init__(self,db):
        self.appointment = db.appointment

    def set_appointment(self, yourname,docname,purpose,timeSlot):
        appoint={
            "username":yourname,
            "docname":docname,
            "purpose":purpose,
            "timeSlot": timeSlot           
        }
        self.appointment.insert_one(appoint)
        return appoint


class HealthBlogs:
    def __init__(self,db):
        self.healthblog = db.healthblog
    
    def set_healthblog(self,title,description):
        blog={
            "title":title,
            "description":description
        }
        self.healthblog.insert_one(blog)
        return blog
    
    def get_healthblog(self):
        blog=self.healthblog.find()
        return blog
    