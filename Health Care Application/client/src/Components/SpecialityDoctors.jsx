import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
    MDBContainer,
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText
}
    from 'mdb-react-ui-kit';

export default function SpecialityDoctors() {

    const [doc, setDoc] = useState([])
    const location = useLocation()
    let spec = location.state.spec

    const navigate = useNavigate()

    const GetDoctors = async () => {
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

    const myfunc = (email) => {
        console.log(email)
        navigate('/docprofile', { state: { email } })
    }
    useEffect(() => {
        GetDoctors()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <MDBContainer className='mt-3 d-flex flex-column justify-content-center ' breakpoint="md" style={{ backgroundColor: 'whitesmoke' }}>
                <h5 className='mt-3' >Search your Doctor</h5>
                <form className='d-flex input-group w-auto mb-3 mt-2 '>
                    <input type='search' className='form-control' placeholder='Search Name of Doctor' aria-label='Search' />
                    <MDBBtn color='primary'>Search</MDBBtn>
                </form>
            </MDBContainer>

            <MDBContainer breakpoint='md' className=" mt-5 d-flex flex-column justify-content-center align-items-center " style={{ backgroundColor: 'whitesmoke' }}  >
                <h5 className='mt-3 d-flex align-self-start ' >
                    Doctors List
                </h5>
                {
                    doc.map((index) => {
                        if (spec === index.specialization) {
                            return (
                                <MDBContainer className='mt-3' style={{ backgroundColor: 'white' }} >
                                    <MDBRow>
                                        <MDBCol size='md-3' className='d-flex justify-content-center align-items-center'   >
                                            <img className="rounded-circle w-75" alt="avatar2" src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" />
                                        </MDBCol>
                                        <MDBCol size='md' className='d-flex flex-column justify-content-around '  >
                                            <h6>Name : Dr.{index.firstname} {index.lastname}</h6>
                                            <h6>Speciality : {index.specialization} </h6>
                                            <h6>Email : {index.email} </h6>
                                            <h6>Experience : 5 years </h6>
                                        </MDBCol>
                                        <MDBCol size='md' className='d-flex flex-column align-items-end justify-content-center '  >
                                            <MDBBtn onClick={() => { myfunc(index.email) }} size='lg' className='w-50' >
                                                View Profile
                                            </MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow  >
                                        <MDBCol >
                                            <MDBCard shadow='0' border='dark' background='white' className='mt-3 mb-3 w-50'>
                                                <MDBCardBody className='text-dark'>
                                                    <MDBCardTitle>Works At {index.hospital}</MDBCardTitle>
                                                    <MDBCardText className='text-end' >
                                                        Clinic Timing : 09:00 Am - 05:00 Pm
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            )
                        }
                        return null;
                    })
                }
            </MDBContainer >
        </>
    );
}
