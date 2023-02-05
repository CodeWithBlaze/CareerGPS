import { useContext } from 'react';
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
    basicDetails
}){
    const {user} = useContext(UserContext)
    return (
        <div className="resume-container">
            <div className='resume-left-content'>
                <h1>{basicDetails.name || profile.full_name || 'Your Name'}</h1>
                <label>{basicDetails.small_desc || 'your small description'}</label>
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
                <address>
                        {basicDetails.address || <label>123 Your StreetYour City, ST 12345(123) 456-7890</label>}
                </address>
                <p className='resume-email'>{ basicDetails.email || user.email || 'no_reply@example.com'}</p>
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
        </div>
    )
}
export default Resume;