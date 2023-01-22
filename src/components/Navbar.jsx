import React from 'react';
import '../css/nav.css'
import Button from './Button';
import Logo from './Logo';
function Navbar(props) {
    return (
        <div className='navbar'>
            <Logo/>
            <ul className='navbar-menu'>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Join us</li>
            </ul>
            <Button title='Get Started'/>
        </div>
    );
}

export default Navbar;