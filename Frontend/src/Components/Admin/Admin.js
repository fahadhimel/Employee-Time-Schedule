import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const Admin = () => {

    const [PresentTime, setPresentTime] = useState([]);
    const [isLoding, setIsLoding] = useState(true);

    useEffect(() => {
        losdUser();

    }, []);

    const losdUser = () => {
        setIsLoding(true);
        const emp = (JSON.parse(window.localStorage.getItem('Login-info')));
        fetch(`http://localhost:61713/api/login`)
            .then((response) => response.json())
            .then((data) => {
                setPresentTime(data);
                setIsLoding(false);
            }).catch((err) => {
                setIsLoding(false);
                toast.warning("Table Data" + " " + err.message, { theme: "colored" })

            })
    }


    const handleDelete = async (id) => {

        const empidObject = { empid: id }

        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            //Login--------------------------------------
                            await axios.delete(`http://localhost:61713/api/login/${id}`)
                            .then((res) => {
                                if (res.status === 200) {
                                    toast.success('User Delete successful ', { theme: "colored" })
                                } else if (res.status === 404) {
                                    toast.warning('User Something Wrong', { theme: "colored" })
                                }
                            })

                            //timeshit-------------------------------------------------
                            await fetch('http://localhost:61713/api/timeshit/All/empid', {
                                method: 'DELETE', 
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(empidObject),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    toast.success('Present '+{data}, { theme: "colored" })
                                })
                                .catch((error) => {
                                    toast.warning('Present '+{error}, { theme: "colored" })
                                });


                                //outtime-------------------------------------------------
                            await fetch('http://localhost:61713/api/outtime/All/empid', {
                                method: 'DELETE', 
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(empidObject),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    toast.success('Outtime '+{data}, { theme: "colored" })
                                })
                                .catch((error) => {
                                    toast.warning('Outtime '+{error}, { theme: "colored" })
                                });


                                //LeaveDay-------------------------------------------------
                            await fetch('http://localhost:61713/api/LeaveDay/All/empid', {
                                method: 'DELETE', 
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(empidObject),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    toast.success('LeaveDay '+{data}, { theme: "colored" })
                                })
                                .catch((error) => {
                                    toast.warning('LeaveDay '+{error}, { theme: "colored" })
                                });


                        } catch (error) {
                            toast.error('Admin Catch Block error..!', { theme: "colored" })
                        }
                        losdUser();
                    }
                },
                {
                    label: 'No',
                    onClick: () => losdUser()
                }
            ]
        })
    }


    const columns = [
        {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.Name,
        },
        {
            name: "PhoneNo",
            selector: (row) => row.PhoneNo,
        },
        {
            name: "Password",
            selector: (row) => row.Password,
        },
        {
            name: "Action",
            width: "400px",
            cell: (row) =>
                <div className='d-flex align-items-center'>
                    {/* <Link className='btn btn-primary btn-sm ' style={{ margin: "0 5px" }} to={`/Details_Present/${row.id}`} >presentTime</Link>
                    <Link className='btn btn-info btn-sm ' style={{ margin: "0 5px" }} to={`/Details_Out/${row.id}`} >OutTime</Link>
                    <Link className='btn btn-warning btn-sm ' style={{ margin: "0 5px" }} to={`/Details_Leave/${row.Name}/${row.id}`} >LeaveDay</Link> */}
                    <Link className='btn btn-primary btn-sm ' style={{ margin: "0 5px" }} to={`/Admin_details_Home/${row.id}`} >View</Link>

                    <Link className='btn btn-info btn-sm ' style={{ margin: "0 5px" }} to={`/Admin_Edit_Details_Home/${row.id}`} >Edit</Link>

                    <button className='btn btn-danger btn-sm ' style={{ margin: "0 5px" }} onClick={() => handleDelete(row.id)} >Delete</button>
                </div>

        }
    ]
    return (<>
        <div className='container'>
            {isLoding && <h2>{"Data Loading ..."}</h2>}
            <Datatable className='table border'
                title="PresentTime Data Table"
                columns={columns}
                data={PresentTime}
                striped
                pagination
                fixedHeader
                fixedHeaderScrollHeight='400px'
                selectableRows
                selectableRowsHighlight
                highlightOnHover

            />
        </div>
    </>
    );
}

export default Admin;
