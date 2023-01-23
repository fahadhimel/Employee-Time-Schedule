import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LeaveDay = () => {

    const [LeaveDay, setLeaveDay] = useState([]);
    const [isLoding, setIsLoding] = useState(true);

    useEffect(() => {
        losdUser();

    }, []);


    const losdUser = () => {
        const emp = (JSON.parse(window.localStorage.getItem('Login-info')));
        fetch(`http://localhost:61713/api/LeaveDay/getLeaveDayData`)
            .then((response) => response.json())
            .then((data) => {
                setLeaveDay(data.filter((fill) => fill.empid == emp.id));
                setIsLoding(false);
            }).catch((err) => {
                toast.warning("Table Data" + " " + err.message, { theme: "colored" })
                setIsLoding(false);
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
                    <Link className='btn btn-primary btn-sm ' to={`/View/leave/${row.id}`} >View</Link>
                </div>

        }
    ]

    return (
        <>
            {isLoding && <h2>{"Data Loading ..."}</h2>}
            <Datatable className='table border'
                title="LeaveDay Data Table"
                columns={columns}
                data={LeaveDay}
                striped
                bordered
                pagination
                fixedHeader
                fixedHeaderScrollHeight='400px'
                selectableRows
                selectableRowsHighlight
                highlightOnHover

            />
        </>
    );
}

export default LeaveDay;
