import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/page/register.css'
import '../css/page/common.css'
import Input from '../components/Input';
import Button from '../components/Button';
import { login } from '../backend/auth';
import { useNavigate } from 'react-router-dom';
import LinkText from '../components/LinkText';
import { hasFormValidDetails } from '../helpers';
function Login(props) {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()
    const [userDetails,setUserDetails] = useState({
        email:"",
        password:""
    })
    
    async function signInUser(){
        try{
            if(!hasFormValidDetails(userDetails))
                return;
            setLoading(true);
            await login(userDetails.email,userDetails.password)
            navigate('/')
        }
        catch(err){
            alert("Error")
            console.log(err);
        }
        finally{
            setLoading(false)
        }
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
                    onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
                />
                <Input
                    placeholder={'Enter your password'}
                    customClass={'full-width'}
                    value={userDetails.password}
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