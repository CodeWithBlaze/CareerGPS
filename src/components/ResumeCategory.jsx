import React from 'react';
import { PLACEHOLDER_TEXT, RESUME_CATEGORY } from '../config/constant';
import '../css/resume_category.css';

function ResumeCategory({type}) {

    return (
        <div className='resume-category'>
           {(type === RESUME_CATEGORY.EDUCATION || type === RESUME_CATEGORY.EXPERIENCE || type === RESUME_CATEGORY.PROJECT) 
            && 
            <div className='company-role'>
                <h3>{PLACEHOLDER_TEXT[type].company}</h3>
                <p className='resume-role'> - {PLACEHOLDER_TEXT[type].role}</p>
            </div>
            }
            {(type === RESUME_CATEGORY.EDUCATION || type === RESUME_CATEGORY.EXPERIENCE) 
            &&
            <p>Location</p>
            }
            {(type === RESUME_CATEGORY.EDUCATION || type === RESUME_CATEGORY.EXPERIENCE) 
            &&
            <p className='resume-category-date'>Date</p>
            }
            {(type === RESUME_CATEGORY.EDUCATION || type === RESUME_CATEGORY.EXPERIENCE || type === RESUME_CATEGORY.PROJECT) 
            &&
            <p className='resume-category-description'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</p>
            }
           
            
           {(type === RESUME_CATEGORY.SKILL || type === RESUME_CATEGORY.ACHIEVEMENT) && <p className='resume-category-title'>{PLACEHOLDER_TEXT[type].company}</p>}
           {(type === RESUME_CATEGORY.ACHIEVEMENT) && <p className='resume-category-subtitle'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</p>}
            
        </div>
    );
}

export default ResumeCategory;