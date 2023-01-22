import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../css/logotext.css';

function LogoText({icon,text,color,size,customStyle}) {
    return (
        <div className='logo-text-container' style={customStyle}>
            <div className='icon-container'>
                <FontAwesomeIcon icon={icon} color={color || 'white'} size={size || 'xl'}/>
            </div>
            <h3>{text}</h3>
        </div>
    );
}

export default LogoText;