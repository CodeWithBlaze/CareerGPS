import React, { useContext, useEffect, useState } from 'react';
import CircularImage from '../CircularImage';
import '../../css/page/accounts.css';
import profile_photo from '../../asset/profile_image.png';
import FileUploadButton from '../FileUploadButton';
import Input from '../Input';
import Button from '../Button';
import UserContext from '../../context/UserContext';
import { getCategoriesAndSemesters, updateUserProfile, updateUserProfilePhoto } from '../../backend/api';
import { errorToast, successToast } from '../Toast';

function Accounts(props) {
    const {user} = useContext(UserContext)
    const [category,setCategory] = useState([])
    const [semesters,setSemesters] = useState([]);
    const [photo,setPhoto] = useState(user.profileData.profile_image || profile_photo)
    const {profileData} = user
    const [details,setDetails] = useState({
        name:profileData.full_name ||  '',
        course:profileData.course || '',
        stream:profileData.stream || '',
        semester:profileData.semester || '1'
    })
    const [loader,setLoader] = useState(false)
    const [loaderPhoto,setLoaderPhoto] = useState(false)
    async function updateProfilePhoto(){
        try{
            setLoaderPhoto(true)
            await updateUserProfilePhoto(photo)
            successToast('Image updated Successfully')
        }
        catch(err){
            errorToast('Something went wrong')
        }
        finally{
            setLoaderPhoto(false)
        }
    }
    async function updateProfile(){
        try{
            if(details.name === "" || details.course === "" || details.stream === "" || details.semester === ""){
                errorToast('All Fields are required')
                return;
            }
            setLoader(true)
            await updateUserProfile(details)
            successToast('Data updated Successfully')
        }
        catch(err){
            errorToast('Something went wrong')
        }
        finally{
            setLoader(false)
        }
    }
    // function
    useEffect(()=>{
        getCategoriesAndSemesters()
        .then((res)=>{
            // filter current user category obiously no one can switch to same category
            const filtered_courses = res.data.filter(course=>course._id !== profileData.course)
            setCategory([...filtered_courses])
            setSemesters([...filtered_courses[0].semesters])
            setDetails({...details,course:filtered_courses[0]._id,semester:filtered_courses[0].semesters[0]._id})
        })
        .catch(err=>errorToast('something went wrong while fetching data'))
    },[])
    function updateUserCourse(id){
        // find the course and take the semester
        const selectedCourse = (category.filter(item=>item._id === id))[0]
        setSemesters(selectedCourse.semesters)
        setDetails({...details,course:selectedCourse._id,semester:selectedCourse.semesters[0]._id})
    }
    return (
        <div className='account-screen-container'>
            <div className='account-photo-section'>
                <CircularImage 
                img={(photo instanceof File)?URL.createObjectURL(photo):photo}
                customStyle={{width:200,height:200}}
                />
                <input 
                id='profile-photo-upload' 
                type={'file'} 
                className='profile-photo-label'
                onChange={(event) => {
                    setPhoto(event.target.files[0]);
                  }}
                />
                <FileUploadButton
                for_id={'profile-photo-upload'}
                title={'Edit Photo'}
                customClass={'flatButton'}
                customStyle={{width:250}}
                />
                {
                (photo instanceof File) &&
                <Button
                title='Save Changes'
                onClick={()=>updateProfilePhoto()}
                loading={loaderPhoto}
                customClass={'flatButton'}
                customStyle={{width:250}}
                />}
            </div>
            <div className='account-details-section'>
                {
                    user && user.profileData && 
                    
                    <div className='accounts-form'>
                        <Input
                            value = {details.name}
                            onChange={(e)=>setDetails({...details,name:e.target.value})}
                            placeholder={'Enter your full name'}
                            customClass={'full-width'}
                        />
                        <div className='text-based-input'>
                        I want to change my course to 
                        <select className='text-based-input-select'  onChange={(e)=>updateUserCourse(e.target.value)}>
                            {
                                category.length > 0 && category.map(course=><option key={course._id} value={course._id}>{course.course_stream.replace('_',' ')}</option>)
                            }
                        </select>
                        <label>and I am currently in</label> 
                        <select className='text-based-input-select'  onChange={(e)=>setDetails({...details,semester:e.target.value})}>
                            {
                                semesters.map(sem=><option key={sem._id} value={sem._id}>{sem.name}</option>)
                            }
                        </select>
                        semester.<br/> 
                        </div>
                            <Button 
                            title='Save Account Details' 
                            customClass={'flatButton'} 
                            loading={loader}
                            onClick={()=>updateProfile()}
                            />
                    </div>
                }
        
            </div>
        </div>
    );
}

export default Accounts;