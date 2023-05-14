import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBInput
} from 'mdb-react-ui-kit';

export default function Register() {

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    phoneNumber: '',
    city: '',
    address: '',
    hospital: '',
    pmc_Number: '',
    specialization: '',
    gender: ''
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const Register = async (e) => {
    const { firstName, lastName, email, age, phoneNumber, city, address, hospital, pmc_Number, specialization, gender } = formValue
    e.preventDefault();
    const response = await fetch('/doctorjoin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, age, phoneNumber, city, address, hospital, pmc_Number, specialization, gender })
    })

    const UserData = await response.json()
    if (response.status === 200 || !UserData) {
      setFormValue({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        phoneNumber: '',
        city: '',
        address: '',
        hospital: '',
        pmc_Number: '',
        specialization: '',
        gender: ''
      });
      window.alert('Your Request has been under consideration for 48 hrs')
      navigate('/')
    }
    else {
      console.log("Invalid Entry")
      window.alert('Invalid Entry !')
    }
  }

  return (
    <>
      <Card className="bg-dark " >
        <Card.Img src="https://img.freepik.com/free-vector/abstract-medical-wallpaper-template-design_53876-61802.jpg?size=626&ext=jpg&ga=GA1.1.1646437121.1682025661&semt=ais" alt="Card image" height="900px" />
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 10, 0.7)' }}></div>
        <Card.ImgOverlay>
          <MDBContainer>
            <MDBRow className='d-flex flex-column justify-content-center align-items-center' >
              <MDBCol size='md-7'>
                <Card>
                  <Card.Body>
                    <Card.Title className='mb-3' >Register as Doctor ? </Card.Title>
                    <form>
                      <MDBInput className='mb-4 '
                        name='firstName'
                        value={formValue.firstName}
                        type='text'
                        id='labelExample2'
                        label='Firstname'
                        onChange={onChange}
                      />

                      <MDBInput className='mb-4'
                        name='lastName'
                        value={formValue.lastName}
                        type='text'
                        id='labelExample2'
                        label='Lastname'
                        onChange={onChange}
                      />

                      <MDBInput className='mb-4'
                        name='email'
                        value={formValue.email}
                        type='email'
                        id='labelExample2'
                        label='Email address'
                        onChange={onChange}
                      />

                      <MDBInput className='mb-4'
                        name='age'
                        value={formValue.age}
                        type='number'
                        id='labelExample2'
                        label='Age'
                        onChange={onChange}
                      />

                      <MDBInput className='mb-4'
                        name='gender'
                        value={formValue.gender}
                        type='text'
                        id='labelExample2'
                        label='Gender'
                        onChange={onChange}
                      />

                      <MDBInput className='mb-4'
                        name='phoneNumber'
                        value={formValue.phoneNumber}
                        type='number'
                        id='labelExample2'
                        label='Phone Number'
                        onChange={onChange}
                      />

                      <MDBInput className='mb-4'
                        name='city'
                        value={formValue.city}
                        type='text'
                        id='labelExample2'
                        label='City'
                        onChange={onChange}
                      />

                      <MDBInput className='mb-4'
                        name='address'
                        value={formValue.address}
                        type='text'
                        id='labelExample2'
                        label='Address'
                        onChange={onChange}
                      />

                      <MDBInput className='mb-4'
                        name='hospital'
                        value={formValue.hospital}
                        type='text'
                        id='labelExample2'
                        label='Clinic or Hospital Name'
                        onChange={onChange}
                      />

                      <MDBInput className='mb-4'
                        name='pmc_Number'
                        value={formValue.pmc_Number}
                        type='text'
                        id='labelExample2'
                        label='PMC Number'
                        onChange={onChange}
                      />

                      <MDBInput className='mb-4'
                        name='specialization'
                        value={formValue.specialization}
                        type='text'
                        id='labelExample2'
                        label='Specialization'
                        onChange={onChange}
                      />
                      <MDBBtn type='submit' className='mb-4' onClick={Register} >
                        Submit
                      </MDBBtn>
                    </form>
                  </Card.Body>
                </Card>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Card.ImgOverlay>
      </Card>
    </>

  );
}
