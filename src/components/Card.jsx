import React from 'react';
import '../css/card.css';
function Card({title,description,img,color='blue'}) {
    return (
        <div className='familiar-card' style={{backgroundColor:color}}>
            <img src={img}/>
            <h3>{title}</h3>
            <desc>{description}</desc>
        </div>
    );
}

export default Card;