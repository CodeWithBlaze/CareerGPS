import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/page/register.css'
import '../css/page/common.css'
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { addUsertoDatabase, getCategoriesAndSemesters } from '../backend/api';
import LinkText from '../components/LinkText';
import { errorToast } from '../components/Toast';
import { hasFormValidDetails } from '../helpers';

function Signup(props) {
    //variables
    const [error,setError] = useState('')
    const [category,setCategory] = useState([])
    const [semesters,setSemesters] = useState([]);
    const navigate = useNavigate()

    const [userDetails,setUserDetails] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        course:"",
        semester:""
    })
    const [loading,setLoading] = useState(false);
    // function
    useEffect(()=>{
        getCategoriesAndSemesters()
        .then((res)=>{
            setCategory([...res.data])
            setSemesters([...res.data[0].semesters])
            console.log(res.data[0].semesters)
            setUserDetails({...userDetails,course:res.data[0]._id,semester:res.data[0].semesters[0]._id})
        })
        .catch(err=>console.log(err))
    },[])
    
    async function postUserData(){
        try{
            if(!hasFormValidDetails(userDetails))
                return;
            setLoading(true)
            const result = await addUsertoDatabase(userDetails);
            console.log(result)
            navigate('/')
            // add the rest of user data to database
            
        }
        catch(err){
            // handle error
            const regex = /\/(.*)\)/;
            const match = regex.exec(err.message);
            const extractedMessage = match[1];
            errorToast(extractedMessage)
        }
        finally{
            setLoading(false);
        }
        
    }
    function updateUserCourse(id){
        // find the course and take the semester
        const selectedCourse = (category.filter(item=>item._id === id))[0]
        setUserDetails({...userDetails,course:id,semester:selectedCourse.semesters[0]._id})
        setSemesters(selectedCourse.semesters)
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
                    type={'password'}
                    value={userDetails.password}
                    onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
                />
                </div>
                {category.length > 0 && <div className='text-based-input'>
                    I am a 
                    <select className='text-based-input-select' value={userDetails.course} onChange={(e)=>updateUserCourse(e.target.value)}>
                        {category.map(course=><option key={course._id} value={course._id}>{course.course_stream.replace('_',' ')}</option>)}
                    </select>
                    <label>student currently in</label> 
                    <select className='text-based-input-select' value={userDetails.semester} onChange={(e)=>setUserDetails({...userDetails,semester:e.target.value})}>
                        {
                            semesters.map(sem=><option key={sem._id} value={sem._id}>{sem.name}</option>)
                        }
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
                </div>}
            </div>
        </div>
        </>
    );
}

export default Signup;