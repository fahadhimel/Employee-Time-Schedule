import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Details_Leave = () => {
    const { type, id } = useParams();
    const naviGate=useNavigate()

    const [PresentTime, setPresentTime] = useState([]);
    const [isLoding, setIsLoding] = useState(true);

    useEffect(() => {
        losdUser();

    }, []);

    const losdUser = () => {
        setIsLoding(true);
        fetch(`http://localhost:61713/api/LeaveDay/getLeaveDayData`)
            .then((response) => response.json())
            .then((data) => {
                setPresentTime(data.filter((fill) => fill.empid == id));
                setIsLoding(false);
            }).catch((err) => {
                setIsLoding(false);
                toast.warning("Table Data" + " " + err.message, { theme: "colored" })

            })
    }
    

    const handleDelete = (id) => {

        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        try {
                            axios.delete(`http://localhost:61713/api/LeaveDay/${id}`)
                                .then((res) => {
                                    if (res.status === 200) {
                                         toast.success('Delete successful ', { theme: "colored" })
                                         losdUser();
                                    } else if(res.status===404) {
                                         toast.warning('Something Wrong', { theme: "colored" })
                                    }
                                })
                                
                        } catch (error) {
                            toast.error('Something error', { theme: "colored" })
                        }  
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
            selector: (row) => row.empid,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
        },
        {
            name: "Comment",
            selector: (row) => row.comment.slice(0, 50),
        },
        {
            name: "Date",
            selector: (row) => row.date,
        },
        {
            name: "Time",
            selector: (row) => row.time,
        },
        {
            name: "Action",
            cell: (row) =>
                <div className='d-flex align-items-center'>
                    <Link className='btn btn-primary btn-sm ' to={`/Admin_View/leave/${row.id}`} >View</Link>
                    <button className='btn btn-danger btn-sm ' onClick={() => handleDelete(row.id)} style={{ margin: "0 5px" }} >Delete</button>
                </div>

        }
    ]
    return (<>

        {isLoding && <h2>{"Data Loading ..."}</h2>}
        <div className='container'>

            <Datatable className='table border'
                title={"LeaveDay Data Table"}
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

export default Details_Leave;
