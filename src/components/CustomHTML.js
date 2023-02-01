import React, { useState } from 'react';
import { Interweave } from 'interweave';
import Button from './Button';
import '../css/custom_html.css';
import { markTaskAsComplete } from '../backend/api';

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
    return (
        <>
        <div className='task-details'>
            <Interweave content={content}/>
        </div>
        <div className='task-details-mark-complete-btn'>
            <Button title='Mark as complete' onClick={()=>completeTask()} loading={loading}/>
        </div>
        </>
    );
}

export default CustomHTML;