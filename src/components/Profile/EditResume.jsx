import React, { useEffect, useState } from 'react';
import { PLACEHOLDER_TEXT, RESUME_CATEGORY } from '../../config/constant';
import '../../css/edit_resume.css';
import Button from '../Button';
import Input from '../Input';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { containsEmptyValues, isEmailValid } from '../../helpers';
import { errorToast } from '../Toast';
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
    achievements,setAchievements,
    updateData,setUpdateData 
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
    function setFormToInitialState(){
        setSelected(OPTIONS[0].value)
        setResumeDetails({
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
    }
    function setForUpdate(){
        setSelected(updateData.type)
        const update_properties = {}
        Object.keys(resumeDetails).forEach(key=>{
            if(updateData[key])
                update_properties[key] = updateData[key]
        })
        setResumeDetails({...resumeDetails,...update_properties})
    }
    function getCategory(){
        let category = null;
        let setCategory = null;

        if(resumeDetails.type === RESUME_CATEGORY.EXPERIENCE){
            category = experiences;
            setCategory=setExperiences
        }
        else if(resumeDetails.type === RESUME_CATEGORY.EDUCATION){
            category = educations;
            setCategory=setEducations
        }
        else if(resumeDetails.type === RESUME_CATEGORY.ACHIEVEMENT){
            category = achievements;
            setCategory=setAchievements
        }
        else if(resumeDetails.type === RESUME_CATEGORY.EXPERIENCE){
            category = experiences;
            setCategory=setExperiences
        }
        else if(resumeDetails.type === RESUME_CATEGORY.PROJECT){
            category = projects;
            setCategory=setProjects
        }
        else if(resumeDetails.type === RESUME_CATEGORY.SKILL){
            category = skills;
            setCategory=setSkills
        }
        return {category,setCategory}
    }
    function updateItemInResume(){
        const {category,setCategory} = getCategory()
        const index = category.findIndex(item=>item._id === updateData._id)
        if(index === -1){
            alert("Soemthing went wrong")
            return;
        }
        const updated_category = [...category]
        const update_properties = {}
        Object.keys(resumeDetails).forEach(key=>{
            if(resumeDetails[key])
                update_properties[key] = resumeDetails[key] 
        })
        
        updated_category[index] = {_id:index+1,...update_properties}
        console.log(updated_category)
        setCategory([...updated_category])
        setUpdateData(null);
        setFormToInitialState()
    }
    function deleteItemFromResume(){
        const {category,setCategory} = getCategory();
        const updated_category = category.filter(item=>item._id !== updateData._id)
        setCategory([...updated_category])
        setUpdateData(null)
        setFormToInitialState()
    }
    useEffect(()=>{
        if(updateData)
            setForUpdate()
    },[updateData])
    function updateBasicDetails(){
        if(!containsEmptyValues([resumeDetails.name,resumeDetails.small_desc,resumeDetails.address,resumeDetails.email]))
            setBasicDetails({name:resumeDetails.name,small_desc:resumeDetails.small_desc,address:resumeDetails.address,email:resumeDetails.email})
        else if(!isEmailValid(resumeDetails.email))
            errorToast('Not a valid Email')
        else
            errorToast('All fields are required')
    }
    function addTypeToArray(){
        if(resumeDetails.type === 'experience'){
            if(containsEmptyValues([resumeDetails.company,resumeDetails.role,resumeDetails.date])){
                errorToast('Company Name, Role and Date are mandatory fields')
                return;
            }
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
            if(containsEmptyValues([resumeDetails.company,resumeDetails.role])){
                errorToast('Project Name, Stack are mandatory fields')
                return;
            }
            const new_project = {
                _id:projects.length + 1,
                company:resumeDetails.company,
                role:resumeDetails.role,
                description:resumeDetails.description
            }
            setProjects([...projects,new_project])
        }
        else if(resumeDetails.type === 'education'){
            if(containsEmptyValues([resumeDetails.company,resumeDetails.role,resumeDetails.date])){
                errorToast('College Name or School Name,Degree,Date are mandatory fields')
                return;
            }
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
            if(containsEmptyValues([resumeDetails.company])){
                errorToast('Skill cannot be empty')
                return;
            }
            const new_skill = {
                _id:skills.length + 1,
                company:resumeDetails.company,
            }
            setSkills([...skills,new_skill])
        }
        else if(resumeDetails.type === 'achievement'){
            if(containsEmptyValues([resumeDetails.company])){
                errorToast('Project Name, Stack are mandatory fields')
                return;
            }
            const new_achievement = {
                _id:achievements.length + 1,
                company:resumeDetails.company,
                description:resumeDetails.description
            }
            setAchievements([...achievements,new_achievement])
        }
    }
    return (
        <div style={{width:'30%'}}>
            <div className='resume-warning'>
                <p>Please remember to save the resume after making changes by clicking 
                    <FontAwesomeIcon icon={faCloud} color={'#9F1D35'} size={'sm'} style={{marginLeft:5}}/> button
                </p>
            </div>
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
                {
                    !updateData?
                    <Button
                        title={`Add ${selected}`}
                        customClass={'flatButton'}
                        onClick={()=>addTypeToArray()}
                    />
                    :
                    <div>
                        <Button
                        title={`Update ${selected}`}
                        customClass={'flatButton'}
                        onClick={()=>updateItemInResume()}
                        />
                        <Button
                        title={`Remove ${selected}`}
                        customStyle={{backgroundColor:'red'}}
                        customClass={'flatButton'}
                        onClick={()=>deleteItemFromResume()}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default EditResume;