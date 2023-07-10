import React from 'react';
import { Link} from 'react-router-dom';
import {
    MDBFooter,
  } from 'mdb-react-ui-kit';
export default function Footer() {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' >
            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright:
                <Link className='text-reset fw-bold' to='#'>
                    SmartHealthCare.com
                </Link>
            </div>
        </MDBFooter>

    );
}
