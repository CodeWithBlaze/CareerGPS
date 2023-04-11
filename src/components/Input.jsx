import React, { useState } from 'react';
import '../css/input.css';
function Input({value,type,placeholder,onChange,customClass,style,error,setError,warning,setWarning,onBlur}) {
    function resetBox(){
        if(setError)
            setError('')
        if(setWarning)
            setWarning('')
    }
    const [isPasswordVisible,setIsPasswordVisible] = useState(false);
    return (
        <div>
        <input
        onFocus={()=>resetBox()} 
        onBlur={onBlur}
        style={style}
        value={value} 
        type={isPasswordVisible?'text':type}
        onChange={onChange}
        placeholder={placeholder} 
        className={`input-box ${customClass} ${error?'error':''} ${warning?'warning':''}`}/>
        {error && <p className='error-occured'>{error}</p>}
        {warning && <p className='warning-occured'>{warning}</p>}
        {type==='password' && <div className='password-visible'><input type="checkbox" checked={isPasswordVisible} onChange={(e)=>setIsPasswordVisible(!isPasswordVisible)}/>Show Password</div>}
        </div>
    );
    
}

export default Input;