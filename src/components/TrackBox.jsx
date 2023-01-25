import React from 'react';
import '../css/trackbox.css';
function TrackBox({text,progress}) {
    return (
        <div className='trackbox-container'>
            <h4 className='trackbox-heading'>{text}</h4>
            <progress value={progress} max="100" className='progress'> 32% </progress>
        </div>
    );
}

export default TrackBox;