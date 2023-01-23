import React, { useState, useEffect } from 'react';
import "./Registration.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';






const Rurl = "http://localhost:61713/api/adminlogin/admin/login"

const Admin_Login = () => {
    const naviGate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("Admin-info")) {
            naviGate('/Admin');
        }
    }, []);



    const [inputstate, setInputstate] = useState({
        Name: "",
        Password: ''
    });
    const { Name, Password } = inputstate;

    const HandleChange = (e) => {
        setInputstate({ ...inputstate, [e.target.name]: e.target.value })

    }

    const fetchLogin = () => {

        return fetch(Rurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputstate),
        })
            .then((response) => {
                return response.json();

            })
            .then((data) => {

                data.length > 0 ? data.map((index) => {
                    localStorage.setItem("Admin-info", JSON.stringify(index))
                    toast.success("Admin Login successfully", { theme: "colored" })
                }) : toast.warning("Oops..! Username or Password wrong..!", { theme: "colored" })
                //naviGate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        // localStorage.setItem('Admin-info', JSON.stringify(inputstate))
        await fetchLogin();
        naviGate('/Admin');
    }

    return (
        <div className='All-color'>
            <Navbar />
            <div className="login">

                <form className="login-page" onSubmit={HandleSubmit}>
                    <h1>Admin_Login</h1>

                    <input
                        required
                        className="fast"
                        type="text"
                        placeholder="Name"
                        name='Name'
                        value={Name}
                        onChange={e => HandleChange(e)}
                    />
                    <input
                        required
                        className="fast"
                        type="current-password"
                        placeholder="Password"
                        name='Password'
                        value={Password}
                        onChange={e => HandleChange(e)}

                    />


                    <button className="btn" type='Submit'>Send</button>

                </form><br /><br />
                <a href='/Registration'>create account</a>
            </div>
        </div>

    );
}

export default Admin_Login;
