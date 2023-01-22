import React from 'react';
import '../css/main_headings.css';
function MainHeadings({title,subtitle,children,customHeadingStyle,customSubheadingStyle,customContainerStyle}) {
    return (
        <div className='main-heading-container' style={customContainerStyle}>
            {title && <h1 className='main-heading' style={customHeadingStyle}>{title}</h1>}
            {subtitle && <p className='main-subheading' style={customSubheadingStyle}>{subtitle}</p>}
            {children}
        </div>
    );
}

export default MainHeadings;