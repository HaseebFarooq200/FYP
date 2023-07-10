import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MDBContainer,
    MDBBtn,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

export default function DoctorsList() {

    const navigate = useNavigate()
    const [doc, setDoc] = useState([])

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

    useEffect(() => {
        GetDoctors()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const func = async (spec, city) => {
        navigate('/specdocs', { state: { spec,city } })
    }
    return (
        <>
            <MDBContainer className='mt-3 d-flex flex-column justify-content-center' breakpoint="md" style={{ backgroundColor: 'whitesmoke' }}>
                <h5 className='mt-3' >Find a Doctor</h5>
                <form className='d-md-flex input-group w-auto mb-3 mt-2'>
                    <input type='search' className='form-control' placeholder='Search Location' aria-label='Search' />
                    <input type='search' className='form-control' placeholder='Search for Speciality' aria-label='Search' />
                    <MDBBtn color='primary'>Search</MDBBtn>
                </form>
            </MDBContainer>

            <MDBContainer className="d-flex flex-column mt-5" breakpoint="md" style={{ backgroundColor: 'whitesmoke' }} >
                <h5 className='mt-3 d-flex align-self-start '>
                    Doctors in Islamabad
                </h5>
                <MDBRow className='mt-2'>
                    {
                        doc.map((index) => {
                            console.log(index.city)
                            if (index.city === "Islamabad") {
                                return (

                                    <MDBCol className="border border-1 p-3" size='md-3' >
                                        <h6 style={{ cursor: 'pointer' }} onClick={() => { func(index.specialization,index.city) }} >
                                            {index.specialization}
                                        </h6>
                                    </MDBCol>

                                )
                            }
                            return null;
                        })
                    }
                </MDBRow>
            </MDBContainer>

            <MDBContainer className="mb-3 d-flex flex-column  mt-3" breakpoint="md" style={{ backgroundColor: 'whitesmoke' }} >
                <h5 className='mt-3 d-flex align-self-start '>
                    Doctors in Lahore
                </h5>
                <MDBRow className='mt-2'>
                    {
                        doc.map((index) => {
                            console.log(index.city)
                            if (index.city === "Lahore") {
                                return (
                                    <MDBCol className="border border-1 p-3" size='md-3' >
                                        <h6 style={{ cursor: 'pointer' }} onClick={() => { func(index.specialization) }} >
                                            {index.specialization}
                                        </h6>
                                    </MDBCol>
                                )
                            }
                            return null;
                        })
                    }
                </MDBRow>
            </MDBContainer>
        </>
    );
}
