import React from 'react';
import CategoryForm from '../components/Admin/CategoryForm';
import Goals from '../components/Admin/Goals';
import SemesterForm from '../components/Admin/SemesterForm';
import Task from '../components/Admin/Task';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import '../css/page/adminpanel.css';

const ADMIN_MENU = [
    {name:'Category', value:'category',component:<CategoryForm/>},
    {name:'Semester', value:'semester',component:<SemesterForm/>},
    {name:'Goal', value:'goal',component:<Goals/>},
    {name:'Task', value:'task',component:<Task/>},
]
function AdminPanel(props) {
    return (
        <>
           <Navbar activeMenu='Admin Panel'/>
           <div className='admin-menu'>
                <Menu MENU_ITEMS={ADMIN_MENU}/>
           </div>
        </>
    );
}

export default AdminPanel;