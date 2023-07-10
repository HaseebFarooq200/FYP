import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function Login() {

  const navigate = useNavigate();

  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  // const [fullName, setFullName] = useState('');
  // const [email, setEmail] = useState('');
  // const [cellnum, setCellnum] = useState();
  // const [date, setDate] = useState(null);
  // const [address, setAddress] = useState('');
  // const [gender, setGender] = useState('');

  const [formValue, setFormValue] = useState({
    email: '',
    myotp:''
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const Signin = async (e) => {
    const { email} = formValue
    e.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email})
    })

    const UserData = await response.json()
    if (response.status === 200 || !UserData) {
      setFormValue({
        email: ''
      });
      // window.alert('OTP Sent')
      toggleShow()
    }
    else if(response.status ===400) {
      window.alert('Enter your email address')
    }
    else{
      window.alert('Something went wrong')
    }
  }

  const OTPVerify = async (e) => {
    const { myotp} = formValue
    e.preventDefault();
    const response = await fetch('/verifyotp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ myotp})
    })
    
    await response.json()
    if (response.status === 200 ) {
      // window.alert('Signed in successfully')
      navigate('/home')
      setFormValue({
        myotp: ''
      });
    }
    else {
      window.alert('Invalid OTP')
      setFormValue({
        myotp: ''
      });
    }
  }

  return (
    <>
      <Card className="bg-dark " style={{ height: '690px' }} >
        <Card.Img src="https://img.freepik.com/free-vector/abstract-medical-wallpaper-template-design_53876-61802.jpg?size=626&ext=jpg&ga=GA1.1.1646437121.1682025661&semt=ais" alt="Card image" height="690px" />
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 10, 0.7)' }}></div>
        <Card.ImgOverlay>
          <MDBContainer>
            <MDBRow className="d-flex justify-content-center" >  
              <MDBCol size='md-6' className="mt-5" >
                <Card>
                  <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <form>
                    {/* <div className="flex flex-column md:flex-row gap-3">
                        <div className="p-inputgroup flex-1">
                          <InputText value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
                        </div>

                        <div className="p-inputgroup flex-1">
                          <InputText type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </div>

                        <div className="p-inputgroup flex-1">
                          <InputMask value={cellnum} onChange={(e) => setCellnum(e.target.value)} mask="9999-9999999" placeholder="Cell Number" />
                        </div>

                        <div className="p-inputgroup flex-1">
                          <InputText placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        

                        <div className="p-inputgroup flex-1">
                          <Calendar placeholder='Date of Birth' value={date} onChange={(e) => setDate(e.value)} />
                        </div>

                        <div className="p-inputgroup flex-1">
                          <div className="flex align-items-center">
                            <RadioButton inputId="gender1" name="Male" value="Male" onChange={(e) => setGender(e.target.value)} checked={gender === 'Male'} />
                            <label htmlFor="Male" className="ml-2">Male</label>
                          </div>
                          <div className=" ms-5 flex align-items-center">
                            <RadioButton inputId="gender2" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} checked={gender === 'Female'} />
                            <label htmlFor="gender2" className="ml-2">Female</label>
                          </div>
                        </div>
                      </div> */}
                      <MDBInput className='mb-4'
                        name='email'
                        value={formValue.email}
                        type='email'
                        id='form2Example1'
                        label='Email address'
                        onChange={onChange}
                      />
                    </form>

                    <MDBBtn  type='submit' className='mb-4' onClick={Signin}>
                      Sign in
                    </MDBBtn>
                    <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                      <MDBModalDialog>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <MDBModalTitle>OTP Verification</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody>
                            <MDBInput className='mb-4'
                              name='myotp'
                              value={formValue.myotp}
                              type='number'
                              id='form2Example1'
                              label='Enter 4 digit OTP code'
                              onChange={onChange}
                            />
                          </MDBModalBody>

                          <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                              Resend
                            </MDBBtn>
                            <MDBBtn  type='submit' onClick={OTPVerify}> Submit </MDBBtn>
                          </MDBModalFooter>
                        </MDBModalContent>
                      </MDBModalDialog>
                    </MDBModal>
                    
                  </Card.Body>
                </Card>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Card.ImgOverlay>
      </Card>
    </>

  )
}
