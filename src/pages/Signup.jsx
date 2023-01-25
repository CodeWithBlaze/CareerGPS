import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/page/register.css'
import '../css/page/common.css'
import Input from '../components/Input';
import Button from '../components/Button';
function Signup(props) {
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
                <h1>Welcome to CareerGPS</h1>
                <h3>Be ready for placement with proper guidance</h3>
                <div className='user-name-container'>
                <Input
                placeholder={'First Name'}
                style={{marginRight:10}}
                />
                <Input
                placeholder={'Last Name'}
                error={error}
                setError={setError}
                />
                </div>
                <div className='email-password-container'>
                <Input
                    placeholder={'Enter your email'}
                    customClass={'full-width'}
                />
                <Input
                    placeholder={'Enter your password'}
                    customClass={'full-width'}
                />
                </div>
                <div className='text-based-input'>
                    I am a 
                    <select className='text-based-input-select'>
                        <option>BTech</option>
                    </select>
                    <select className='text-based-input-select'>
                        <option>CSE</option>
                    </select>
                    <label>student currently in</label> 
                    <select className='text-based-input-select'>
                        <option>1st</option>
                        <option>2nd</option>
                        <option>3rd</option>
                        <option>4th</option>
                    </select>
                    year.<br/> 
                    <Button title='Sign Up' customClass={'flatButton'}/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Signup;