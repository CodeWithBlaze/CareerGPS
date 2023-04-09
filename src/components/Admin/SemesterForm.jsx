import React, { useEffect, useState } from 'react';
import { addASemester, deleteASemester, getCategories, getSemestersByCode, updateASemesterName } from '../../backend/api';
import '../../css/admin/category.css'
import { findAndRemove } from '../../helpers';
import Button from '../Button';
import Input from '../Input';
import EditOrDelete from './EditOrDelete';
import Form from './Form';
import { errorToast, successToast } from '../Toast';

function SemesterForm(props) {
    const [semester,setSemester] = useState('')
    const [categories,setCategories] = useState([])
    const [selectedCategory,setSelectedCategory] = useState('')
    const [semesterList,setSemesterList] = useState([])
    const [loading,setLoading] = useState(false)
    const [update,setUpdate] = useState(null)
    async function addSemesterToDatabase(){
        try {
            setLoading(true)
            const new_added_semester = await addASemester(selectedCategory,semester)
            setSemesterList([...new_added_semester.semesters])
            successToast('Semester Added') 
        } catch (error) {
            errorToast('Something went wrong while adding Semester')
        }
        finally{
            setLoading(false)
        }
        
    }
    function setSemesterForUpdate(semester){
        setUpdate(semester._id)
        setSemester(semester.name)
    }
    async function updateSemester(){
        try {
            setLoading(true)
            const updated_semester_list = await updateASemesterName(semester,update);
            setSemesterList([...updated_semester_list.semesters]) 
            successToast('Semester Updated')
        } catch (error) {
            errorToast('Something went wrong while updating the semester')
        }
        finally{
            setLoading(false)
            setUpdate(false);
        } 
    }
    async function deleteSemester(semester){
        deleteASemester(semester._id)
        .then(()=>{
            const updatedList = findAndRemove('_id',semester._id,semesterList)
            setSemesterList(updatedList)
            successToast('Semester Deleted')
        })
        .catch((err)=>errorToast('Error occured while deleting the semester'))
    }
    useEffect(()=>{
        getCategories()
        .then(res=>setCategories(res))
        .catch(err=>errorToast('Something went wrong while getting semesters'))
    },[])
    useEffect(()=>{
        if(selectedCategory)
            getSemestersByCode(selectedCategory)
            .then(res=>setSemesterList([...res.semesters]))
            .catch(err=>errorToast('Something went wrong while getting semesters'))
    },[selectedCategory])

    return (
        <div className='admin-category'>
            <Form>
                <div className='admin-item-container'>
                    {
                        semesterList.map(semester=>
                        <EditOrDelete 
                        key={semester._id} 
                        content={semester.name}
                        onEdit={()=>setSemesterForUpdate(semester)}
                        onDelete={()=>deleteSemester(semester)}
                        />)
                    }
                </div>
            </Form>
            <Form>
                <select className='text-based-input-select admin-select' onChange={(e)=>setSelectedCategory(e.target.value)}>
                    <option value={''}>Choose a Course</option>
                    {
                        categories.map(category=><option key={category._id} value={category.course_stream}>{category.course_stream}</option>)
                    }
                </select>
                
                <Input
                placeholder={"Enter a semester name"}
                customClass={'full-width'}
                value={semester}
                onChange={(e)=>setSemester(e.target.value)}
                />
                {
                    update?
                    <Button
                    title='Update Semester'
                    customClass={'flatButton'}
                    loading={loading}
                    onClick={updateSemester}
                    />
                    :
                    <Button
                    title='Add Semester to Database'
                    customClass={'flatButton'}
                    loading={loading}
                    onClick={addSemesterToDatabase}
                    />
                }
            </Form>
            
            
        </div>
    );
}

export default SemesterForm;