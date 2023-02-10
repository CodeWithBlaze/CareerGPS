import React, { useContext, useState } from 'react';
import CircularImage from '../CircularImage';
import '../../css/page/accounts.css';
import profile_photo from '../../asset/profile_image.png';
import FileUploadButton from '../FileUploadButton';
import Input from '../Input';
import Button from '../Button';
import UserContext from '../../context/UserContext';
import { updateUserProfile, updateUserProfilePhoto } from '../../backend/api';
function Accounts(props) {
    const {user} = useContext(UserContext)
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
        setLoaderPhoto(true)
        await updateUserProfilePhoto(photo)
        setLoaderPhoto(false)
    }
    async function updateProfile(){
        setLoader(true)
        await updateUserProfile(details)
        setLoader(false)
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
                        <select className='text-based-input-select' value={details.course} onChange={(e)=>setDetails({...details,course:e.target.value})}>
                            <option>BTech</option>
                        </select>
                        <select className='text-based-input-select' value={details.stream} onChange={(e)=>setDetails({...details,stream:e.target.value})}>
                            <option>CSE</option>
                        </select>
                        <label>and I am currently in</label> 
                        <select className='text-based-input-select' value={details.semester} onChange={(e)=>setDetails({...details,semester:e.target.value})}>
                            <option value={"1"}>1st</option>
                            <option  value={"2"}>2nd</option>
                            <option value={"3"}>3rd</option>
                            <option value={"4"}>4th</option>
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