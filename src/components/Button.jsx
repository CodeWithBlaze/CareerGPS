import React from 'react';
import '../css/button.css';
function Button({customStyle,title="",outline=false}) {
    return (
        <button className={'button '+(outline?'action-btn-outline':'action-btn')} style={customStyle}>{title}</button>
    );
}

export default Button;