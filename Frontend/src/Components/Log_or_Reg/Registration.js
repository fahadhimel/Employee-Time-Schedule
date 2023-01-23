import React, { useState,useEffect } from 'react';
import "./Registration.css";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Layout/Navbar';
import { toast } from 'react-toastify';



const Rurl = "http://localhost:61713/api/Registration/registraTion"

const Registration = () => {
    const naviGate=useNavigate();

    const [inputstate, setInputstate] = useState({
        Name: "",
        PhoneNo: "",
        Password: "",
        IsActive: 1
    });
    const { Name, PhoneNo, Password } = inputstate;

    useEffect(() => {
        localStorage.getItem("Admin-info")?naviGate('/Admin'):localStorage.getItem("Login-info")?naviGate('/'):naviGate('/Registration')
    }, []);


    const HandleChange = (e) => {
        setInputstate({ ...inputstate, [e.target.name]: e.target.value })

    }

    const HandleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(Rurl, inputstate)
            .then((res) => {
                toast.success("Account successfully, please Login.", { theme: "colored" });
                naviGate('/Login')
            })
            .catch((err) => toast.warning("Opps..! Something wrong..", { theme: "colored" }))
    }

    return (
        <div className='All-color'>
            <Navbar />
            <div className="login">

                <form className="login-page" onSubmit={HandleSubmit}>
                    <h1 style={{fontSize:"2rem"}}>create account</h1>

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
                        type="text"
                        placeholder="Your Number"
                        name='PhoneNo'
                        value={PhoneNo}
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

                </form>

            </div>
        </div>
    );
}

export default Registration;
