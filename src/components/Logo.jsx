import React from 'react';
import '../css/logo.css';
function Logo({customStyle}) {
    return (
        <>
        <h1 className='logo' style={customStyle}>CareerGPS</h1>
        </>
    );
}

export default Logo;