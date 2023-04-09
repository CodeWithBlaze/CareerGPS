import React, { useEffect, useState } from 'react';
import { addGoals, deleteGoalFromDatabase, getAllGoalsBySemesterId, getCategories, getSemestersByCode, updateGoalInDatabase } from '../../backend/api';
import { findAndRemove } from '../../helpers';
import Button from '../Button';
import Input from '../Input';
import EditOrDelete from './EditOrDelete';
import Form from './Form';
import { errorToast, successToast } from '../Toast';

function Goals(props) {
    const [categories,setCategories] = useState([])
    const [selectedCategory,setSelectedCategory] = useState('')

    const [semesterList,setSemesterList] = useState([])
    const [selectedSemester,setSelectedSemester] = useState('')

    const [goal,setGoal] = useState('')
    const [goalsList,setGoalsList] = useState([])
    const [newGoalsList,setNewGoalsList] = useState([])

    const [loading,setLoading] = useState(false);
    const [update,setUpdate] = useState(null);
    const [updateLoading,setUpdateLoading] = useState(false)
    function addGoal(){
        setNewGoalsList([...newGoalsList,{title:goal,id:newGoalsList.length}])
    }
    async function submitGoal(){
        try {
            setLoading(true);
            const updated_goals_list = await addGoals(selectedSemester,newGoalsList)
            setGoalsList([...updated_goals_list])
            setNewGoalsList([])
            successToast('Goals Added') 
        } catch (error) {
            errorToast('Something went wrong while adding Goal')
        }
        finally{
            setLoading(false) 
        }
        
    }
    async function setGoalForUpdate(goal){
        setGoal(goal.title)
        setUpdate({...goal})
    }
    function updateGoalsList(id,updatedTitle){
        const index = goalsList.findIndex(goal=>goal._id === id)
        const updated_goals_list = [...goalsList]
        updated_goals_list[index] = {...updated_goals_list,title:updatedTitle}
        return updated_goals_list
    }
    async function updateGoal(){
        if(update._id){
            try {
                setUpdateLoading(true);
                await updateGoalInDatabase(selectedSemester,update._id,goal)
                const updatedList = updateGoalsList(update._id,goal)
                setGoalsList(updatedList)
                successToast('Goal Updated')
            } catch (error) {
                errorToast('Something went wrong while updating Goal')
            }
            finally{
                setUpdateLoading(false);
            }
        }
        else if(update.id === 0 || update.id){
            const updated_goals_list = [...newGoalsList]
            updated_goals_list[update.id] = {...updated_goals_list[update.id],title:goal}
            setNewGoalsList([...updated_goals_list])
        }
        else{
            alert("Nothing selected")
        }
    }
    async function cancelUpdate(){
        setGoal('');
        setUpdate(null);
    }
    async function deleteGoal(goal){
        if(goal._id){
            try {
                await deleteGoalFromDatabase(selectedSemester,goal._id)
                const updatedList = findAndRemove('_id',goal._id,goalsList)
                setGoalsList([...updatedList])
                successToast('Goal Deleted')
            } catch (error) {
                errorToast('Something went wrong while deleting the toast')
            }
            
        }
        else if(goal.id === 0 || goal.id){
            const updatedList = newGoalsList.filter(g=>g.id !== goal.id)
            setNewGoalsList([...updatedList])
        }
        else{
            alert("Nothing is selected")
        }
    }
    useEffect(()=>{
        getCategories()
        .then(res=>setCategories([...res]))
        .catch(err=>errorToast('Something went wrong while fetching categories'))
    },[])
    useEffect(()=>{
        if(selectedCategory)
            getSemestersByCode(selectedCategory)
            .then(res=>setSemesterList([...res.semesters]))
            .catch(err=>errorToast('Something went wrong while fetching semesters'))
    },[selectedCategory])
    useEffect(()=>{
        if(selectedSemester)
            getAllGoalsBySemesterId(selectedSemester)
            .then(res=>setGoalsList([...res]))
            .catch(err=>errorToast('Something went wrong while fetching goals'))
    },[selectedSemester])
    return (
        <div className='admin-category'>
            <Form>
                <div className='admin-item-container'>
                    {
                        goalsList.map(goal=>
                        <EditOrDelete 
                        key={goal._id} 
                        content={goal.title}
                        onEdit={()=>setGoalForUpdate(goal)}
                        onDelete={()=>deleteGoal(goal)}
                        />)
                    }
                </div>
            </Form>
           <Form> 
                <select className='text-based-input-select admin-select' onChange={(e)=>setSelectedCategory(e.target.value)}>
                    <option>Choose a Course</option>
                    {
                        categories.map(category=><option key={category._id} value={category.course_stream}>{category.course_stream}</option>)
                    }
                </select>
                <select className='text-based-input-select admin-select' onChange={(e)=>setSelectedSemester(e.target.value)}>
                    <option>Choose a Semester</option>
                    {
                        semesterList.map(semester=><option key={semester._id} value={semester._id}>{semester.name}</option>)
                    }
                </select>
                <Input
                placeholder={"Enter a Goal name"}
                customClass={'full-width'}
                value={goal}
                onChange={(e)=>setGoal(e.target.value)}
                />
                
                {
                    update?
                    <>
                    <Button
                    title='Update Goal'
                    customClass={'flatButton'}
                    onClick={updateGoal}
                    loading={updateLoading}
                    />
                    <Button
                    title='Cancel Update'
                    customClass={'flatButton'}
                    onClick={cancelUpdate}
                    />
                    </>
                    :
                    <Button
                    title='Add Goal'
                    customClass={'flatButton'}
                    onClick={addGoal}
                    />
                }
               
            </Form> 
            <Form>
                <div className='admin-item-container'>
                    {newGoalsList.map(goal=>
                    <EditOrDelete 
                    key={goal.id} 
                    content={goal.title}
                    onEdit={()=>setGoalForUpdate(goal)}
                    onDelete={()=>deleteGoal(goal)}
                    />)}
                </div>
                <Button
                title='Submit'
                loading={loading}
                customClass={'flatButton'}
                onClick={submitGoal}
                />
            </Form>
        </div>
    );
}

export default Goals;