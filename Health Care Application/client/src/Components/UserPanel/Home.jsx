import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import {
  MDBIcon,
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit';
export default function Home() {

  const [disease, setDisease] = useState('')
  const [toggleOneModal, setToggleOneModal] = useState(false);
  const [toggleTwoModal, setToggleTwoModal] = useState(false);
  const navigate = useNavigate()
  const [formValue, setFormValue] = useState({
    s1: '', s2: '', s3: '', s4: '', s5: '', s6: '', s7: '', s8: '', s9: '', s10: '', s11: '', s12: '', s13: '', s14: '', s15: '', s16: '', s17: ''
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const GetDisease = async (e) => {
    try {
      const { s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17 } = formValue
      // e.preventDefault();
      const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17 })
      })
      console.log("Status")


      const data = await response.json()
      if (response.status === 200) {
        setFormValue({
          s1: '', s2: '', s3: '', s4: '', s5: '', s6: '', s7: '', s8: '', s9: '',
          s10: '', s11: '', s12: '', s13: '', s14: '', s15: '', s16: '', s17: ''
        });
        setDisease(data)
        setToggleTwoModal(!toggleTwoModal);
      }
      else if(response.status ===404) {
        window.alert("Enter at least 1 symptom")
      }
      else{
        window.alert("Something went wrong")
      }
    }
    catch (error) {
      console.log("Is this an error ?", Error)
    }
  }
  return (
    <>
      <Card className="bg-dark text-white">
        <Card.Img src="https://st2.depositphotos.com/1755195/11804/i/450/depositphotos_118046820-stock-photo-dark-blue-background-illustration.jpg"
          alt="Card image" style={{ height: '500px', width: '100%' }} />
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
        <Card.ImgOverlay>
          <div className="d-flex flex-column justify-content-center align-items-center mt-5" >
            <Card.Title > <h1> Welcome to Smart <br /> Health Care System </h1></Card.Title>
            <Card.Text className='mt-5 w-50 text-center'>
            Smart Healthcare System is most likely a connection between patient and doctor where patients of intermediate will see all the 
            relevant things according to their medical health.
            </Card.Text>
          </div>
        </Card.ImgOverlay>
      </Card>
      <MDBContainer className=" mt-5 d-md-flex justify-content-around align-items-center ">
        <MDBCard style={{ maxWidth: '540px' }}>
          <MDBRow>
            <MDBCol md='4'>
              <MDBCardImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9HE2iGIJkD4gpfCIvEXngzfVMev-dIiZPjQ&usqp=CAU' alt='...' fluid />
            </MDBCol>
            <MDBCol md='8'>
              <MDBCardBody>
                <MDBCardTitle>Book Appointment</MDBCardTitle>
                <MDBCardText>
                  Book physical appointment with specialized doctors accordingly
                </MDBCardText>
                <Link to={'/alldocs'} >
                  <MDBBtn className='mt-5'>
                    Book an Appointment
                    <MDBIcon className='ms-1' fas icon="arrow-right" />
                  </MDBBtn>
                </Link>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>

        <MDBCard style={{ maxWidth: '540px' }}>
          <MDBRow>
            <MDBCol md='4'>
              <MDBCardImage src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDhAQDxAQDxAQEBAVEBAQDw8PEA8NFxIXGBUSFhUYHSggGBolHhYYITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGislHyU1Ky8tNystLTUrKzctMCsvMSstLS0tKys3NSstLy0tNS0uLS0tMS0tKy4uLS01Ky0tLv/AABEIAPYAzQMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQj/xABFEAACAQMBAwcGDAQEBwAAAAAAAQIDBBESBSExBgcTQVFxoSIyYYGRsRQjQlJicoKSssHC8CQzotFTY+HxCBU1Q6Oz0v/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACYRAQEAAQMDAwUBAQAAAAAAAAABAgMRIQQSMSJBURMyYXGRsRT/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAABqvKjl5Z7Pm6UtVausZpUsPRnhrk3iPdx9BFsnlbDDLO7YxtQOVy54Hq3WK09rufKx3dH+ZNbH50bGtJQrRqWrfCVTEqWfTOPDvaSKTVwvu2y6XVk3uLegUwmpJSi1KLSaaaaafBp9ZUaOcAAAAAAAAAAAAAAAAAAAAAAAAAAA+aeUFCrTvLiNfPSdPVcm/ltzb1J9aecn0sc+u3UneXFGrZr4Mp1HGtUnSnrk5ZfxfFJtvHcc3U3bGV39BfVY40e43J9Tzh9TxxOnX8KFvVxT2U6qWG6tG3ovD7IrGW/YRPODpqUbOcIyWpzUYuDhPeo4joaynu4HJM969PdM8zG25uVaxnJyhGn0tFPfoSko1Ir0ZlB47+06ocn5suTlza7QVWsoRjK2qxwppyU3Km1Frtwm92eB1g7tDLfB4/WYyavAADZygAAAAAAAAAAAAAAAAAAAAAAAKK0HKMlGTg3FpTjpbi2t0lqTWV6U0cz2rsupR2hVq/DLqdSqqcZKbouEYrDTjFQSW/sS4y7Tp5rXKKhispqKblFNNrrW5pPq6jm6rf6fDt6C4/V9TVFsi4V9G5d3OUIwcOhdGKhpenV5rT+TlZzh57WSe0VHo3JpNpNRbSbi3ueH1GRBPr9nYRu06+ryY74xflSXDV3nnZZXJ6+hperaftIcjLZTuataM9eJZml8ibTSg/Tvb9S7TdyB5F7Jha2uYvVK5qSr1HjHlVMNL1RUV6s9ZPHqaGHbhHi9Zq/U1rfjj+AANnKAAAAAAAAAAAAAAAAAAAAAAAAFm5oQmsTSaW/f1esuSlgiNu7Tjbqkpv+ZWpQePpTUV4vwYmPde1GWfZO5GbWt4KppipKGFu1Pf+ZH3NLMFTpx8qbUYxXbnP5Gw7VtHOUXHGrhhvG7tK7SxhRTnJpyxvk+EV2R/e84b0mWWrZ4j08Ovxw0pbd7Pb8/lmbNh0cI0s56OEEn6EkjMIPY15Ks7qo90I1lTpr6EKcXKXfqnJfZRLUJ5jF/RXuO7Kdt2eZhlc53fK8DxM9CQAAAAAAAAAAAAAAAAAAAAAPGz0t1ZEVMeat+DUtuw+EbQtqXyYSq1X6Oihpj/AF1c+o2mmk/sv2PH+pq1q9W08vqsW/XUuXn8CNtD3rm6rntx+b/ibt6GIycnqlJYbfZ2IxqtOrPKm/Jinj6TxuZnrzfWQPKLbKpRnQpRqVbqdKWinSg5uCawpyx5qNcN7eGGp24471lck/8Apqn11Z3NTPap1qjj4YJe2l5EWuxGpch7tKyhZ1tdK5oRqydKpCUHKi6snCccryo4lFbjZrKfGL4p/wC5za0s1Lu7ensuljt8RIwkVpmNF4L8WUlaWKwAWVAAAAAAAAAAAAAAAAAAAMaq/AyWYV2/Jl3MrktGPQqtUa0+LSnLHb5L3eBr11Up0KirxmpVVB0nmT1SpwzLGjhhtbsLPlLe+vY6KxTn6aWfxGFDZlHMZaMuOHFOU3CLXBqDelY6t2410t9mGtt3cpCXmrvZB8mrWahVr1Y6a11VlUknjMKSemlT9UUvayYuXiln0Sx3lL8mP1V7kay+zDLGcVGcp7aThZXNOLlUoV6SelNylbVcU6scLjukn9kkLyDhUyt2d67+suVFqt4L/L90G/ekV7RWYp93ijmzu/Hw7NObc/Kq3rKa9K4oyab6jAlRcYQqR44Wpd/WZVKeUmusquy4s9KYlRaKUABIAAAAAAAAAAAAAAAAGHeR8mXczMLdaGURUxgt+R328vav9ymPBdxTnENPXDpI/ZlF4ftPYcF3I00vDDW+5XWjmnj95Izad9OGmKoVZqplSnHRoprd52/PX2dpKvzF3mFtD+X60a4eWOpv28PNk3cq1GGaNWlLROOmokt+5KeU/N4+n0GferyJLsS8MFOyt9NP6KXiy5debPuZzZ/dXZpfZP1F+jDNKKfBwS8DCsPNx2SaM6g/i4v6K9xiWMfJT7W2RVozolR5E9JiKAAlAAAAAAAAAAAAAAAAAAAMO8t90muLj4rejDt3mEfqr3F7lDedBa163+HSqSX1lF48cHDaO3L+Kap7QuKeHuzKFXPpxUTI+rjp+Vv+fPV2uOzunyPWYt3JKEk3xW5deeo4zT5W7bWqKv4TWf8AuW1CL9sYmNcco9tNP+Lpp/Qo0Mv1yiTOp05eareh1spxJ/Xd9jfyV9aXvL1dbpdz9xqXNFtOvdbL13M5TqxuK0XKUVF4WlrcklwkbhUjxIyu9tThjcZJfZb1/ERS4ySivz8Ml2hD2LcjEsk5Jdkcpd7e9kjCOEROU3hUACyoAAAAAAAAAAAAAAAAAAAAA07nUuuj2ZOOcOrOlBfe1teyDOKHUeea58i1pfOnUm/sxSX42cuM75bYeDALNevplTXz5NeH98F4hd1zmdnmxrx7LqT9TpU/7M3mU0nh8H7znvMzU+Ju49lWlL70Wv0m/wBxDUmu1eJb2ZXyqs0lqivktJduMZMgjtlSeqafHd4ZRIlp4UvkABKAAAAAAAAAAAAAAAAAAAAABx7ngr6r6lDqhbp+uVSWfCKNENq5za2vatZfMhRj/QpfqZqNxVUIOT6l7X1IzdGPhEbVrN1ko73DCWN718d3gT9xQnTnKFRaZwbU49klxRZ5udlfDNqUta1Qot16m7c9LWlffcfYza+X9mqd+59VaEZr668mXuT9YN0/zMSxUvY9sLd+x1P/AKOm1TlPNBWxe3EOp2zkvs1IL9Z1aqSzy8sahur/AFo+P7RIEbN4q036v37SSJxUyAAWQAAAAAAAAAAAAAAAAAAAeS4M9PGsgfP3LStr2nePsryj9xKH6TS9r3WqWhcI8fTL/Qz+Uu1J/Db9Li726xLO9LppGvt4WTN0R2DmY2ZotK1y15Vepoi/8qnu/E5ewkec201UKNZLfTqOL+rNf3ivabNyX2JUtbC1o6HmFGGrh/Ma1Tf3my1ys2dOrY3EHCWVTclufnQ8pfhIV35aVzTzxtPHzretHxhL9J2SpwOH829XTta17JdNF+ujPHikdwqcC0Rl5YN68aH2S/fuJQi7/wA1d/5MkaLeiOeOlZ78E4qZKwAWVAAAAAAAAAAAAAAAAAAAAAHytyv2bUp317LjH4Xct44rNaT3ow+Tdn8IvrSi96q3NCMl9B1I6vDJu/Lulo2leQfB1ZSa7daUv1ENzWWmvb1nHiqdStJ/YpVMeOCjffh9Lnkoppp701hrtR6C7B8+bPrrZ204yknJWtxOMksapRi5QeM9eDbb7nmtoycIWdxOSkktc6VOOX6U5PwIHnKs+i2rX3YVVU6kftRSl/VGRzy6h/Fr01KXi4mbfaXl9ZKhHc2stcM9TLoBowAAAAAAAAAAAAAAAAAAAAAAAAcU517bRtSUv8WjSn60nD9BG8zFvq27Vlj+XbXEu5upTj+pm2889pvtKyXVVpyf3ZRX4yG5jaOdpbQn8yhSj9+bb/Ainu139DtIALsnLOeeyxUta6XnRqUpP6rUoL+qZyO5hm8ofSqUP/Ykd/51LLpdmTmll0KlOou7OiXhNv1HCXDN9Yr51zQX/mh/cpfLbC8PqYAF2IAAAAAAAAAAAAAAAAAAAAAAADT+dSy6XZc5JZdCpTqLuzol4Tb9RqfMRS+N2pP6VrFepVW/ejpPKWFKVjcwr1IUac6FWMqk5KMaacH5WX2cfUc6/wCHyWq1vptrXK5g5LrS6JNPHZly9jI915fTXWAASoxNrWauLatQfCrSqQ7tUWs+J8221J/8w2cmsSV9bpp8U1WhleB9OnAdt2bpcqqNu44i9oUK0H86FWcZ7l1JNyj9krWmF8u/AAszAAAAAAAAAAAAAAAAAAALUqkvm/mXQBYdZ9iIfbE9oONVWqoqThJUpyrOOibjulKLpyW57+vgT55pXYgOL3fI3lNcz/ir22mnjynVlimuvRCNJJdTe7e4x7CY5r+RV7sm7uZ150ZUalJQj0U5yc5RnmMnFxWNzl1vidP0LsQ6NdhGy3dVnpn6D3pn6C50a7B0a7CVVvpn2I0PlJR2VU2lSvq9zTpXFk4Rw7ilTXxc3JKcZb+Mn7ToHRrsKZ21NvMoQbXBuKbXtIsTLst217GpCM4b4zjGUWuuLWUzIi8oJLsPSUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=' alt='...' fluid />
            </MDBCol>
            <MDBCol md='8'>
              <MDBCardBody>
                <MDBCardTitle>Find Disease</MDBCardTitle>
                <MDBCardText>
                  Find your disease by entering symptoms by a trained model with 99% accuracy
                </MDBCardText>
                <MDBBtn className='mt-5' onClick={()=>{ navigate('/disease') }} >
                  Find Disease
                  <MDBIcon className='ms-1' fas icon="arrow-right" />
                </MDBBtn>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>

      </MDBContainer>

      <MDBModal show={toggleOneModal} setShow={setToggleOneModal} tabIndex='-1'>
        <MDBModalDialog top-right size='lg'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Enter your Symptoms</MDBModalTitle> 
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={() => setToggleOneModal(!toggleOneModal)}
              ></MDBBtn> <br/>

            </MDBModalHeader>
            <span className=' ms-3 mt-2 mb-2 text-muted' > More symptoms results in more accuracy </span>
            <MDBModalBody>
              {/* 1st Row */}
              <MDBRow>
                <MDBCol size='md'>
                  <MDBInput label='Symptom 1' id='form1' type='text' name='s1' value={formValue.s1} onChange={onChange} />
                </MDBCol>
                <MDBCol size='md'>
                  <MDBInput label='Symptom 2' id='form1' type='text' name='s2' value={formValue.s2} onChange={onChange} />
                </MDBCol>
                <MDBCol size='md'>
                  <MDBInput label='Symptom 3' id='form1' type='text' name='s3' value={formValue.s3} onChange={onChange} />
                </MDBCol>
              </MDBRow>
              {/* 2nd Row */}
              <MDBRow className='mt-3' >
                <MDBCol size='md'>
                  <MDBInput label='Symptom 4' id='form1' type='text' name='s4' value={formValue.s4} onChange={onChange} />
                </MDBCol>
                <MDBCol size='md'>
                  <MDBInput label='Symptom 5' id='form1' type='text' name='s5' value={formValue.s5} onChange={onChange} />
                </MDBCol>
                <MDBCol size='md'>
                  <MDBInput label='Symptom 6' id='form1' type='text' name='s6' value={formValue.s6} onChange={onChange} />
                </MDBCol>
              </MDBRow>
              {/* 3rd Row */}
              <MDBRow className='mt-3' >
                <MDBCol size='md'>
                  <MDBInput label='Symptom 7' id='form1' type='text' name='s7' value={formValue.s7} onChange={onChange} />
                </MDBCol>
                <MDBCol size='md'>
                  <MDBInput label='Symptom 8' id='form1' type='text' name='s8' value={formValue.s8} onChange={onChange} />
                </MDBCol>
                <MDBCol size='md'>
                  <MDBInput label='Symptom 9' id='form1' type='text' name='s9' value={formValue.s9} onChange={onChange} />
                </MDBCol>
              </MDBRow>
              {/* 4th Row */}
              <MDBRow className='mt-3' >
                <MDBCol size='md'>
                  <MDBInput label='Symptom 10' id='form1' type='text' name='s10' value={formValue.s10} onChange={onChange} />
                </MDBCol>
                <MDBCol size='md'>
                  <MDBInput label='Symptom 11' id='form1' type='text' name='s11' value={formValue.s11} onChange={onChange} />
                </MDBCol>
                <MDBCol size='md'>
                  <MDBInput label='Symptom 12' id='form1' type='text' name='s12' value={formValue.s12} onChange={onChange} />
                </MDBCol>
              </MDBRow>
              {/* 5th Row */}
              <MDBRow className='mt-3' >
                <MDBCol size='md-4'>
                  <MDBInput label='Symptom 13' id='form1' type='text' name='s13' value={formValue.s13} onChange={onChange} />
                </MDBCol>
                <MDBCol size='md-4'>
                  <MDBInput label='Symptom 14' id='form1' type='text' name='s14' value={formValue.s14} onChange={onChange} />
                </MDBCol>
                <MDBCol size='md-4'>
                  <MDBInput label='Symptom 15' id='form1' type='text' name='s15' value={formValue.s15} onChange={onChange} />
                </MDBCol>
              </MDBRow>
              {/* 6th Row */}
              <MDBRow className='mt-3' >
                <MDBCol size='md-4'>
                  <MDBInput label='Symptom 16' id='form1' type='text' name='s16' value={formValue.s16} onChange={onChange} />
                </MDBCol>
                <MDBCol size='md-4'>
                  <MDBInput label='Symptom 17' id='form1' type='text' name='s17' value={formValue.s17} onChange={onChange} />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                onClick={() => {
                  GetDisease();
                  setToggleOneModal(!toggleOneModal);
                }}
              >
                Find Disease
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={toggleTwoModal} setShow={setToggleTwoModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Disease</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={() => setToggleTwoModal(!toggleTwoModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>You are suffering from {disease} </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                onClick={() => {
                  setToggleTwoModal(!toggleTwoModal);
                  setTimeout(() => {
                    setToggleOneModal(!toggleOneModal);
                  }, 400);
                }}
              >
                Go Back
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

    </>
  )
}
