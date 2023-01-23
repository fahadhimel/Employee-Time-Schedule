import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Layout/Navbar';

const Admin_Protected = () => {

  return localStorage.getItem('Login-info') ?<><Navigate to='/'/></>: localStorage.getItem('Admin-info')? <><Navbar/><Outlet /></> : <><Navigate to='/Admin_Login'/></>

}

export default Admin_Protected;
