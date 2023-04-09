import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Form from './Form';
import '../../css/admin/category.css'
import EditOrDelete from './EditOrDelete';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../../backend/api';
import { Spinner } from 'react-activity';
import { findAndRemove, findAndUpdate } from '../../helpers';
import { errorToast, successToast } from '../Toast';
function CategoryForm(props) {
    // create or update category form 
    const [category,setCategory] = useState({course:'',stream:''})
    const [loading,setLoading] = useState(false);
    // exisiting categories
    const [categoryList,setCategoryList] = useState([])
    const [loadingCategory,setLoadingCategory] = useState(false);
    // update state
    const [update,setUpdate] = useState(null);
    // create or update semester form
    async function submitCategory(){
        setLoading(true)
        try{
            const result = await addCategory(category)
            setCategoryList([...categoryList,result])
            successToast('Category Added')
        }
        catch(err){
            console.log('Something went wrong')
        }
        finally{
            setLoading(false)
        }
    }
    async function getAllCategories(){
        try {
            setLoadingCategory(true)
            const result = await getCategories()
            setCategoryList(result);
        } catch (error) {
            errorToast('Something went wrong while fetching data')
        }
        finally{
            setLoadingCategory(false)
        }
        
    }
    async function setCategoryUpdate(category){
        const course_stream = category.course_stream.split('_')
        setCategory({course:course_stream[0],stream:course_stream[1]})
        setUpdate(category._id)
    }
    async function categoryUpdate(){
        try {
            setLoading(true)
            const result = await updateCategory(update,category.course,category.stream)
            const updated_category_list = findAndUpdate('_id',update,result,categoryList)
            setCategoryList(updated_category_list)
            successToast('Category Updated')
        } catch (error) {
            errorToast('Something went wrong while updating')
        }
        finally{
            setLoading(false)
            setUpdate(null)
        }
        
    }
    async function removeCategory(id){
        deleteCategory(id)
        .then(()=>{
            const updated_list = findAndRemove('_id',id,categoryList)
            setCategoryList(updated_list)
            successToast('Category Deleted')
        })
        .catch((err)=>errorToast('Error while deleting Category'))
    }
    useEffect(()=>{
        getAllCategories()
    },[])
    return (
        <div className='admin-category'>
            <Form>
                <div className='admin-item-container'>
                    {
                        loadingCategory && <Spinner/>
                    }
                    {
                        !loadingCategory && categoryList.map(category=>
                        <EditOrDelete 
                        key={category._id} 
                        content={category.course_stream} 
                        onEdit={()=>setCategoryUpdate(category)}
                        onDelete={()=>removeCategory(category._id)}
                        />)
                    }
                </div>
            </Form>
            <Form>
                
                <Input
                placeholder={"Enter a course name"} 
                customClass={'full-width'}
                value={category.course}
                onChange={(e)=>setCategory({...category,course:e.target.value})}
                />
                <Input
                placeholder={"Enter a stream name"} 
                customClass={'full-width'}
                value={category.stream}
                onChange={(e)=>setCategory({...category,stream:e.target.value})}
                />
                {update?
                <Button
                title='Update this Category'
                customClass={'flatButton'}
                loading={loading}
                onClick={categoryUpdate}
                />
                :
                <Button
                title='Add this category'
                customClass={'flatButton'}
                loading={loading}
                onClick={submitCategory}
                />
                
                }
            </Form>
        </div>
    );
}

export default CategoryForm;