import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/page/register.css'
import '../css/page/common.css'
import Input from '../components/Input';
import Button from '../components/Button';
import { login } from '../backend/auth';
import { useNavigate } from 'react-router-dom';
import LinkText from '../components/LinkText';
import { hasFormValidDetails, isEmailValid } from '../helpers';
import { errorToast } from '../components/Toast';
function Login(props) {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()
    const [userDetails,setUserDetails] = useState({
        email:"",
        password:""
    })
    // error variables
    const [emailError,setEmailError] = useState('')
    const [passwordError,setPasswordError] = useState('')
    async function signInUser(){
        try{
            if(!hasFormValidDetails(userDetails))
                return;
            
            setLoading(true);
            await login(userDetails.email,userDetails.password)
            navigate('/')
        }
        catch(err){
            const regex = /\/(.*)\)/;
            const match = regex.exec(err.message);
            const extractedMessage = match[1];
            errorToast(extractedMessage)
        }
        finally{
            setLoading(false)
        }
    }
    function checkEmail(){
        if(userDetails.email === "")
            setEmailError('Email cannot be empty')
        else if(!isEmailValid(userDetails.email))
            setEmailError('Not a valid email')
    }
    function checkPassword(){
        if(userDetails.password.length < 8)
            setPasswordError('Password length has be 8 character')
    }
    return (
        <>
        <Navbar activeMenu='Home'/>
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
                    value={userDetails.email}
                    onBlur={()=>checkEmail()}
                    error={emailError}
                    setError={setEmailError}
                    onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
                />
                <Input
                    placeholder={'Enter your password'}
                    customClass={'full-width'}
                    type={'password'}
                    value={userDetails.password}
                    onBlur={()=>checkPassword()}
                    error={passwordError}
                    setError={setPasswordError}
                    onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
                />
                <LinkText
                style={{textAlign:'right',fontSize:14,marginRight:10}}
                text={<p style={{fontWeight:600,color:'#6C63FF',cursor:'pointer'}}>Forgot Your Password?</p>}
                onClick={()=>navigate('/register/password')}
                />
                </div>
                <Button 
                loading={loading}
                title='Sign In' 
                customClass={'flatButton'}
                onClick={()=>signInUser()}
                />
                <LinkText
                text={<p>Do not have a account? <label style={{fontWeight:600,color:'#6C63FF',cursor:'pointer'}}>Create one here</label></p>}
                onClick={()=>navigate('/register/signup')}
                />
            </div>
        </div>
        </>
    );
}

export default Login;