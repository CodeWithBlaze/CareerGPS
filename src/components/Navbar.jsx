import React, { useState } from 'react';
import '../css/nav.css'
import Button from './Button';
import Logo from './Logo';
const ACTIVE_CLASS = 'link-active';
const NAV_ITEMS = ['Home','About','Contact','Join us']
function Navbar(props) {
    const [active,setActive] = useState('Home')
    return (
        <div className='navbar'>
            <Logo/>
            <ul className='navbar-menu'>
                {
                    NAV_ITEMS.map(item=><li key={item} className={active === item?ACTIVE_CLASS:''} onClick={()=>setActive(item)}>{item}</li>)
                }
            </ul>
            <Button title='Get Started'/>
        </div>
    );
}

export default Navbar;