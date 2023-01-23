import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Layout/Navbar';

const Protected = () => {


    return localStorage.getItem('Admin-info') ?<><Navigate to='/Admin'/></>: localStorage.getItem('Login-info') ? <><Navbar/><Outlet /></> : <><Navigate to='/Login'/></>

}

export default Protected;
