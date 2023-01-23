import React from 'react';
import Details_Leave from './Admin_Employee_Details/Details_Leave';
import Details_Out from './Admin_Employee_Details/Details_Out';
import Details_present from './Admin_Employee_Details/Details_present';

const Admin_Details_Home = () => {
  return (
    <>
    <Details_present/>
    <Details_Out/>
    <Details_Leave/>
    </>
  );
}

export default Admin_Details_Home;
