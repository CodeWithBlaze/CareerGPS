import React, { useState } from 'react';
import '../css/input.css';
function Input({value,type,placeholder,onChange,customClass,style,error,setError,warning,setWarning}) {
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
        style={style}
        value={value} 
        type={isPasswordVisible?'text':type}
        onChange={onChange}
        placeholder={placeholder} 
        className={`input-box ${customClass} ${error?'error':''} ${warning?'warning':''}`}/>
        {type==='password' && <div className='password-visible'><input type="checkbox" checked={isPasswordVisible} onChange={(e)=>setIsPasswordVisible(!isPasswordVisible)}/>Show Password</div>}
        {error && <p className='error-occured'>{error}</p>}
        {warning && <p className='warning-occured'>{warning}</p>}
        </div>
    );
    
}

export default Input;