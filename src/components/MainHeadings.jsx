import React from 'react';
import '../css/main_headings.css';
function MainHeadings({title,title_id,subtitle,subtitle_id,children,customHeadingStyle,customSubheadingStyle,customContainerStyle}) {
    return (
        <div className='main-heading-container' style={customContainerStyle}>
            {title && <h1 className='main-heading' style={customHeadingStyle} id={title_id}>{title}</h1>}
            {subtitle && <p className='main-subheading' style={customSubheadingStyle} id={subtitle_id}>{subtitle}</p>}
            {children}
        </div>
    );
}

export default MainHeadings;