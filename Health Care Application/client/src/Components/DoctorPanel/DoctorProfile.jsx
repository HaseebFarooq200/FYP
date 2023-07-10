import React, { useEffect, useState } from 'react'
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
const DoctorProfile = () => {

  const [doc, setDoc] = useState([])

  const GetDoctorProfile = async (e) => {
    try {
      const response = await fetch('/getdoctorrandom', {
        method: 'GET',
        headers: {
          Accept: 'application/json', 'Content-type': 'application/json'
        },
        credentials: 'include'
      })

      const randomDoc = await response.json()
      if (response.status === 200) {
        setDoc(randomDoc)
        console.log(doc.fullName)
      }
      else {
        const error = new Error(response.error);
        throw error
      }
    } catch (error) {
      console.log(Error)
    }
  }

  useEffect(() => {
    GetDoctorProfile()
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <MDBContainer breakpoint='md' className=" mt-5 d-flex flex-column justify-content-center align-items-center " style={{ backgroundColor: 'whitesmoke' }}  >
        <h5 className='mt-3 d-flex align-self-start ' >
          My Profile
        </h5>

        {
          doc.map((index) => {
              return (
                <>
                  <MDBContainer className='mt-3' style={{ backgroundColor: 'white' }} >
                    <div className='d-flex justify-content-between' >
                      <p className='text-start'>
                        <Badge value="Rating" severity="warning" ></Badge>
                      </p>
                      <p className='text-end'>
                        <Badge value="PMC Verified" severity="success" ></Badge>
                      </p>
                    </div>
                    <MDBRow>
                      <MDBCol size='md' className='ms-5'>
                        <h6>{index.fullName}</h6>
                        <h6>{index.email}</h6>
                        <h6>{index.gender}</h6>
                        <h6>{index.age}</h6>
                        <h6>{index.phonenumber}</h6>
                      </MDBCol>
                      <MDBCol size='md' className='ms-5'>
                        <h6>{index.city}</h6>
                        <h6>{index.address}</h6>
                        <h6>{index.hospital}</h6>
                        <h6>{index.specialization}</h6>
                        <h6>Consult Fee {index.consultFee} Rs.</h6>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>

                  <MDBContainer className='mt-3' style={{ backgroundColor: 'white' }} >
                    <MDBRow>
                      <MDBCol className='d-flex flex-column justify-content-around border border-3 bg-light' >
                        <h4>My Available Slots</h4>
                        <span>Monday {index.timing}</span>
                        <span>Tuessday {index.timing}</span>
                        <span>Wednesday {index.timing}</span>
                        <span>Thyrsday {index.timing}</span>
                        <span>Friday {index.timing}</span>
                      </MDBCol>
                    </MDBRow>

                  </MDBContainer>

                  <MDBContainer className='mt-3  mb-5' style={{ backgroundColor: 'white' }} >
                    <MDBRow className='mt-2 mb-2'>
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
                  </MDBContainer>

                  <MDBContainer className='mt-3  mb-5' style={{ backgroundColor: 'white' }} >
                    <h4 className='mb-3' > Feedback Tab</h4>
                    <div className="card">
                      <Card title="Name">
                        <p className="m-0">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                          numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                        </p>
                      </Card>
                    </div>
                    <div className="card mt-2 mb-5">
                      <Card title="Name">
                        <p className="m-0">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                          numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                        </p>
                      </Card>
                    </div>
                  </MDBContainer>
                </>
              )
          })

        }


      </MDBContainer >

    </>
  )
}

export default DoctorProfile
