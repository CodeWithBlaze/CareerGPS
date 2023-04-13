import React, { useEffect, useState } from 'react';
import { getAllGoalsBySemesterId, getCategories, getSemestersByCode, getTaskByGoal, postTaskDetails } from '../../backend/api';
import '../../css/admin/taskdetails.css';
import Button from '../Button';
import CustomHTML from '../CustomHTML';
import FileUploadButton from '../FileUploadButton';

import Form from './Form';
import { errorToast } from '../Toast';
function TaskDetails(props) {
    const [taskFile,setTaskFile] = useState(null);
    const [content,setContent] = useState('');

    //list
    const [categories,setCategories] = useState([])
    const [semesters,setSemesters] = useState([])
    const [goals,setGoals] = useState([])
    const [tasks,setTasks] = useState([])
    //seelctions
    const [selectedCategory,setSelectedCategory] = useState('')
    const [selectedSemester,setSelectedSemester] = useState('')
    const [selectedGoal,setSelectedGoal] = useState('')
    const [selectedTask,setSelectedTask] = useState('')
    //loading
    const [loading,setLoading] = useState(false)

    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
          if(e.target && e.target.result){
            const text = (e.target.result)
            setContent(text)
          }
          
        };
        if(e.target && e.target.files.length > 0)
            reader.readAsText(e.target.files[0])
    }
    useEffect(()=>{
        getCategories()
        .then(res=>setCategories([...res]))
        .catch(err=>errorToast('Error while fetching Categories'))
    },[])
    
    useEffect(()=>{
        if(selectedCategory)
            getSemestersByCode(selectedCategory,true)
            .then(res=>setSemesters([...res.semesters]))
            .catch(err=>errorToast('Error while fetching Semesters'))
    },[selectedCategory])
    useEffect(()=>{
        if(selectedSemester)
            getAllGoalsBySemesterId(selectedSemester)
            .then(res=>setGoals([...res]))
            .catch(err=>errorToast('Error while fetching Goals'))
    },[selectedSemester])
    useEffect(()=>{
        if(selectedGoal)
            getTaskByGoal(selectedGoal)
            .then(res=>setTasks([...res]))
            .catch(err=>errorToast('Error while fetching Tasks'))
    },[selectedGoal])


    function onSubmit(){
        setLoading(true);
        postTaskDetails(selectedCategory,selectedSemester,selectedGoal,content,selectedTask)
        .then(res=>alert("Task Details Added"))
        .catch(err=>errorToast('Error while uplaoding'))
        .finally(()=>setLoading(false))
    }

    return (
        <div className='task-details-container'>
            {content 
            && 
            <div className='custom-html-container-settings'>
                <CustomHTML 
                    content={`
                    <div id="custom_html">
                    ${content}
                    </div>
                    `} 
                    taskContent={content}
                    showCompleteButton={false}
                    />
            </div>
            }
            <div>
            <Form>
                <input 
                id='task-details-input' 
                type={'file'} 
                className='profile-photo-label'
                onChange={(event) => {
                    if(event.target && event.target.files.length > 0){
                        setContent('')
                        setTaskFile(event.target.files[0])
                        showFile(event);
                    }
                }}
                />
                <div>
                    {taskFile && taskFile.name && <label>{taskFile.name}</label>}
                </div>
                <FileUploadButton
                for_id={'task-details-input'}
                title={'Choose a file'}
                customClass={'flatButton'}
                />
                
            </Form>
            <Form>
                <select className='text-based-input-select admin-select' value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}>
                    <option>Choose a Course</option>
                    {
                        categories.map(item=><option key={item._id} value={item._id}>{item.course_stream}</option>)
                    }
                </select>
                
                <select className='text-based-input-select admin-select' value={selectedSemester} onChange={(e)=>setSelectedSemester(e.target.value)}>
                    <option>Choose a Semester</option>
                    {
                        semesters.map(sem=><option  key={sem._id} value={sem._id}>{sem.name}</option>)
                    }
                </select>
                <select className='text-based-input-select admin-select' value={selectedGoal} onChange={(e)=>setSelectedGoal(e.target.value)}>
                    <option>Choose a Goal</option>
                    {
                        goals.map(goal=><option key={goal._id} value={goal._id}>{goal.title}</option>)
                    }
                </select>
                <select className='text-based-input-select admin-select' value={selectedTask} onChange={(e)=>setSelectedTask(e.target.value)}>
                    <option>Choose a Task</option>
                    {
                        tasks.map(task=><option key={task._id} value={task._id}>{task.task_name}</option>)
                    }
                </select>
                <Button
                title='Submit'
                customClass={'flatButton'}
                onClick={onSubmit}
                />
            </Form>
            </div>
        </div>
    );
}

export default TaskDetails;