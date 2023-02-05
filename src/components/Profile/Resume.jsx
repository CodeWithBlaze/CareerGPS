import { RESUME_CATEGORY } from '../../config/constant';
import '../../css/resume.css';
import ResumeCategory from '../ResumeCategory';
import ResumeHeadingText from '../ResumeHeadingText';
function Resume(){
    return (
        <div className="resume-container">
            <div className='resume-left-content'>
                <h1>Your Name</h1>
                <label>Your small description</label>
                <div className='resume-category-container'>
                    <ResumeHeadingText text={'EXPERIENCE'}/>
                        <ResumeCategory type={RESUME_CATEGORY.EXPERIENCE}/>
                        <ResumeCategory type={RESUME_CATEGORY.EXPERIENCE}/>
                        <ResumeCategory type={RESUME_CATEGORY.EXPERIENCE}/>
                    <ResumeHeadingText text={'EDUCATION'}/>
                        <ResumeCategory type={RESUME_CATEGORY.EDUCATION}/>
                        <ResumeCategory type={RESUME_CATEGORY.EDUCATION}/>
                        <ResumeCategory type={RESUME_CATEGORY.EDUCATION}/>
                    
                    
                </div>
            </div>
            <div className='resume-right-content'>
                <address>
                        123 Your Street
                        Your City, ST 12345
                        (123) 456-7890
                </address>
                <p className='resume-email'>no_reply@example.com</p>
                <div className='resume-category-container-right'>
                        <ResumeHeadingText text={'PROJECTS'}/>
                            <ResumeCategory type={RESUME_CATEGORY.PROJECT}/>
                            <ResumeCategory type={RESUME_CATEGORY.PROJECT}/>
                            <ResumeCategory type={RESUME_CATEGORY.PROJECT}/>
                        
                        <ResumeHeadingText text={'SKILLS'}/>
                            <ResumeCategory type={RESUME_CATEGORY.SKILL}/>
                            <ResumeCategory type={RESUME_CATEGORY.SKILL}/>
                            <ResumeCategory type={RESUME_CATEGORY.SKILL}/>
                        <ResumeHeadingText text={'ACHIEVEMENTS'}/>
                            <ResumeCategory type={RESUME_CATEGORY.ACHIEVEMENT}/>
                            <ResumeCategory type={RESUME_CATEGORY.ACHIEVEMENT}/>
                            <ResumeCategory type={RESUME_CATEGORY.ACHIEVEMENT}/>
                        
                </div>
            </div>
        </div>
    )
}
export default Resume;