import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse
} from 'mdb-react-ui-kit';
export default function Navbar() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <header className='sticky-top' >

      {/* <!-- Navbar --> */}
      <MDBNavbar expand='lg' light bgColor='light'  >
        {/* <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 10, 0.9)' }}></div> */}
        <MDBContainer fluid >
          <MDBNavbarBrand href='#'>
            Smart Health Care
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <Link to='/home'>
                  <MDBNavbarLink active aria-current='page' >
                    Home
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/hoslist'>
                  <MDBNavbarLink active aria-current='page' >
                    Hospitals
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/alldocs'>
                  <MDBNavbarLink active aria-current='page' >
                    Doctors
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/healthblog' >
                  <MDBNavbarLink active aria-current='page' >
                    Health Blogs
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/myprofile' >
                  <MDBNavbarLink active aria-current='page' >
                    My Profile
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/myappointment' >
                  <MDBNavbarLink active aria-current='page' >
                    My Appointments
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/' >
                  <MDBNavbarLink active aria-current='page' >
                    Logout
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <Link to='/register'>
              <MDBBtn style={{ width: '200px' }} >Join as Doctor ?</MDBBtn>
            </Link>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      {/* <!-- Navbar --> */}
    </header>

  );
}
