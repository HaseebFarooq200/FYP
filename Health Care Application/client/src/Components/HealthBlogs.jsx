import React, { useState, useEffect } from 'react';
import {
    MDBContainer, MDBRow, MDBCol, MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage
} from 'mdb-react-ui-kit';

export default function HealthBlogs() {

    const [blogs, setBlogs] = useState([])

    const GetBlogs = async () => {
        try {
            const response = await fetch('/getblogs', {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-type': 'application/json'
                },
                credentials: 'include'
            })

            const getblogs = await response.json()
            if (response.status !== 200) {
                const error = new Error(response.error);
                throw error
            }
            else {
                setBlogs(getblogs)
            }
        }
        catch (error) {
            console.log(Error)
        }
    }
    useEffect(() => {
        GetBlogs()
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <MDBContainer className='mt-3 mb-5' style={{ backgroundColor: 'white' }} >
                <h3 className='mb-3'>Health Blogs</h3>
                <MDBRow>
                    {
                        blogs.map((index) => {
                            return (
                                <MDBCol size='md-4' >
                                    <MDBCard>
                                        <MDBCardImage src='data:image/jpeg;base64,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' position='top' alt='...' />
                                        <MDBCardBody>
                                            <MDBCardTitle>{index.title}</MDBCardTitle>
                                            <MDBCardText>
                                                {index.description}
                                            </MDBCardText>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            )
                        })
                    }
                </MDBRow>
            </MDBContainer>
        </>
    );
}
