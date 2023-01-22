import React from 'react';
import MainHeadings from './MainHeadings';

import '../css/img_heading.css';
function ImgHeading({heading,subheading,img,children,
    customHeadingStyle,
    customSubheadingStyle,
    customMainHeadingContainerStyle,
    customContainerStyle
    }) {
    return (
        <div className='img-heading-container' style={customContainerStyle}>
            <MainHeadings 
            customContainerStyle={customMainHeadingContainerStyle}
            title={heading}
            customHeadingStyle={customHeadingStyle} 
            subtitle={subheading} 
            customSubheadingStyle={customSubheadingStyle}
            children={children}/>
            <img src={img} className='poster' alt='poster'/>
        </div>
    );
}

export default ImgHeading;