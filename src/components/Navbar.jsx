import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../backend/auth';
import { Routes } from '../config/constant';
import UserContext from '../context/UserContext';
import '../css/nav.css'
import Button from './Button';
import Logo from './Logo';
const ACTIVE_CLASS = 'link-active';

function Navbar({activeMenu='Home'}) {
    const [active,setActive] = useState(activeMenu)
    const {user} = useContext(UserContext);
    const navigate = useNavigate()
    return (
        <div className='navbar'>
            <Logo onClick={()=>navigate('/')}/>
            <ul className='navbar-menu'>
                {
                    Routes.map(item=><li key={item.name} className={active === item.name?ACTIVE_CLASS:''} onClick={()=>{navigate(item.route)}}>{item.name}</li>)
                }
                {
                    user && <li key={'My Journey'} className={active === 'My Journey'?ACTIVE_CLASS:''} onClick={()=>{navigate('/journey')}}>{'My Journey'}</li>
                }
                {
                    user && user.profileData && user.profileData.role && user.profileData.role === 'admin' && <li key={'Admin Panel'} className={active === 'Admin Panel'?ACTIVE_CLASS:''} onClick={()=>{navigate('/admin')}}>{'Admin Panel'}</li>
                }
                
                {
                    user && <li key={'Logout'} onClick={()=>logOut()}>{'Logout'}</li>
                }
            </ul>
            {
                !user && 
                <Button title='Get Started' onClick={()=>navigate('/register/signup')}/>
            }
        </div>
    );
}

export default Navbar;