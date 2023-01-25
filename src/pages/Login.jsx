import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/page/register.css'
import '../css/page/common.css'
import Input from '../components/Input';
import Button from '../components/Button';
function Login(props) {
    const [error,setError] = useState('')
    return (
        <>
        <Navbar/>
        <div className='container signup-container'>
            <img src='https://res.cloudinary.com/codecafe/image/upload/v1674550046/CareerGPS/18056_m2g0fm.jpg' 
            alt='person with laptop'
            className='signup-image'
            />
            <div className='signup-form-container'>
                <h1>Let's build your career together</h1>
                <h3>Be ready for placement with proper guidance</h3>
                <div className='email-password-container'>
                <Input
                    placeholder={'Enter your email'}
                    customClass={'full-width'}
                    style={{marginTop:15}}
                />
                <Input
                    placeholder={'Enter your password'}
                    customClass={'full-width'}
                />
                </div>
                <Button title='Sign Up' customClass={'flatButton'}/>
            </div>
        </div>
        </>
    );
}

export default Login;