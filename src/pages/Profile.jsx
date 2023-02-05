import React from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import Accounts from '../components/Profile/Accounts';
import EditResume from '../components/Profile/EditResume';
import Resume from '../components/Profile/Resume';
import '../css/page/profile.css';


const MENU_ITEMS = [
    {name:'My Resume', value:'resume',component:<ResumeEditor/>},
    {name:'Account', value:'account',component:<Accounts/>},
]
function ResumeEditor(){
    return (
        <div className='resume-editor-container'>
            <Resume/>
            <EditResume/>
        </div>
    )
}
function Profile(props) {
    return (
        <div>
            <Navbar/>
            <div className='profile-container'>
                <div className='profile-page-other-details'>
                        <Menu MENU_ITEMS={MENU_ITEMS}/>
                </div>
            </div>
        </div>
        
    );
}

export default Profile;