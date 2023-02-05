import React, { useState } from 'react';
import '../css/menu.css';

function Menu({MENU_ITEMS}) {
    const [active,setActive] = useState({item:MENU_ITEMS[0].value,component:MENU_ITEMS[0].component})
    return (
        <div className='menu-container'>
            <ul className='menu-items-container'>
                {MENU_ITEMS.map(item=>
                <li
                className={item.value === active.item ? 'menu-active':''} 
                onClick={()=>setActive({item:item.value,component:item.component})}
                >
                {item.name}
                </li>)}
            </ul>
            <div className='menu-component'>
                    {active.component}
            </div>
        </div>
    );
}

export default Menu;