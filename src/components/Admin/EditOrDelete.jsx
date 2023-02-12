import React from 'react';
import '../../css/admin/edit_or_delete.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons'
function EditOrDelete({content='This is a test text',onEdit,onDelete}) {
    return (
        <div className='edit-delete-container'>
            <p className='edit-delete-text'>{content}</p>
            <div className='edit-delete-menu'>
                <FontAwesomeIcon icon={faPenToSquare} onClick={onEdit}/>
                <FontAwesomeIcon icon={faTrash} onClick={onDelete}/>
            </div>
        </div>
    );
}

export default EditOrDelete;