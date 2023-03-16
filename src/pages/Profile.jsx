import React,{useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { getResume } from '../backend/api';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import Accounts from '../components/Profile/Accounts';
import EditResume from '../components/Profile/EditResume';
import Resume from '../components/Profile/Resume';
import '../css/page/profile.css';
import { faCloud,faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addResume} from '../backend/api';
import { Spinner } from 'react-activity';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
    
  

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
    const [save,setSave] = useState(false);

    // updates
    const [updateData,setUpdateData] = useState(null);
    async function saveResumeToDatabase(){
        setSave(true);
        const resume = {
            experiences,
            educations, 
            projects, 
            skills, 
            achievements,
            basicDetails
        }
        try{
            await addResume(resume)
        }
        catch(err){
            console.log(err)
        }
        setSave(false)
    }
    function downloadResumeAsPDF(){
        const input = document.getElementById('resume-container');
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("download.pdf");  
        })
    }
    
    return (
        <>
            <div className='saveResume'>
                <div className='icon-container icon-for-resume' onClick={()=>saveResumeToDatabase()}>
                    {
                        save?<Spinner color='white'/>:<FontAwesomeIcon icon={faCloud} color={'white'} size={'lg'}/>
                    }
                </div>
                <div className='icon-container icon-for-resume' onClick={downloadResumeAsPDF}>
                        <FontAwesomeIcon icon={faDownload} color={'white'} size={'lg'}/>
                </div>
            </div>
            <div className='resume-editor-container'>
            <Resume 
            profile = {profile}
            experiences = {experiences}
            educations = {educations}
            projects = {projects}
            skills = {skills}
            achievements = {achievements}
            basicDetails = {basicDetails}
            setUpdateData={setUpdateData}
            />
            <EditResume
            
            basicDetails = {basicDetails} setBasicDetails = {setBasicDetails} 
            experiences = {experiences} setExperiences = {setExperiences}
            educations = {educations}   setEducations = {setEducations}
            projects = {projects}   setProjects = {setProjects}
            skills = {skills}   setSkills = {setSkills}
            achievements = {achievements} setAchievements = {setAchievements}
            updateData={updateData}
            setUpdateData={setUpdateData}
            />
        </div>
        </>
        
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