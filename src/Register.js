import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
function Register(props) {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
        
    );
}

export default Register;

