import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../backend/auth';
import { Routes } from '../config/constant';
import UserContext from '../context/UserContext';
import '../css/nav.css'
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo';
import useMediaQuery from '../hooks/useMediaQuery';
const ACTIVE_CLASS = 'link-active';
function Navbar({activeMenu='Home'}) {
    const [active] = useState(activeMenu)
    const {user} = useContext(UserContext);
    const [isOpen,setIsOpen] = useState(false);
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width: 450px)')
    if(isMobile)
        return(
            <div className='navbar-mobile-container'>
                <div className='navbar-mobile'>
                    <Logo onClick={()=>navigate('/')}/>
                    <div className='ham-menu' onClick={()=>setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={faBars} size='xl' color='#518BFA'/>
                    </div>
                </div>
                {isOpen && <div className='ham-menu-items' id='ham-menu-items'>
                    <ul className='navbar-menu navbar-menu-mobile'>
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
                        <Button title='Get Started' onClick={()=>navigate('/register/signup')} id='get-started-mobile'/>
                    }
                </div>}
            </div>
    )
    else
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
                    <Button title='Get Started' onClick={()=>navigate('/register/signup')} id='get-started-button-desktop'/>
                }
            </div>
    );
}

export default Navbar;