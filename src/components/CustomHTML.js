import React from 'react';
import { Interweave } from 'interweave';
function CustomHTML({content}) {
    return (
        <Interweave content={content}/>
    );
}

export default CustomHTML;