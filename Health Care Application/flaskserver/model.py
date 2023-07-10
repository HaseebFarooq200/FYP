from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, db):
        self.doctors = db.doctors
        self.patients = db.patients

    def create_doctor(self, fullName, email, age, gender, phonenumber, pmc_Number, hospital, specialization,address,city,timing,consultFee):
        user = {
            "fullName":fullName,
            "email": email,
            "age": age,
            "gender": gender,
            "phonenumber": phonenumber,
            'pmc_Number': pmc_Number,
            'hospital': hospital,
            'specialization': specialization,
            'address': address,
            'city':city,
            'timing':timing,
            'consultFee':consultFee,
            'active_appointments':0,
            'cancelled_appointments':0,
            'pending_appointments':0,
            'completed_appointments':0,
        }
        self.doctors.insert_one(user)
        return user


    def create_patient(self, fullName, email, cellnum, gender):
        user = {
            "fullName": fullName,
            "email": email,
            "cellnum":cellnum,
            "gender":gender
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
    
    def get_doctorrandom(self):
        pipeline = [{ "$sample": { "size": 1 } }]
        getdoc = self.doctors.aggregate(pipeline)
        return getdoc
    
    def get_doctorbyid(self,id):
        print(id)
        getdoc = self.doctors.find_one({'_id':id})
        print(getdoc)
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
    