import React from 'react';
import '../css/tag.css'
function Tag({tagTitle,color}) {
    return (
        <div className='tag' style={{backgroundColor:color?color:'#9289FF'}}>
            {tagTitle}
        </div>
    );
}

export default Tag;