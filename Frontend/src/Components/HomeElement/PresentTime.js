import React, { useState, useEffect } from 'react';
import Datatable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const PresentTime = () => {

    const [PresentTime, setPresentTime] = useState([]);
    const [isLoding, setIsLoding] = useState(true);

    useEffect(() => {
        losdUser();

    }, []);

    const losdUser = () => {
        setIsLoding(true);
        const emp = (JSON.parse(window.localStorage.getItem('Login-info')));
        fetch(`http://localhost:61713/api/timeshit/getPresentTimeData`)
            .then((response) => response.json())
            .then((data) => {
                setPresentTime(data.filter((fill) => fill.empid == emp.id));
                setIsLoding(false);
            }).catch((err) => {
                setIsLoding(false);
                toast.warning("Table Data" + " " + err.message, { theme: "colored" })

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
                    <Link className='btn btn-primary btn-sm ' to={`/View/present/${row.id}`} >View</Link>
                </div>

        }
    ]
    return (<>
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

        /></>
    );
}

export default PresentTime;
