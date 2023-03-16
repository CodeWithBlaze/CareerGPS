import { useContext} from 'react';
import { RESUME_CATEGORY } from '../../config/constant';
import UserContext from '../../context/UserContext';
import '../../css/resume.css';
import ResumeCategory from '../ResumeCategory';

import ResumeHeadingText from '../ResumeHeadingText';




function Resume({
    profile,
    experiences,
    educations, 
    projects, 
    skills, 
    achievements,
    basicDetails,
    setUpdateData
}){
    
    const {user} = useContext(UserContext)
    
    return (
       <div className="resume-container" id='resume-container'>
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
                            onClick={()=>setUpdateData({type:RESUME_CATEGORY.EXPERIENCE,...experience})}
                            />)
                        }
                        
                    <ResumeHeadingText text={'EDUCATION'}/>
                        {
                            educations.map(education=>
                            <ResumeCategory key={education._id} 
                            type={RESUME_CATEGORY.EDUCATION}
                            details={education}
                            onClick={()=>setUpdateData({type:RESUME_CATEGORY.EDUCATION,...education})}
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
                            onClick={()=>setUpdateData({type:RESUME_CATEGORY.PROJECT,...project})}
                            />)
                        }
                        
                        <ResumeHeadingText text={'SKILLS'}/>
                        {
                            skills.map(skill=>
                            <ResumeCategory key={skill._id} 
                            type={RESUME_CATEGORY.SKILL}
                            details={skill}
                            onClick={()=>setUpdateData({type:RESUME_CATEGORY.SKILL,...skill})}
                            />)
                        }
                        <ResumeHeadingText text={'ACHIEVEMENTS'}/>
                        {
                            achievements.map(achievement=>
                            <ResumeCategory key={achievement._id} 
                            type={RESUME_CATEGORY.ACHIEVEMENT}
                            details={achievement}
                            onClick={()=>setUpdateData({type:RESUME_CATEGORY.ACHIEVEMENT,...achievement})}
                            />)
                        }   
                        
                </div>
            </div>
            
            
            
        </div>
       
    )
}
export default Resume;