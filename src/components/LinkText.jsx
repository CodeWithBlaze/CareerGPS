import React from 'react';
import '../css/link_text.css';
function LinkText({text,onClick,style}) {
    return (
        <div onClick={onClick} className='link-text' style={style}>
            {text}
        </div>
    );
}

export default LinkText;