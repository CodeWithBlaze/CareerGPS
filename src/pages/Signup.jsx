import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/page/register.css'
import '../css/page/common.css'
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { addUsertoDatabase } from '../backend/api';
import LinkText from '../components/LinkText';
function Signup(props) {
    //variables
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const [userDetails,setUserDetails] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        course:"BTech",
        stream:"CSE",
        semester:"1"
    })
    const [loading,setLoading] = useState(false);
    // function
    async function postUserData(){
        try{
            setLoading(true)
            const result = await addUsertoDatabase(userDetails);
            console.log(result)
            navigate('/')
            // add the rest of user data to database
            
        }
        catch(err){
            // handle error
            alert("Error occured")
            console.log(err)
        }
        finally{
            setLoading(false);
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
                <h1>Welcome to CareerGPS</h1>
                <h3>Be ready for placement with proper guidance</h3>
                <div className='user-name-container'>
                <Input
                placeholder={'First Name'}
                style={{marginRight:10}}
                value={userDetails.first_name}
                onChange={(e)=>setUserDetails({...userDetails,first_name:e.target.value})}
                />
                <Input
                placeholder={'Last Name'}
                error={error}
                setError={setError}
                value={userDetails.last_name}
                onChange={(e)=>setUserDetails({...userDetails,last_name:e.target.value})}
                />
                </div>
                <div className='email-password-container'>
                <Input
                    placeholder={'Enter your email'}
                    customClass={'full-width'}
                    value={userDetails.email}
                    onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
                />
                <Input
                    placeholder={'Enter your password'}
                    customClass={'full-width'}
                    value={userDetails.password}
                    onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
                />
                </div>
                <div className='text-based-input'>
                    I am a 
                    <select className='text-based-input-select' value={userDetails.course} onChange={(e)=>setUserDetails({...userDetails,course:e.target.value})}>
                        <option>BTech</option>
                    </select>
                    <select className='text-based-input-select' value={userDetails.stream} onChange={(e)=>setUserDetails({...userDetails,stream:e.target.value})}>
                        <option>CSE</option>
                    </select>
                    <label>student currently in</label> 
                    <select className='text-based-input-select' value={userDetails.semester} onChange={(e)=>setUserDetails({...userDetails,semester:e.target.value})}>
                        <option value={"1"}>1st</option>
                        <option  value={"2"}>2nd</option>
                        <option value={"3"}>3rd</option>
                        <option value={"4"}>4th</option>
                    </select>
                    semester.<br/> 
                    <Button 
                    title='Sign Up' 
                    loading={loading}
                    customClass={'flatButton'} 
                    onClick={()=>postUserData()}/>
                    <LinkText 
                    text={<p>Already have a account? <label style={{fontWeight:600,color:'#6C63FF',cursor:'pointer'}}>Sign In here</label></p>}
                    onClick={()=>navigate('/register')}
                    />
                </div>
            </div>
        </div>
        </>
    );
}

export default Signup;