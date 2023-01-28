import React from 'react';
import '../css/logo.css';
function Logo({customStyle,onClick}) {
    return (
        <>
        <h1 className='logo' style={customStyle} onClick={onClick}>CareerGPS</h1>
        </>
    );
}

export default Logo;