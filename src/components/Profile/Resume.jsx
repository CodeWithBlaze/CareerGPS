import { useContext, useState } from 'react';
import { RESUME_CATEGORY } from '../../config/constant';
import UserContext from '../../context/UserContext';
import '../../css/resume.css';
import ResumeCategory from '../ResumeCategory';
import { faCloud,faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResumeHeadingText from '../ResumeHeadingText';
import { addResume} from '../../backend/api';
import { Spinner } from 'react-activity';
function Resume({
    profile,
    experiences,
    educations, 
    projects, 
    skills, 
    achievements,
    basicDetails
}){
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
    const {user} = useContext(UserContext)
    const [save,setSave] = useState(false);
    return (
       <div className="resume-container">
            <div className='resume-left-content'>
                <div className='resume-basic-details'>
                    <h1>{basicDetails.name || profile.full_name || 'Your Name'}</h1>
                    <label>{basicDetails.small_desc || 'your small description'}</label>
                </div>
                <div className='resume-category-container'>
                    <ResumeHeadingText text={'EXPERIENCE'}/>
                        {
                            experiences.map(experience=>
                            <ResumeCategory key={experience._id} 
                            type={RESUME_CATEGORY.EXPERIENCE}
                            details={experience}
                            />)
                        }
                        
                    <ResumeHeadingText text={'EDUCATION'}/>
                        {
                            educations.map(education=>
                            <ResumeCategory key={education._id} 
                            type={RESUME_CATEGORY.EDUCATION}
                            details={education}
                            />)
                        }
                        
                    
                    
                </div>
            </div>
            <div className='resume-right-content'>
                <div className='resume-basic-details'>
                    <address>
                            {basicDetails.address || <label>123 Your StreetYour City, ST 12345(123) 456-7890</label>}
                    </address>
                    <p className='resume-email'>{ basicDetails.email || user.email || 'no_reply@example.com'}</p>
                </div>
                <div className='resume-category-container-right'>
                        <ResumeHeadingText text={'PROJECTS'}/>
                        {
                            projects.map(project=>
                            <ResumeCategory key={project._id} 
                            type={RESUME_CATEGORY.PROJECT}
                            details={project}
                            />)
                        }
                        
                        <ResumeHeadingText text={'SKILLS'}/>
                        {
                            skills.map(skill=>
                            <ResumeCategory key={skill._id} 
                            type={RESUME_CATEGORY.SKILL}
                            details={skill}
                            />)
                        }
                        <ResumeHeadingText text={'ACHIEVEMENTS'}/>
                        {
                            achievements.map(achievement=>
                            <ResumeCategory key={achievement._id} 
                            type={RESUME_CATEGORY.ACHIEVEMENT}
                            details={achievement}
                            />)
                        }   
                        
                </div>
            </div>
            <div className='saveResume'>
                <div className='icon-container icon-for-resume' onClick={()=>saveResumeToDatabase()}>
                    {
                        save?<Spinner color='white'/>:<FontAwesomeIcon icon={faCloud} color={'white'} size={'lg'}/>
                    }
                </div>
                <div className='icon-container icon-for-resume'>
                    <FontAwesomeIcon icon={faDownload} color={'white'} size={'lg'}/>
                </div>
            </div>
        </div>
       
    )
}
export default Resume;