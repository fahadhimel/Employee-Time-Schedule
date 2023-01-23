import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { toast } from 'react-toastify';


const Navbar = () => {
    const naviGate = useNavigate()
    const [route, setRoute] = useState('');
    const [adminRoute, setAdminRoute] = useState('');

    useEffect(() => {
        setRoute(JSON.parse(localStorage.getItem('Login-info')))
        setAdminRoute(JSON.parse(localStorage.getItem('Admin-info')))


    }, []);

    const logOut = () => {
        try {
            if (adminRoute) {
                localStorage.removeItem("Admin-info")
            } else {
                localStorage.removeItem("Login-info");
            }
            naviGate('/Login');
            toast.success("Logout successfully ", { theme: "colored" });
        } catch (err) {
            alert(err)
        }
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className='container'>
                <NavLink className="navbar-brand btn-outline-light"
                    to="#">
                    Employee Management
                </NavLink>

                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">

                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {
                            adminRoute ?
                                <>
                                    <li className="nav-item active">
                                        <NavLink className="nav-link" to="/Admin">
                                            Admin
                                        </NavLink>
                                    </li>
                                    <li className="nav-item active">
                                        <NavLink className="nav-link" to="Admin_Home">
                                            Admin_Home
                                        </NavLink>
                                    </li>

                                </> :
                                route ?
                                    <>
                                        <li className="nav-item active">
                                            <NavLink className="nav-link" to="/">
                                                Home
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/about">
                                                About
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/contact">
                                                Contact
                                            </NavLink>
                                        </li>
                                    </> : <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/Login">
                                                Login
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/Admin_Login">
                                                Admin_Login
                                            </NavLink>
                                        </li>
                                    </>


                        }


                    </ul>

                </div>


                {
                    adminRoute ?
                        <div className="dropup">

                            <button className="dropbtn"><i className="fa-regular fa-user"></i> {adminRoute.name} &nbsp;
                                <i className="fa-solid fa-caret-down"></i></button>
                            <div className="dropup-content">
                                {/* <a href="#">Link 1</a> */}
                                <button onClick={() => logOut()}><i className="fa-solid fa-power-off"></i> <span>Logout</span></button>
                            </div>
                        </div>

                        :

                        route ?
                            <div className="dropup">

                                <button className="dropbtn"><i className="fa-regular fa-user"></i> {route.Name} &nbsp;
                                    <i className="fa-solid fa-caret-down"></i></button>
                                <div className="dropup-content">
                                    {/* <a href="#">Link 1</a> */}
                                    <button onClick={() => logOut()}><i className="fa-solid fa-power-off"></i> <span>Logout</span></button>
                                </div>
                            </div> : null
                }

            </div>
        </nav>
    )
}
export default Navbar;

