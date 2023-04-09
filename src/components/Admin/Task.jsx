import React, { useEffect, useState } from 'react';
import { getCategories,getSemestersByCode,getAllGoalsBySemesterId, addTaskToDatabase, getTaskBySemesterAndGoal, updateTaskInDatabase, removeTaskFromDatabase } from '../../backend/api';
import { findAndRemove, findAndReplace } from '../../helpers';
import Button from '../Button';
import Input from '../Input';
import EditOrDelete from './EditOrDelete';
import Form from './Form';
import { errorToast, successToast } from '../Toast';

function Task(props) {
    const [task,setTask] = useState({title:'',category_id:'',semester_id:'',main_goal_id:''})
    const [taskList,setTaskList] = useState([])
    //exisiting tasks
    const [oldTasks,setOldTasks] = useState([])
    //list
    const [categories,setCategories] = useState([])
    const [semesters,setSemesters] = useState([])
    const [goals,setGoals] = useState([])
    //seelctions
    const [selectedCategory,setSelectedCategory] = useState('')
    const [selectedSemester,setSelectedSemester] = useState('')
    const [selectedGoal,setSelectedGoal] = useState('')
    // updates
    const [update,setUpdate] = useState(null)
    const [updateLoading,setUpdateLoading] = useState(null)
    
    useEffect(()=>{
        getCategories()
        .then(res=>setCategories([...res]))
        .catch(err=>errorToast('Error while fetching Categories'))
    },[])
    useEffect(()=>{
        if(selectedCategory)
            getSemestersByCode(selectedCategory,true)
            .then(res=>setSemesters([...res.semesters]))
            .catch(err=>errorToast('Error while fetching Semester'))
    },[selectedCategory])
    useEffect(()=>{
        if(selectedSemester)
            getAllGoalsBySemesterId(selectedSemester)
            .then(res=>setGoals([...res]))
            .catch(err=>errorToast('Error while fetching Goals'))
    },[selectedSemester])
    function addTask(){
        setTaskList([...taskList,
            {
            title:task.title,
            id:taskList.length,
            category_id:selectedCategory,
            semester_id:selectedSemester,
            main_goal_id:selectedGoal
        }])
    }
    function setTaskForUpdate(task){
        setTask(task);
        setUpdate(task)
        setSelectedCategory(task.category_id)
        setSelectedSemester(task.semester_id)
        setSelectedGoal(task.main_goal_id)
    }
    async function updateTask(){
        if(update.id === 0 || update.id){
            const updated_task_list = [...taskList]
            updated_task_list[update.id] = {
                title:task.title,
                id:update.id,
                category_id:selectedCategory,
                semester_id:selectedSemester,
                main_goal_id:selectedGoal};
            setTaskList([...updated_task_list])
            
        }
        else if(update._id){
            try {
                setUpdateLoading(true);
                const result = await updateTaskInDatabase(update._id,{
                    category_id:selectedCategory,
                    semester_id:selectedSemester,
                    main_goal_id:selectedGoal,
                    title:task.title
                })
                const updated_list = findAndReplace('_id',update._id,result,oldTasks)
                setOldTasks([...updated_list])
                successToast('Task updated')
            } catch (error) {
                errorToast('Task Updated Failed')
            }
            finally{
                setUpdateLoading(false)
            }
            
        }
        setUpdate(null);
    }
    async function deleteTask(task){
        if(task.id === 0 || task.id){
            const updated_task_list = taskList.filter(t=>t.id !== task.id)
            setTaskList([...updated_task_list])
        }
        else if(task._id){
            try {
                await removeTaskFromDatabase(task._id)
                const updated_list = findAndRemove('_id',task._id,oldTasks)
                setOldTasks([...updated_list])
                successToast('Task Deleted') 
            } catch (error) {
                errorToast('Error while deleting Task')
            }
            
        }
        else{
            console.log("Nothing Selected")
        }
    }
    async function submitTask(){
        try {
            const updated_result = await addTaskToDatabase(taskList)
            setOldTasks([...oldTasks,...updated_result])
            setTaskList([])
            successToast('Task Added') 
        } catch (error) {
            errorToast('Error while Adding Task')
        }
        
    }
    function cancelTask(){
        setUpdate(null);
        setTask({title:'',category_id:'',semester_id:'',main_goal_id:''})
    }
    useEffect(()=>{
        if(selectedSemester && selectedGoal)
        getTaskBySemesterAndGoal(selectedSemester,selectedGoal)
        .then(res=>setOldTasks([...res]))
        .catch(err=>errorToast('Error while fetching Task'))
    },[selectedSemester,selectedGoal])
    return (
        <div className='admin-category'>
            <Form>
                <div className='admin-item-container'>
                    {
                        oldTasks.map(task=>
                        <EditOrDelete content={task.task_name}
                        key={task._id}
                        onEdit={()=>setTaskForUpdate(task)}
                        onDelete={()=>deleteTask(task)}
                        />)
                    }
                </div>
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
                
                <Input
                placeholder={"Enter task title"}
                customClass={'full-width'}
                value={task.title || task.task_name}
                onChange={(e)=>setTask({title:e.target.value})}
                />
                {
                    update?
                    <>
                    <Button
                    title='Update this Task'
                    customClass={'flatButton'}
                    onClick={updateTask}
                    loading={updateLoading}
                    />
                    <Button
                    title='Cancel'
                    customClass={'flatButton'}
                    onClick={cancelTask}
                    />
                    </>
                    :
                    <Button
                    title='Add this task'
                    customClass={'flatButton'}
                    onClick={addTask}
                    />
                    
                }
                
            </Form>
            <Form>
                <div className='admin-item-container'>
                    {taskList.map(task=>
                    <EditOrDelete 
                    key={task.id} 
                    content={task.title} 
                    onEdit={()=>setTaskForUpdate(task)}
                    onDelete={()=>deleteTask(task)}
                    />)}
                </div>
                <Button
                title='Submit'
                customClass={'flatButton'}
                onClick={submitTask}
                />
            </Form>
        </div>
    );
}

export default Task;