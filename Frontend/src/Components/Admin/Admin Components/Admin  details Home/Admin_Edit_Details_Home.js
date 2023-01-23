import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';



const Rurl = "https://localhost:44349/api/test/Registration"

const Admin_Edit_Details_Home = () => {
    const { id } = useParams();
    const naviGate = useNavigate();
    const [inputState, setInputState] = useState({
        id: '',
        Name: '',
        PhoneNo: '',
        Password: '',
        IsActive: ''
    });
    const { Name, PhoneNo, Password } = inputState;

    useEffect(() => {
        loadUserData();
    }, []);



    const loadUserData = async () => {
        const response = await axios.get(`http://localhost:61713/api/login/GetByID/${id}`)
        setInputState(response.data[0])
    }


    const onInputChange = (e) => {
        setInputState({ ...inputState, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:61713/api/login`, inputState)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Edit successfully", { theme: "colored" })
                    naviGate('/Admin')
                }
            }).catch((err)=>{toast.error(err.message, { theme: "colored" })})
    }


    return (
        <div className='container'>
            <div className='w-75 mx-auto shadow p-5'>
                <Link className='btn btn-primary mt-3 ' to='/'>Back To Home</Link>
                <h2 className='text-center mb-4'>Edit A user</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input type='text'
                            className='form-control form-control-lg mb-3'
                            placeholder='Employee Name'
                            name='Name'
                            value={Name}
                            onChange={e => onInputChange(e)}
                        >
                        </input>
                    </div>
                    <div className='form-group'>
                        <input type='text'
                            className='form-control form-control-lg mb-3'
                            placeholder='PhoneNo'
                            name='PhoneNo'
                            value={PhoneNo}
                            onChange={e => onInputChange(e)}
                        >
                        </input>
                    </div>
                    <div className='form-group'>
                        <input type='text'
                            className='form-control form-control-lg mb-3'
                            placeholder='Password'
                            name='Password'
                            value={Password}
                            onChange={e => onInputChange(e)}
                        >
                        </input>
                    </div>
                    <Button type='submit' className='form-control btn-primary ' variant="warning">Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default Admin_Edit_Details_Home;
