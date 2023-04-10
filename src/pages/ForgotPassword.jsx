import React from 'react';
import Form from '../components/Admin/Form';
import Button from '../components/Button';
import Input from '../components/Input';
import password_reset_image from '../asset/password_reset.svg'
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { sendResetEmailToUser } from '../backend/auth';
import { useNavigate } from 'react-router-dom';
import '../css/page/forgot_password.css';
function ForgotPassword(props) {
    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    async function sendResetEmail(){
        setLoading(true);
        await sendResetEmailToUser(email)
        setLoading(false)
        alert("Password Reset email has been sent")
        navigate('/register') 
    }
    return (
        <>
        <Navbar activeMenu='Home'/>
        <div className='forgot-password-container'>
            <img src={password_reset_image} className='forgot-password-image'/>
            <Form customClass='forgot-password-form'>
                <Input
                placeholder={'Enter your email address'}
                customClass={'full-width'}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <Button
                title='Send Password Reset Link'
                customClass={'flatButton'}
                loading={loading}
                onClick={sendResetEmail}
                />
            </Form>
        </div>
        </>
    );
}

export default ForgotPassword;