import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import EditOrDelete from './EditOrDelete';
import Form from './Form';

function Goals(props) {
    const [goal,setGoal] = useState('')
    const [goalsList,setGoalsList] = useState([])
    function addGoal(){
        setGoalsList([...goalsList,goal])
    }
    function submitGoal(){
        console.log(goalsList)
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
                    <option>Choose a Semester</option>
                    <option>Semester 1</option>
                </select>
                <Input
                placeholder={"Enter a Goal name"}
                customClass={'full-width'}
                value={goal}
                onChange={(e)=>setGoal(e.target.value)}
                />
                
                <Button
                title='Add Goal'
                customClass={'flatButton'}
                onClick={addGoal}
                />
               
            </Form> 
            <Form>
                <div className='admin-item-container'>
                    {goalsList.map(goal=><EditOrDelete key={goal} title={goal}/>)}
                </div>
                <Button
                title='Submit'
                customClass={'flatButton'}
                onClick={submitGoal}
                />
            </Form>
        </div>
    );
}

export default Goals;