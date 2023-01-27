import React from 'react';
import '../css/taskcategory.css';
import {faCircleCheck as checkFilled} from '@fortawesome/free-solid-svg-icons'
import {faCircleCheck as checkOutline} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tag from './Tag';
function TaskCategory({heading,subheading}) {
    return (
        <>
        <div className='task-category'>
            <h4>{subheading}</h4>
            <h2>{heading}</h2>
        </div>
        <div className='task'>
            <div className='task-and-icon'>
                <FontAwesomeIcon icon={checkOutline} color={'#6C63FF'} size={'xl'}/>
                <div>
                    <h4>Choose a programming language</h4>
                    <h6>Date : 24th Oct 2022</h6>
                    <div className='tags'>
                        <Tag tagTitle={'Easy'}/>
                        <Tag tagTitle={'High'}/>
                    </div>
                </div>
            </div>
        </div>
        </>
        
    );
}

export default TaskCategory;