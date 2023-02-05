import React from 'react';
import '../css/input.css';
function Input({value,type,placeholder,onChange,customClass,style,error,setError,warning,setWarning}) {
    function resetBox(){
        if(setError)
            setError('')
        if(setWarning)
            setWarning('')
    }
    return (
        <div>
        <input
        onFocus={()=>resetBox()} 
        style={style}
        value={value} 
        type={type}
        onChange={onChange}
        placeholder={placeholder} 
        className={`input-box ${customClass} ${error?'error':''} ${warning?'warning':''}`}/>
        {error && <p className='error-occured'>{error}</p>}
        {warning && <p className='warning-occured'>{warning}</p>}
        </div>
    );
    
}

export default Input;