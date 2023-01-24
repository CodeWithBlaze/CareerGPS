import React from 'react';
import '../css/card.css';
function Card({title,description,img,color='blue',id,onMouseEnter,onMouseLeave}) {
    return (
        <div className='familiar-card' style={{backgroundColor:color}} id={id}
        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
        >
            <img src={img} alt={'emoji'}/>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default Card;