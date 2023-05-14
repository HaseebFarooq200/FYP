import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ListBox } from 'primereact/listbox';
import {
    MDBInput,
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

    const location = useLocation()

    let email = location.state.email

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

    const myfunc = () => {
        window.alert('Fill all input fields')
    }

    return (
        <>
            {

                doc.map((index) => {
                    if (email === index.email) {
                        return (
                            <MDBContainer breakpoint="sm" className="mt-5" style={{ marginBottom: '250px' }} >
                                <MDBRow>
                                    <MDBCol size="md-3" className="d-flex justify-content-center " >
                                        <img className="rounded-circle w-100 border border-2 " alt="avatar2" src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" />
                                    </MDBCol>
                                    <MDBCol size="md-4" className="d-flex flex-column justify-content-around  " >
                                        <h5>Dr. {index.firstname} {index.lastname}</h5>
                                        <span>{index.email}</span>
                                        <span>{index.gender}</span>
                                        <span>{index.specialization}</span>
                                        <span>850+ years Experience</span>
                                    </MDBCol>
                                    <MDBCol size="md-5" className='d-flex flex-column justify-content-around border border-3 bg-light' >
                                        <h4>{index.hospital}</h4>
                                        <span>Fees: 50,000 Rs</span>
                                        <span>Address: {index.address}</span>
                                        <span>Availabiliy: 09:00 am - 05:00 pm</span>
                                        <MDBBtn className='w-50' onClick={toggleShow}>Book an Appointment</MDBBtn>
                                    </MDBCol>
                                    {/* <div className="card flex justify-content-center"> */}
                                    {/* </div> */}
                                </MDBRow>
                                <MDBRow className='mt-5'>
                                    <h4 className='mb-3' >Appointment Schedule</h4>
                                    <MDBCol size="md-2" className="d-flex justify-content-between">
                                        <span>Active</span>
                                        <span>10</span>
                                    </MDBCol>
                                    <MDBCol size="md-2" className="d-flex justify-content-between">
                                        <span>Pending</span>
                                        <span>3</span>
                                    </MDBCol>
                                    <MDBCol size="md-2" className="d-flex justify-content-between">
                                        <span>Cancelled</span>
                                        <span>1</span>
                                    </MDBCol>
                                    <MDBCol size="md-2" className="d-flex justify-content-between">
                                        <span>Completed</span>
                                        <span>200</span>
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
                            <MDBInput label='Name' id='form1' type='text' name='name' />
                            <MDBInput className='mt-2' label='Phone Number' id='form1' type='number' name='number' />
                            <h5 className='mt-2 ms-1' >Timings</h5>
                            <ListBox value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={groupedCities}
                                optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" className="w-full md:w-14rem mt-2"
                                listStyle={{ maxHeight: '250px' }} />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={() => { myfunc() }} >Book</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
