import React from 'react';
import '../css/fileuploadbutton.css';
function FileUploadButton({for_id,title,customClass,outline,customStyle,onClick}) {
    return (
        <label 
        htmlFor={for_id} 
        className={'button file-upload-label'+(outline?'action-btn-outline':'action-btn')+` ${customClass}`}
        style={customStyle}
        onClick={onClick}
        >
            {title}
        </label>
    );
}

export default FileUploadButton;