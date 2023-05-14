import React from 'react';
import { MDBContainer, MDBRow, MDBCol} from 'mdb-react-ui-kit';
export default function PatientProfile() {
  return (
    <>
     <MDBContainer breakpoint="sm" className="mt-5" style={{marginBottom:'250px'}} >
                <MDBRow>
                    <MDBCol size="md-3" className="d-flex justify-content-center " >
                        <img className="rounded-circle w-100 border border-2 " alt="avatar2" src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" />
                    </MDBCol>
                    <MDBCol size="md-4" className="d-flex flex-column justify-content-around  " >
                        <h5>Dr. Syed Mohd. Sikandar</h5>
                        <span>siku689@gmail.com</span>
                        <span>Male</span>
                        <span>0311-7307858</span>
                    </MDBCol>
                </MDBRow>
                <MDBRow className='mt-5'>
                    <h4 className='mb-3' >Health Records</h4>
                </MDBRow>
            </MDBContainer>
    </>
  );
}
