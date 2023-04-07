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

function SubTask({task,setTask,currentTask,activeTask}) {
    const [category,setCategory] = useState(taskCategory.LOCKED);
    function setTaskCategory(){
        const first_active_task = activeTask[0]
        const last_active_task = activeTask[activeTask.length - 1]
        
        // if main_goal_id is less it is complete
        if(task.main_goal_id < first_active_task.main_goal_id)
            setCategory(taskCategory.COMPLETE);
        // if main_goal_id is more it is locked
        else if(task.main_goal_id > last_active_task.main_goal_id)
            setCategory(taskCategory.LOCKED);
        // if main_goal_id is equal then compare rank
        else{
            // if rank is less or equal then complete
            if(task.rank < first_active_task.rank)
                setCategory(taskCategory.COMPLETE);
            // if rank is more then locked
            else if(task.rank > last_active_task.rank)
                setCategory(taskCategory.LOCKED);
            else
                setCategory(taskCategory.ACTIVE);
        }
}
    useEffect(()=>{
        setTaskCategory()
    },[activeTask])
    return (
        <div className={`task ${task._id === currentTask?'active-task':''}`} onClick={()=>setTask(task._id)}>
            <div className='task-and-icon'>
                <FontAwesomeIcon icon={category.icon} color={category.color} size={'xl'}/>
                <div>
                    <h4>{task.task_name}</h4>
                    <h6>Date : 24th Oct 2022</h6>
                </div>
            </div>
        </div>
    );
}

export default SubTask;