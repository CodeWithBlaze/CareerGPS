import React from 'react';
import MainHeadings from './MainHeadings';
import road_to_success from '../asset/road_to_success.svg'
import '../css/img_heading.css';
function ImgHeading({heading,subheading,img,children,
    customHeadingStyle,
    customSubheadingStyle,
    customMainHeadingContainerStyle,
    customContainerStyle,
    title_id,
    subtitle_id,
    img_id
    }) {
    return (
        <div className='img-heading-container' style={customContainerStyle}>
            <MainHeadings 
            customContainerStyle={customMainHeadingContainerStyle}
            title={heading}
            title_id={title_id}
            customHeadingStyle={customHeadingStyle} 
            subtitle={subheading}
            subtitle_id={subtitle_id} 
            customSubheadingStyle={customSubheadingStyle}
            children={children}/>
            <img src={img || road_to_success} className='poster' alt='poster' id={img_id}/>
        </div>
    );
}

export default ImgHeading;