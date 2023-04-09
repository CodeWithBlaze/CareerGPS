import React, { useEffect, useState } from 'react';
import Form from './Form';
import { getAllGoalsBySemesterId, getCategories, getSemestersByCode, getTaskByGoal, updateTaskRank } from '../../backend/api';
import '../../css/admin/arrange_task.css';
import Button from '../Button';
import { errorToast, successToast } from '../Toast';

function ArrangeTask(props) {
    //list
    const [categories,setCategories] = useState([])
    const [semesters,setSemesters] = useState([])
    const [goals,setGoals] = useState([])
    const [tasks,setTasks] = useState([])
    //seelctions
    const [selectedCategory,setSelectedCategory] = useState('')
    const [selectedSemester,setSelectedSemester] = useState('')
    const [selectedGoal,setSelectedGoal] = useState('')
    const [placeTask,setPlaceTask] = useState('');
    const [afterTask,setAfterTask] = useState('');
    //loading
    const [loading,setLoading] = useState(false);
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
    function updateTaskSequence(){
        setLoading(true);
        updateTaskRank(placeTask,afterTask)
        .then(()=>successToast('Task Sequence Updated. Refresh to see the changes'))
        .catch((err)=>errorToast('Task sequence change Failed'))
        .finally(()=>setLoading(false))
    }
    return (
        <div className='admin-category'>
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
            </Form>
            <Form>
            <p className='select-labels'>Place task</p>
                <select className='text-based-input-select admin-select'value={placeTask} onChange={(e)=>setPlaceTask(e.target.value)}>
                    <option value={''}>Choose a Task</option>
                    {
                        tasks.map(task=><option key={task._id} value={task._id}>{task.task_name}</option>)
                    }
                </select>
                <p className='select-labels'>After</p>
                <select className='text-based-input-select admin-select' value={afterTask} onChange={(e)=>setAfterTask(e.target.value)}>
                    <option value={''} >Choose a Task</option>
                    <option value={'START'} >START</option>
                    {
                        tasks.map(task=><option key={task._id} value={task._id}>{task.task_name}</option>)
                    }
                </select>
                <Button
                    title='Update this Task'
                    customClass={'flatButton'}
                    onClick={updateTaskSequence}
                    loading={loading}
                />
            </Form>
        </div>
    );
}

export default ArrangeTask;