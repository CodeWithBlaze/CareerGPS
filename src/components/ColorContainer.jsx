import React from 'react';
import '../css/color_container.css';
function ColorContainer({children,customStyle}) {
    return (
        <div className='color-container' style={customStyle}>
            {children}
        </div>
    );
}

export default ColorContainer;