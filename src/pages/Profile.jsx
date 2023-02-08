import React,{useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { getResume } from '../backend/api';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import Accounts from '../components/Profile/Accounts';
import EditResume from '../components/Profile/EditResume';
import Resume from '../components/Profile/Resume';
import '../css/page/profile.css';


    
  

function ResumeEditor({profile}){
    useEffect(()=>{
        getResume()
        .then(res=>{
            const resume = res.resume;
            setExperiences(resume.experiences)
            setEducations(resume.educations)
            setProjects(resume.projects)
            setSkills(resume.skills)
            setAchievements(resume.achievements)
            setBasicDetails(resume.basicDetails)
        })
        .catch(err=>console.log(err))
    },[profile])
    const [experiences,setExperiences] = useState([])
    const [educations,setEducations] = useState([])
    const [projects,setProjects] = useState([])
    const [skills,setSkills] = useState([])
    const [achievements,setAchievements] = useState([])
    const [basicDetails,setBasicDetails] = useState({name:'',small_desc:'',address:'',email:''})
    return (
        <div className='resume-editor-container'>
            <Resume 
            profile = {profile}
            experiences = {experiences}
            educations = {educations}
            projects = {projects}
            skills = {skills}
            achievements = {achievements}
            basicDetails = {basicDetails}
            />
            <EditResume
            
            basicDetails = {basicDetails} setBasicDetails = {setBasicDetails} 
            experiences = {experiences} setExperiences = {setExperiences}
            educations = {educations}   setEducations = {setEducations}
            projects = {projects}   setProjects = {setProjects}
            skills = {skills}   setSkills = {setSkills}
            achievements = {achievements} setAchievements = {setAchievements}
            />
        </div>
    )
}
function Profile() {
    const location = useLocation()
    const userProfile = location.state.profile 
    const MENU_ITEMS = [
        {name:'My Resume', value:'resume',component:<ResumeEditor profile={userProfile}/>},
        {name:'Account', value:'account',component:<Accounts profile={userProfile}/>},
    ]
    return (
        <div>
            <Navbar/>
            <div className='profile-container'>
                <div className='profile-page-other-details'>
                        <Menu MENU_ITEMS={MENU_ITEMS} />
                </div>
            </div>
        </div>
        
    );
}

export default Profile;