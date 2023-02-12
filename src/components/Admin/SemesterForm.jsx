import React, { useState } from 'react';
import '../../css/admin/category.css'
import Button from '../Button';
import Input from '../Input';
import EditOrDelete from './EditOrDelete';
import Form from './Form';

function SemesterForm(props) {
    const [semester,setSemester] = useState('')
    const [goal,setGoal] = useState('')
    const [goalsList,setGoalsList] = useState([])
    const [task,setTask] = useState('')
    const [taskList,setTaskList] = useState([])
    function addGoal(){
        setGoalsList([...goalsList,goal])
    }
    function submitGoal(){
        console.log(goalsList)
    }
    function addTask(){
        setTaskList([...taskList,task])
    }
    function submitTask(){
        console.log(taskList)
    }
    return (
        <div className='admin-category'>
            <Form>
                <select className='text-based-input-select admin-select'>
                    <option>Choose a Course</option>
                    <option>BTECHCSE</option>
                </select>
                <div className='admin-item-container'>
                    <EditOrDelete/>
                </div>
                <Input
                placeholder={"Enter a semester name"}
                customClass={'full-width'}
                value={semester}
                onChange={(e)=>setSemester(e.target.value)}
                />
                <Button
                title='Add Semester'
                customClass={'flatButton'}
                />
            </Form>
            <Form>
                <select className='text-based-input-select admin-select'>
                    <option>Choose a Semester</option>
                    <option>Semester 1</option>
                </select>
                <div className='admin-item-container'>
                    <EditOrDelete/>
                </div>
                <Input
                placeholder={"Enter a Goal name"}
                customClass={'full-width'}
                value={goal}
                onChange={(e)=>setGoal(e.target.value)}
                />
                <div className='admin-item-container'>
                    {goalsList.map(goal=><EditOrDelete key={goal} title={goal}/>)}
                </div>
                <Button
                title='Add Goal'
                customClass={'flatButton'}
                onClick={addGoal}
                />
                <Button
                title='Submit'
                customClass={'flatButton'}
                onClick={submitGoal}
                />
            </Form>
            <Form>
                <select className='text-based-input-select admin-select'>
                    <option>Choose a Course</option>
                    <option>BTECHCSE</option>
                </select>
                
                <select className='text-based-input-select admin-select'>
                    <option>Choose a Semester</option>
                    <option>Semester 1</option>
                </select>
                <select className='text-based-input-select admin-select'>
                    <option>Choose a Goal</option>
                    <option>Goal 1</option>
                </select>
                <div className='admin-item-container'>
                    <EditOrDelete/>
                </div>
                <Input
                placeholder={"Enter task title"}
                customClass={'full-width'}
                value={task}
                onChange={(e)=>setTask(e.target.value)}
                />
                <div className='admin-item-container'>
                    {taskList.map(task=><EditOrDelete key={task} task={task}/>)}
                </div>
                <Button
                title='Add this task'
                customClass={'flatButton'}
                onClick={addTask}
                />
                <Button
                title='Submit'
                customClass={'flatButton'}
                onClick={submitTask}
                />
            </Form>
        </div>
    );
}

export default SemesterForm;