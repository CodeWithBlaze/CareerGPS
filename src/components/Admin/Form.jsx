import React from 'react';
import '../../css/admin/form.css'

function Form({children,customStyle={},customClass=""}) {
    return (
        <div className={`admin-form ${customClass}`} style={customStyle}>
            {children}
        </div>
    );
}

export default Form;