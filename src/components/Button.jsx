import React from 'react';
import '../css/button.css';
function Button({customStyle,title="",outline=false,onClick,onMouseEnter,onMouseLeave,id=""}) {
    return (
        <button className={'button '+(outline?'action-btn-outline':'action-btn')} 
        id={id}
        style={customStyle}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >{title}</button>
    );
}

export default Button;