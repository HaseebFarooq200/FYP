import React from 'react'
import { Badge } from 'primereact/badge';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
}
    from 'mdb-react-ui-kit';

const Appointments = () => {
    return (
        <>
            <MDBContainer breakpoint='md' className=" mt-5 d-flex flex-column justify-content-center align-items-center " style={{ backgroundColor: 'whitesmoke' }}  >         
                <h5 className='mt-3 d-flex align-self-start ' >
                    My Appointments
                </h5>
                <MDBContainer className='mt-3' style={{ backgroundColor: 'white' }} >
                    <p className='text-end'>
                        <Badge value="Active" severity="success" ></Badge>
                    </p>
                    <MDBRow>
                        <MDBCol size='md' className='ms-5'>
                            <h6>Name : Doc Name</h6> <br />
                            <h6>Email : Doc Email  </h6> <br />
                            <h6>Specialization : Doc Specialization  </h6> <br />
                            <h6>Address: Doc Address</h6> <br />
                        </MDBCol>
                        <MDBCol size='md' className='ms-5'>
                            <h6>Appointment Date</h6> <br />
                            <h6>Subject: Appointment Subject</h6> <br />
                            <h6>Cancel appointment / Rating</h6> 
                        </MDBCol>
                    </MDBRow>
                    <MDBRow  >
                        <MDBCol >

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBContainer >
        </>
    )
}

export default Appointments
