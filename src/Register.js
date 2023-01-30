import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Signup from './pages/Signup';
function Register(props) {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/password' element={<ForgotPassword/>}/>
        </Routes>
        
    );
}

export default Register;

