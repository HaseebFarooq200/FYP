import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { useNavigate } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';

import {
  MDBContainer,
  MDBBtn,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cellnum, setCellnum] = useState();
  const [date, setDate] = useState(null);
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [hospital, setHospital] = useState('');
  const [pmcnum, setPmcnum] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [consultFee, setConsultFee] = useState();

  const [time, setTime] = useState(null);
  const availablity = [
    {
      label: 'Monday',
      code: 'MON',
      items: [
        { label: '9 am', value: '9 am' },
        { label: '10 am', value: '10 am' },
        { label: '11 am', value: '11 am' },
        { label: '12 pm', value: '12 pm' },
        { label: '1 pm', value: '1 pm' },
        { label: '2 pm', value: '2 pm' },
        { label: '3 pm', value: '3 pm' },
        { label: '4 pm', value: '4 pm' },
        { label: '5 pm', value: '5 pm' },

      ]
    },
    {
      label: 'Tuesday',
      code: 'TUES',
      items: [
        { label: '9 am', value: '9 am' },
        { label: '10 am', value: '10 am' },
        { label: '11 am', value: '11 am' },
        { label: '12 pm', value: '12 pm' },
        { label: '1 pm', value: '1 pm' },
        { label: '2 pm', value: '2 pm' },
        { label: '3 pm', value: '3 pm' },
        { label: '4 pm', value: '4 pm' },
        { label: '5 pm', value: '5 pm' },

      ]
    },
    {
      label: 'Wednesday',
      code: 'WED',
      items: [
        { label: '9 am', value: '9 am' },
        { label: '10 am', value: '10 am' },
        { label: '11 am', value: '11 am' },
        { label: '12 pm', value: '12 pm' },
        { label: '1 pm', value: '1 pm' },
        { label: '2 pm', value: '2 pm' },
        { label: '3 pm', value: '3 pm' },
        { label: '4 pm', value: '4 pm' },
        { label: '5 pm', value: '5 pm' },

      ]
    },
    {
      label: 'Thursday',
      code: 'THU',
      items: [
        { label: '9 am', value: '9 am' },
        { label: '10 am', value: '10 am' },
        { label: '11 am', value: '11 am' },
        { label: '12 pm', value: '12 pm' },
        { label: '1 pm', value: '1 pm' },
        { label: '2 pm', value: '2 pm' },
        { label: '3 pm', value: '3 pm' },
        { label: '4 pm', value: '4 pm' },
        { label: '5 pm', value: '5 pm' },

      ]
    },
    {
      label: 'Friday',
      code: 'FRI',
      items: [
        { label: '9 am', value: '9 am' },
        { label: '10 am', value: '10 am' },
        { label: '11 am', value: '11 am' },
        { label: '12 pm', value: '12 pm' },
        { label: '1 pm', value: '1 pm' },
        { label: '2 pm', value: '2 pm' },
        { label: '3 pm', value: '3 pm' },
        { label: '4 pm', value: '4 pm' },
        { label: '5 pm', value: '5 pm' },

      ]
    },
  ];
  const cities = [
    { name: 'Lahore'},
    { name: 'Karachi'},
    { name: 'Islamabad'},
    { name: 'Quetta'},
    { name: 'Peshawar'}
  ];
  const hospitals = [
    { name: 'Shifa'},
    { name: 'PIMS'},
    { name: 'Indus'},
    { name: 'Shaukat Khanam'},
    { name: 'Jinnah Hospital'}
  ];
  const specialities = [
    { name: 'Eye Specialist'},
    { name: 'Heart Specialist'},
    { name: 'ENT Specialist'},
    { name: 'Dentist'},
    { name: 'Dermatologist'}
  ];


  const availablityTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <img alt={option.label} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
        <div>{option.label}</div>
      </div>
    );
  };

  const navigate = useNavigate();

  const myChange = (e) => {
    e.preventDefault();
    console.log(fullName)
    console.log(email)
    console.log(date)
    console.log(gender)
    console.log("Cell", cellnum)
    console.log(city.name)
    console.log(address)
    console.log(hospital.name)
    console.log(pmcnum)
    console.log(speciality.name)
    console.log(consultFee)
    console.log(time)
    console.log(availablity[0].label);
  }

  const Register = async (e) => {
    e.preventDefault();
    const response = await fetch('/doctorjoin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, date, gender, cellnum, city:city.name, address, hospital:hospital.name, 
        pmc_Number:pmcnum, specialization:speciality.name, consultFee, timing:time })
    })

    const UserData = await response.json()
    if (response.status === 200 || !UserData) {
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
                      <div className="flex flex-column md:flex-row gap-3">
                        <div className="p-inputgroup flex-1">
                          <InputText value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
                        </div>

                        <div className="p-inputgroup flex-1">
                          <InputText type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
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

                        <div className="p-inputgroup flex-1">
                          <InputMask value={cellnum} onChange={(e) => setCellnum(e.target.value)} mask="9999-9999999" placeholder="Cell Number" />
                        </div>

                        <div className="p-inputgroup flex-1">
                          <Dropdown value={city} onChange={(e) => setCity(e.target.value)} options={cities} optionLabel="name"
                            placeholder="Select a City" className="w-full md:w-14rem" />
                        </div>

                        <div className="p-inputgroup flex-1">
                          <InputText placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="p-inputgroup flex-1">
                        <Dropdown value={hospital} onChange={(e) => setHospital(e.target.value)} options={hospitals} optionLabel="name"
                            placeholder="Choose Hospital" className="w-full md:w-14rem" />
                        </div>

                        <div className="p-inputgroup flex-1">
                          <InputMask value={pmcnum} onChange={(e) => setPmcnum(e.target.value)} mask="PMC-99999999" placeholder="PMC Number" />
                        </div>

                        <div className="p-inputgroup flex-1">
                        <Dropdown value={speciality} onChange={(e) => setSpeciality(e.target.value)} options={specialities} optionLabel="name"
                            placeholder="Choose Speciality" className="w-full md:w-14rem" />
                        </div>

                        <div className="p-inputgroup flex-1">
                          <InputNumber inputId="locale-user" placeholder="Consultation Fee" value={consultFee} onValueChange={(e) => setConsultFee(e.value)} />
                        </div>

                        <div className="p-inputgroup flex-1">
                          <MultiSelect value={time} options={availablity} onChange={(e) => setTime(e.value)} optionLabel="label"
                            optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={availablityTemplate}
                            placeholder="Set Your Availablity" display="chip" className="w-full md:w-20rem" />
                        </div>
                      </div>
                    
                      <MDBBtn type='submit' className='mb-4' onClick={Register} >
                        Submit
                      </MDBBtn>
                      <MDBBtn type='submit' className='mb-4' onClick={(e) => { myChange(e) }} >
                        Check
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
