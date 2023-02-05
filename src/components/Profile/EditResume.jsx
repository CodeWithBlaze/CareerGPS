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

function EditResume(props) {
    const [selected,setSelected] = useState(OPTIONS[0].value)
    return (
        <div style={{width:'30%'}}>
            <div className='edit-resume-container'>
                <Input
                        placeholder={`Enter your Name`}
                        customClass={'full-width'}
                />
                <Input
                        placeholder={`Enter your small description`}
                        customClass={'full-width'}
                />
                <Input
                        placeholder={`Enter your address`}
                        customClass={'full-width'}
                />
                <Input
                        placeholder={`Enter your email`}
                        customClass={'full-width'}
                />
            </div>
            <div className='edit-resume-container'>
                <select className='text-based-input-select dropdown' 
                value={selected} 
                onChange={(e)=>setSelected(e.target.value)}>
                    {
                        OPTIONS.map(item=><option value={item.value}>{item.name}</option>)
                    }
                            
                </select>
                
                <Input
                        placeholder={`Enter your ${PLACEHOLDER_TEXT[selected].company}`}
                        customClass={'full-width'}
                />
                {(selected === 'experience' || selected === 'project' || selected === 'education' )
                &&<Input
                        placeholder={`Enter your ${PLACEHOLDER_TEXT[selected].role}`}
                        customClass={'full-width'}
                />}
                {(selected === 'experience' || selected === 'education' )
                    &&<Input
                        placeholder={'Enter your Location'}
                        customClass={'full-width'}
                />}
                {(selected === 'experience' || selected === 'education' )
                &&<Input
                        placeholder={'Enter your Date'}
                        type={'date'}
                        customClass={'full-width'}
                />}
                {(selected !== 'skill')
                &&<Input
                        placeholder={'Enter your description'}
                        customClass={'full-width'}
                />}
                <Button
                title={`Add ${selected}`}
                customClass={'flatButton'}
                />
            </div>
        </div>
    );
}

export default EditResume;