import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Form from './Form';
import '../../css/admin/category.css'
import EditOrDelete from './EditOrDelete';
function CategoryForm(props) {
    // create or update category form 
    const [category,setCategory] = useState({course:'',stream:''})
    // create or update semester form
    function submitCategory(){
        
    }
    
    return (
        <div className='admin-category'>
        <Form>
            <div className='admin-item-container'>
                <EditOrDelete/>
            </div>
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
            <Button
            title='Add this category'
            customClass={'flatButton'}
            onClick={submitCategory}
            />
        </Form>
        </div>
    );
}

export default CategoryForm;