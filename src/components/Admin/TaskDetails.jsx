import React, { useEffect, useState } from 'react';
import '../../css/admin/taskdetails.css';
import CustomHTML from '../CustomHTML';
import FileUploadButton from '../FileUploadButton';

import Form from './Form';
function TaskDetails(props) {
    const [taskFile,setTaskFile] = useState(null);
    const [content,setContent] = useState('');
    
    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          const text = (e.target.result)
          setContent(text)
        };
        reader.readAsText(e.target.files[0])
    }
    
    return (
        <div className='task-details-container'>
            {content && <div className='custom-html-container-settings'>
                <CustomHTML 
                    content={`
                    <div id="custom_html">
                    ${content}
                    </div>
                    `} 
                    taskContent={content}
                    showCompleteButton={false}
                    />
            </div>}
            
            <Form>
                <input 
                id='task-details-input' 
                type={'file'} 
                className='profile-photo-label'
                onChange={(event) => {
                    setTaskFile(event.target.files[0])
                    showFile(event);
                }}
                />
                <div>
                    {taskFile && taskFile.name && <label>{taskFile.name}</label>}
                </div>
                <FileUploadButton
                for_id={'task-details-input'}
                title={'Choose a file'}
                customClass={'flatButton'}
                customStyle={{width:250}}
                />
                
            </Form>
        </div>
    );
}

export default TaskDetails;