import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ListBox } from 'primereact/listbox';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { RadioButton } from 'primereact/radiobutton';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter
} from 'mdb-react-ui-kit';
export default function DoctorProfile() {

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);
    const [selectedCity, setSelectedCity] = useState(null);
    const groupedCities = [
        {
            label: 'Monday',
            code: 'DE',
            items: [
                { label: '09:00 am - 11:00 am', value: '09:00 am - 11:00 am' },
                { label: '12:00 pm - 1:00 pm', value: '12:00 pm - 1:00 pm' }
            ]
        },
        {
            label: 'Tuesday',
            code: 'DE',
            items: [
                { label: '09:00 am - 11:00 am', value: '09:00 am - 11:00 am' },
                { label: '12:00 pm - 1:00 pm', value: '12:00 pm - 1:00 pm' }
            ]
        },
        {
            label: 'Wednesday',
            code: 'DE',
            items: [
                { label: '09:00 am - 11:00 am', value: '09:00 am - 11:00 am' },
                { label: '12:00 pm - 1:00 pm', value: '12:00 pm - 1:00 pm' }
            ]
        },
        {
            label: 'Thursday',
            code: 'DE',
            items: [
                { label: '09:00 am - 11:00 am', value: '09:00 am - 11:00 am' },
                { label: '12:00 pm - 1:00 pm', value: '12:00 pm - 1:00 pm' }
            ]
        },
        {
            label: 'Friday',
            code: 'DE',
            items: [
                { label: '09:00 am - 11:00 am', value: '09:00 am - 11:00 am' },
                { label: '12:00 pm - 1:00 pm', value: '12:00 pm - 1:00 pm' }
            ]
        },
    ];

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [cellnum, setCellnum] = useState();
    const [gender, setGender] = useState('');

    const location = useLocation()

    let myemail = location.state.email

    const [doc, setDoc] = useState([])

    const GetDocProfile = async () => {
        try {
            const response = await fetch('/getdoctor', {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })

            const docList = await response.json()
            if (response.status !== 200) {
                const error = new Error(response.error);
                throw error
            }
            else {
                setDoc(docList)
            }
        } catch (error) {
            console.log(Error)
        }
    }

    useEffect(() => {
        GetDocProfile()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const JoinPatient = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch('/patientjoin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, cellnum, gender })
            })
            const UserData = await response.json()
            if (response.status === 200 || !UserData) {
                window.alert('Your Appointment is booked')
                // navigate('/')
            }
            else {
                console.log("Invalid Entry")
                window.alert('Invalid Entry !')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                doc.map((index) => {
                    if (myemail === index.email) {
                        return (
                            <MDBContainer breakpoint="sm" className="mt-5" style={{ marginBottom: '250px' }} >
                                <MDBRow>
                                    <MDBCol size="md-3" className="d-flex justify-content-center " >
                                        <img className="rounded-circle w-100 border border-2 " alt="avatar2" src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" />
                                    </MDBCol>
                                    <MDBCol size="md-4" className="d-flex flex-column justify-content-around  " >
                                        <h5>Dr. {index.fullName}</h5>
                                        <span>{index.email}</span>
                                        <span>{index.gender}</span>
                                        <span>{index.specialization}</span>
                                    </MDBCol>
                                    <MDBCol size="md-5" className='d-flex flex-column justify-content-around border border-3 bg-light' >
                                        <h4>{index.hospital}</h4>
                                        <span>{index.consultFee}</span>
                                        <span>Address: {index.address}</span>
                                        <span>Availabiliy: {index.timing}</span>
                                        <MDBBtn className='w-50' onClick={toggleShow}>Book an Appointment</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className='mt-5'>
                                    <h4 className='mb-3' >Appointment Schedule</h4>
                                    <MDBCol size="md-2" className="d-flex justify-content-between">
                                        <span>Active</span>
                                        <span>{index.active_appointments}</span>
                                    </MDBCol>
                                    <MDBCol size="md-2" className="d-flex justify-content-between">
                                        <span>Pending</span>
                                        <span>{index.pending_appointments}</span>
                                    </MDBCol>
                                    <MDBCol size="md-2" className="d-flex justify-content-between">
                                        <span>Cancelled</span>
                                        <span>{index.cancelled_appointments}</span>
                                    </MDBCol>
                                    <MDBCol size="md-2" className="d-flex justify-content-between">
                                        <span>Completed</span>
                                        <span>{index.completed_appointments}</span>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className='mt-5' >
                                    <h4> Feedback Tab</h4>
                                </MDBRow>
                            </MDBContainer>
                        )
                    }
                    return null;
                })

            }

            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Enter Details</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form>
                                <div className="flex flex-column md:flex-row gap-3">
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
                                        <div className="flex align-items-center">
                                            <RadioButton inputId="gender1" name="Male" value="Male" onChange={(e) => setGender(e.target.value)} checked={gender === 'Male'} />
                                            <label htmlFor="Male" className="ml-2">Male</label>
                                        </div>
                                        <div className=" ms-5 flex align-items-center">
                                            <RadioButton inputId="gender2" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} checked={gender === 'Female'} />
                                            <label htmlFor="gender2" className="ml-2">Female</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <h5 className='mt-2 ms-1' >Available Slots</h5>
                            <ListBox value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={groupedCities}
                                optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" className="w-full md:w-14rem mt-2"
                                listStyle={{ maxHeight: '250px' }} />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={(e) => { JoinPatient() }} >Book</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
