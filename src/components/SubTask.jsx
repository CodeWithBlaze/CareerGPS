import React, { useEffect, useState } from 'react';
import {faCircleCheck as checkFilled} from '@fortawesome/free-solid-svg-icons'
import {faLock} from '@fortawesome/free-solid-svg-icons'
import {faCircleCheck as checkOutline} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const taskCategory = {
    COMPLETE:{color:'#3CB043',icon:checkFilled},
    ACTIVE:{color:'#6C63FF',icon:checkOutline},
    LOCKED:{color:'#0b0094',icon:faLock}
}

function SubTask({task_id,task_title,task_rank,setTask,currentTask,activeTask}) {
    const [category,setCategory] = useState(taskCategory.LOCKED);
    function setTaskCategory(){
        const first_active_task = activeTask[0]
        const last_active_task = activeTask[activeTask.length - 1]
        if(task_rank < first_active_task.rank)
            setCategory(taskCategory.COMPLETE);
        else if(task_rank > last_active_task.rank)
            setCategory(taskCategory.LOCKED)
        else
            setCategory(taskCategory.ACTIVE)
    }
    useEffect(()=>{
        setTaskCategory()
    },[activeTask])
    return (
        <div className={`task ${task_id === currentTask?'active-task':''}`} onClick={()=>setTask(task_id)}>
            <div className='task-and-icon'>
                <FontAwesomeIcon icon={category.icon} color={category.color} size={'xl'}/>
                <div>
                    <h4>{task_title}</h4>
                    <h6>Date : 24th Oct 2022</h6>
                </div>
            </div>
        </div>
    );
}

export default SubTask;