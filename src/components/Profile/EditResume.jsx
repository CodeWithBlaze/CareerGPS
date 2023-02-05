import React, { useState } from 'react';
import { PLACEHOLDER_TEXT } from '../../config/constant';
import '../../css/edit_resume.css';
import Button from '../Button';
import Input from '../Input';
const OPTIONS = [
    {name:'Experiences',value:'experience'},
    {name:'Projects',value:'project'},
    {name:'Educations',value:'education'},
    {name:'Skills',value:'skill'},
    {name:'Achievements',value:'achievement'},
]

function EditResume({
    basicDetails,setBasicDetails,
    experiences,setExperiences,
    educations,setEducations,
    projects,setProjects, 
    skills,setSkills, 
    achievements,setAchievements 
}) {
    const [selected,setSelected] = useState(OPTIONS[0].value)
    const [resumeDetails,setResumeDetails] = useState({
        type:selected,
        name:'',
        small_desc:'',
        address:'',
        email:'',
        company:'',
        role:'',
        location:'',
        date:'',
        description:''
    })
    function updateBasicDetails(){
        setBasicDetails({name:resumeDetails.name,small_desc:resumeDetails.small_desc,address:resumeDetails.address,email:resumeDetails.email})
    }
    function addTypeToArray(){
        if(resumeDetails.type === 'experience'){
            const new_experience = {
            _id:experiences.length + 1,
            company:resumeDetails.company,
            role:resumeDetails.role,
            location:resumeDetails.location,
            date:resumeDetails.date,
            description:resumeDetails.description
            }
            setExperiences([...experiences,new_experience])
        }
        else if(resumeDetails.type === 'project'){
            const new_project = {
                _id:projects.length + 1,
                company:resumeDetails.company,
                role:resumeDetails.role,
                description:resumeDetails.description
            }
            setProjects([...projects,new_project])
        }
        else if(resumeDetails.type === 'education'){
            const new_education = {
                _id:educations.length + 1,
                company:resumeDetails.company,
                role:resumeDetails.role,
                location:resumeDetails.location,
                date:resumeDetails.date,
                description:resumeDetails.description
            }
            setEducations([...educations,new_education])
        }
        else if(resumeDetails.type === 'skill'){
            const new_skill = {
                _id:skills.length + 1,
                company:resumeDetails.company,
            }
            setSkills([...skills,new_skill])
        }
        else if(resumeDetails.type === 'achievement'){
            const new_achievement = {
                _id:achievements.length + 1,
                company:resumeDetails.company,
                role:resumeDetails.role,
                location:resumeDetails.location,
                date:resumeDetails.date,
                description:resumeDetails.description
            }
            setAchievements([...achievements,new_achievement])
        }
    }
    return (
        <div style={{width:'30%'}}>
            <div className='edit-resume-container'>
                <Input
                        placeholder={`Enter your Name`}
                        customClass={'full-width'}
                        value={resumeDetails.name}
                        onChange={(e)=>setResumeDetails({...resumeDetails,name:e.target.value})}
                />
                <Input
                        placeholder={`Enter your Email`}
                        customClass={'full-width'}
                        value={resumeDetails.email}
                        onChange={(e)=>setResumeDetails({...resumeDetails,email:e.target.value})}
                />
                <Input
                        placeholder={`Enter your small description`}
                        customClass={'full-width'}
                        value={resumeDetails.small_desc}
                        onChange={(e)=>setResumeDetails({...resumeDetails,small_desc:e.target.value})}
                />
                <Input
                        placeholder={`Enter your address`}
                        customClass={'full-width'}
                        value={resumeDetails.address}
                        onChange={(e)=>setResumeDetails({...resumeDetails,address:e.target.value})}
                />
                <Button
                title={`Update Details`}
                customClass={'flatButton'}
                onClick={()=>updateBasicDetails()}
                />
            </div>
            <div className='edit-resume-container'>
                <select className='text-based-input-select dropdown' 
                value={selected} 
                onChange={(e)=>{
                    setSelected(e.target.value)
                    setResumeDetails({...resumeDetails,
                    type:e.target.value,
                    company:'',
                    role:'',
                    location:'',
                    date:'',
                    description:''})
                }}>
                    {
                        OPTIONS.map(item=><option key={item.value} value={item.value}>{item.name}</option>)
                    }
                            
                </select>
                
                <Input
                        placeholder={`Enter your ${PLACEHOLDER_TEXT[selected].company}`}
                        customClass={'full-width'}
                        value={resumeDetails.company}
                        onChange={(e)=>setResumeDetails({...resumeDetails,company:e.target.value})}
                />
                {(selected === 'experience' || selected === 'project' || selected === 'education' )
                &&<Input
                        placeholder={`Enter your ${PLACEHOLDER_TEXT[selected].role}`}
                        customClass={'full-width'}
                        value={resumeDetails.role}
                        onChange={(e)=>setResumeDetails({...resumeDetails,role:e.target.value})}
                />}
                {(selected === 'experience' || selected === 'education' )
                    &&<Input
                        placeholder={'Enter your Location'}
                        customClass={'full-width'}
                        value={resumeDetails.location}
                        onChange={(e)=>setResumeDetails({...resumeDetails,location:e.target.value})}
                />}
                {(selected === 'experience' || selected === 'education' )
                &&<Input
                        placeholder={'Enter your Date'}
                        type={'date'}
                        customClass={'full-width'}
                        value={resumeDetails.date}
                        onChange={(e)=>setResumeDetails({...resumeDetails,date:e.target.value})}
                />}
                {(selected !== 'skill')
                &&<Input
                        placeholder={'Enter your description'}
                        customClass={'full-width'}
                        value={resumeDetails.description}
                        onChange={(e)=>setResumeDetails({...resumeDetails,description:e.target.value})}
                />}
                <Button
                title={`Add ${selected}`}
                customClass={'flatButton'}
                onClick={()=>addTypeToArray()}
                />
            </div>
        </div>
    );
}

export default EditResume;