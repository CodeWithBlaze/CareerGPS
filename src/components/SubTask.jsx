import React from 'react';
import {faCircleCheck as checkFilled} from '@fortawesome/free-solid-svg-icons'
import {faCircleCheck as checkOutline} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Tag from './Tag';
function SubTask({task_title}) {
    return (
        <div className='task'>
            <div className='task-and-icon'>
                <FontAwesomeIcon icon={checkOutline} color={'#6C63FF'} size={'xl'}/>
                <div>
                    <h4>{task_title}</h4>
                    <h6>Date : 24th Oct 2022</h6>
                </div>
            </div>
        </div>
    );
}

export default SubTask;