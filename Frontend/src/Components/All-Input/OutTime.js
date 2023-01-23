import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const OutTime = () => {
    const naviGate = useNavigate();

    const Name = JSON.parse(localStorage.getItem("Login-info"))


    const [inputState, setInputState] = useState({
        empid: Name.id,
        name: localStorage.getItem("Login-info") ? Name.Name : null,
        comment: '',
        date: new Date().toLocaleString('en-us', {
            dateStyle: 'full'
        }),
        time: new Date().toLocaleString('en-us', {
            timeStyle: 'medium'
        })
    });
    const { comment } = inputState;



    const onInputChange = (e) => {
        setInputState({ ...inputState, [e.target.name]: e.target.value })
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:61713/api/outtime`, inputState)
            .then(() => {

                toast.success("Out Data successfully Added In DataBase 🙂", { theme: "colored" })
                naviGate("/")

            })

            .catch((err) => {
                toast.error("Opps.! Out Data not successfull Added In DataBase  😭", { theme: "colored" })
                console.log(err);
            });


    }

    return (
        <div className='container'>
            <div className='w-75 mx-auto shadow p-5'>
                <Link className='btn btn-primary mt-3 ' to='/'>Back To Home</Link>
                <h2 className='text-center mb-4'>OutTime</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input type='text'
                            className='form-control form-control-lg mb-3'
                            placeholder='Employee Name'
                            name='name'
                            value={Name.Name}
                            readOnly
                        >
                        </input>
                    </div>
                    <div className='form-group'>
                        <textarea type='text'
                            className='form-control form-control-lg mb-3'
                            placeholder=' Type Comment ...'
                            name='comment'
                            style={{ height: '150px' }}
                            value={comment}
                            onChange={e => onInputChange(e)}
                        >
                        </textarea>
                    </div>
                    <Button type='submit' className='form-control btn-primary ' variant="info">Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default OutTime;
