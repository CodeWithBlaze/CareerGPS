import React, { useEffect, useState } from 'react';
import { getTaskBySemesterAndGoal } from '../backend/api';
import '../css/taskcategory.css';
import SubTask from './SubTask';

function TaskCategory({heading,subheading,goal_id,semester_id,setTask,currentTask,activeTask}) {
    const [visible,setVisible] = useState(false)
    const [data,setData] = useState([])
    function onVisible(){
        if(data.length === 0){
            console.log("Request send")
            getTaskBySemesterAndGoal(semester_id,goal_id)
            .then(data=>{
                setData(data)
            })
            .catch(err=>console.log(err))
        }
        setVisible(!visible)
    }
    return (
        <>
        <div className='task-category' onClick={()=>onVisible()}>
            <h4>{subheading}</h4>
            <h3>{heading}</h3>
        </div>
        {
            visible && data.map(task=>
            <SubTask key={task._id} 
            task_id={task._id} 
            task_title={task.task_name} 
            setTask={setTask} 
            currentTask={currentTask} 
            activeTask={activeTask} 
            task_rank={task.rank}
            />)
        }
        </>
    );
}

export default TaskCategory;