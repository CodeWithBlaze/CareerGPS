import React from 'react';
import Navbar from '../components/Navbar';
import Resume from '../components/Resume';
import '../css/page/profile.css'
function Profile(props) {
    return (
        <div>
            <Navbar/>
            <div className='resume-and-profile-container'>
                <Resume/>
            </div>
        </div>
    );
}

export default Profile;