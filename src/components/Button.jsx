import React from 'react';
import '../css/button.css';
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
function Button({customStyle,customClass,title="",outline=false,onClick,onMouseEnter,onMouseLeave,id="",loading}) {
    return (
        <button className={'button '+(outline?'action-btn-outline':'action-btn')+` ${customClass}`} 
        id={id}
        style={customStyle}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >{loading?<Spinner/>:title}</button>
    );
}

export default Button;