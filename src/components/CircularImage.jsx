import React from 'react';
import '../css/circular_image.css'
function CircularImage({customClass,customStyle,img}) {
    return (
        <img src={img} className={`circular-image ${customClass}`} style={customStyle}/>
    );
}

export default CircularImage;