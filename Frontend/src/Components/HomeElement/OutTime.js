import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import "./TableStyle.css";

const OutTime = () => {

    const [Outtime, setOuttime] = useState([]);
    const [isLoding, setIsLoding] = useState(true);

    useEffect(() => {
        losdUser();

    }, []);

    const losdUser = () => {
        setIsLoding(true);
        const emp = (JSON.parse(window.localStorage.getItem('Login-info')));
        fetch(`http://localhost:61713/api/Outtime/getOutTimeData`)
            .then((response) => response.json())
            .then((data) => {
                setOuttime(data.filter((fill) => fill.empid == emp.id));
                setIsLoding(false);
            }).catch((err) => {
                toast.warning("Table Data" + " " + err.message, { theme: "colored" })
                setIsLoding(false)
            })
    }

    const columns = [
        {
            name: "Id",
            selector: (row) => row.empid,
            sortable: true,
            maxHeight: '2% !important',
        },
        {
            name: "Name",
            selector: (row) => row.name,
            //width: "100px"2%"
        },
        {
            name: "Comment",
            selector: (row) => row.comment.slice(0, 50),
            //width: "100px"5%"

        },
        {
            name: "Date",
            selector: (row) => row.date,
            //width: "100px"7%"
        },
        {
            name: "Time",
            selector: (row) => row.time,
            //width: "100px"3%"
        },
        {
            name: "Action",
            cell: (row) =>
                <div className='d-flex align-items-center'>
                    <Link className='btn btn-primary btn-sm ' to={`/View/out/${row.id}`} >View</Link>
                </div>

        }
    ]


    return (
        <>
            {isLoding && <h2>{"Data Loading ..."}</h2>}
            <Datatable className='table border'
                title="Outtime Data Table"
                columns={columns}
                data={Outtime}
                striped
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

export default OutTime;
