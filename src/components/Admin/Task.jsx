import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import EditOrDelete from './EditOrDelete';
import Form from './Form';

function Task(props) {
    const [task,setTask] = useState('')
    const [taskList,setTaskList] = useState([])
    function addTask(){
        setTaskList([...taskList,task])
    }
    function submitTask(){
        console.log(taskList)
    }
    return (
        <div className='admin-category'>
            <Form>
                <div className='admin-item-container'>
                    <EditOrDelete/>
                </div>
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
                
                <Input
                placeholder={"Enter task title"}
                customClass={'full-width'}
                value={task}
                onChange={(e)=>setTask(e.target.value)}
                />
                
                <Button
                title='Add this task'
                customClass={'flatButton'}
                onClick={addTask}
                />
                
            </Form>
            <Form>
                <div className='admin-item-container'>
                    {taskList.map(task=><EditOrDelete key={task} task={task}/>)}
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