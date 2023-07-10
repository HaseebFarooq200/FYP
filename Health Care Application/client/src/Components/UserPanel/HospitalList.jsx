import React, { useState, useEffect } from 'react';
import img1 from './img.jpg';
import {
    MDBContainer,
    MDBBtn,
    MDBRow,
    MDBCol,
}
from 'mdb-react-ui-kit';

export default function HospitalList() {
    const [hosname, setHosname] = useState([])

    const GetHospital = async () => {
        try {
            const response = await fetch('/getdoctor', {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })

            const hosList = await response.json()
            if (response.status !== 200) {
                const error = new Error(response.error);
                throw error
            }
            else {
                setHosname(hosList)
            }
        } catch (error) {
            console.log(Error)
        }
    }

    useEffect(() => {
        GetHospital()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <MDBContainer className='mt-3 d-flex flex-column justify-content-center ' breakpoint="md" style={{ backgroundColor: 'whitesmoke' }}>
                <h5 className='mt-3' >Search Hospital</h5>
                <form className='d-flex input-group w-auto mb-3 mt-2 '>
                    <input type='search' className='form-control' placeholder='Search Name of Doctor' aria-label='Search' />
                    <MDBBtn color='primary'>Search</MDBBtn>
                </form>
            </MDBContainer>

            <MDBContainer breakpoint='md' className=" mt-5 d-flex flex-column justify-content-center align-items-center " style={{ backgroundColor: 'whitesmoke' }}  >
                <h5 className='mt-3 d-flex align-self-start ' >
                    Hospitals List
                </h5>

                {
                    hosname.map((index) => {
                        return (
                            <>
                                <MDBContainer className='mt-3' style={{ backgroundColor: 'white' }} >
                                    <MDBRow>
                                        <MDBCol size='md-3' className='d-flex justify-content-center align-items-center'   >
                                            <img className="shadow-2 rounded-circle w-75" alt="avatar2"
                                                src={img1} />
                                        </MDBCol>
                                        <MDBCol size='md' className='d-flex flex-column justify-content-evenly '  >
                                            <h5>{index.hospital}</h5>
                                            <h5>Address: {index.address}</h5>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </>
                        )
                    })
                }
            </MDBContainer >

        </>
    );
}
