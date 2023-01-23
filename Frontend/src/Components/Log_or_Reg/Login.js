import React, { useState, useEffect } from 'react';
import "./Registration.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';



const Rurl = "http://localhost:61713/api/login/login"

const Login = () => {
    const naviGate = useNavigate();

    useEffect(() => {
        localStorage.getItem("Admin-info")?naviGate('/Admin'):localStorage.getItem("Login-info")?naviGate('/'):naviGate('/Login')
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
                    localStorage.setItem("Login-info", JSON.stringify(index))
                    toast.success("Login successfully", { theme: "colored" })
                }) : toast.warning("Oops..! Username or Password wrong..!", { theme: "colored" })
                //naviGate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        await fetchLogin();
        naviGate('/');

    }

//  localStorage.setItem("Login-info", JSON.stringify({Name:"Fahadhimel",Password:"524635"}))
    return (
        <div className='All-color'>
            <Navbar />
            <div className="login">

                <form className="login-page" onSubmit={HandleSubmit}>
                    <h1>Login</h1>

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

                </form><br/><br/>
                <a href='/Registration'>create account</a>
            </div>
        </div>
    );
}

export default Login;
