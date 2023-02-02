import React, { useLayoutEffect, useState } from 'react';
import { ALLOWED_TAG_LIST, Interweave } from 'interweave';
import Button from './Button';
import '../css/custom_html.css';
import { markTaskAsComplete } from '../backend/api';
import { styles_css } from '../config/constant';

function CustomHTML({content,task_id,setCelebrate,setActiveTask}) {
    const [loading,setLoading] = useState(false)
    function completeTask(){
        setLoading(true)
        markTaskAsComplete(task_id)
        .then(res=>{
            setCelebrate(true);
            setActiveTask(res);
        })
        .catch(err=>console.log(err))
        .finally(()=>{
            setLoading(false)
        })
    }
    useLayoutEffect(()=>{
        const doc = document.getElementById('custom_html') 
        doc.innerHTML = `<style>${styles_css}</style>` + doc.innerHTML 
        
    },[])
    return (
        <>
        <div className='task-details'>
            <Interweave content={content} allowList={[...ALLOWED_TAG_LIST,'link','style','iframe']}/>
        </div>
        <div className='task-details-mark-complete-btn'>
            <Button title='Mark as complete' onClick={()=>completeTask()} loading={loading}/>
        </div>
        </>
    );
}

export default CustomHTML;