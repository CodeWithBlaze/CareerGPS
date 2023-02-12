import React from 'react';
import '../../css/admin/edit_or_delete.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons'
function EditOrDelete(props) {
    return (
        <div className='edit-delete-container'>
            <p className='edit-delete-text'>This is a test text</p>
            <div className='edit-delete-menu'>
                <FontAwesomeIcon icon={faPenToSquare}/>
                <FontAwesomeIcon icon={faTrash}/>
            </div>
        </div>
    );
}

export default EditOrDelete;