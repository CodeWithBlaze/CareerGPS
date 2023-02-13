import React, { useEffect, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Form from './Form';
import '../../css/admin/category.css'
import EditOrDelete from './EditOrDelete';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../../backend/api';
import { Spinner } from 'react-activity';
import { findAndRemove, findAndUpdate } from '../../helpers';
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
        const result = await addCategory(category)
        setCategoryList([...categoryList,result])
        setLoading(false)
        alert('Category Added Successfully')
    }
    async function getAllCategories(){
        setLoadingCategory(true)
        const result = await getCategories()
        setCategoryList(result);
        setLoadingCategory(false)
    }
    async function setCategoryUpdate(category){
        setCategory({course:category.course_stream,stream:''})
        setUpdate(category._id)
    }
    async function categoryUpdate(){
        setLoading(true)
        const result = await updateCategory(update,category.course,category.stream)
        const updated_category_list = findAndUpdate('_id',update,result,categoryList)
        console.log(updated_category_list)
        setCategoryList(updated_category_list)
        setLoading(false)
        setUpdate(null)
    }
    async function removeCategory(id){
        console.log(id)
        deleteCategory(id)
        .then(()=>{
            const updated_list = findAndRemove('_id',id,categoryList)
            setCategoryList(updated_list)
        })
        .catch(err=>console.log(err))
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