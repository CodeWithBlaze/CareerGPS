import React from 'react';
import { RESUME_CATEGORY } from '../config/constant';
import '../css/resume_category.css';

function ResumeCategory({
    type,
    details
}) {
    return (
        <div className='resume-category'>
           {(type === RESUME_CATEGORY.EDUCATION || type === RESUME_CATEGORY.EXPERIENCE || type === RESUME_CATEGORY.PROJECT) 
            && 
            <div className='company-role'>
                <h3>{details.company}</h3>
                <p className='resume-role'> - {details.role}</p>
            </div>
            }
            {(type === RESUME_CATEGORY.EDUCATION || type === RESUME_CATEGORY.EXPERIENCE) 
            &&
            <p>{details.location}</p>
            }
            {(type === RESUME_CATEGORY.EDUCATION || type === RESUME_CATEGORY.EXPERIENCE) 
            &&
            <p className='resume-category-date'>{details.date}</p>
            }
            {(type === RESUME_CATEGORY.EDUCATION || type === RESUME_CATEGORY.EXPERIENCE || type === RESUME_CATEGORY.PROJECT) 
            &&
            <p className='resume-category-description'>{details.description}</p>
            }
           
            
           {(type === RESUME_CATEGORY.SKILL || type === RESUME_CATEGORY.ACHIEVEMENT) && <p className='resume-category-title'>{details.company}</p>}
           {(type === RESUME_CATEGORY.ACHIEVEMENT) && <p className='resume-category-subtitle'>{details.description}</p>}
            
        </div>
    );
}

export default ResumeCategory;