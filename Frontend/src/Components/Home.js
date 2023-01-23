import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'
// import { Space, Table, Tag } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import LeaveDay from './HomeElement/LeaveDay';
import OutTime from './HomeElement/OutTime';
import PresentTime from './HomeElement/PresentTime';


const Home = () => {

    return (
        <>
            <div className='BtnStyle'>
                <NavLink to={`/PresentTime`} className='btn btn-primary Btnn'>PresentTime</NavLink>
                <NavLink to={`/Outtime`} className='btn btn-info Btnn'>Outtime</NavLink>
                <NavLink to={`/LeaveDay`} className='btn btn-warning Btnn'>LeaveDay</NavLink>
            </div>
            <div className='container'>

                <PresentTime />
                <OutTime />
                <LeaveDay />

            </div>

        </>

    );
}

export default Home;

/*

 const newtablecolumn=LeaveDay.map(({name,...item})=>({
        ...item,
        key:item.id,
    }))

    const columnss = [
        {
            title: 'id',
            dataIndex: 'id',
          },
          {
            title: 'Name',
            dataIndex: 'name',
            align:"center",
            editable:true
          },
          {
            title: 'comment',
            dataIndex: 'comment',
            align:"center",
            editable:true
          },
    ]






<Table dataSource={newtablecolumn}
                 columns={columnss}
                 bordered

                 /> */

/*<table className="table border shadow">
                    <thead className="thead-dark table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark gdnghdyngndyjdfndf</td>
                            <td>Ottojufhjkfbnfgnjfkfhjfv</td>

                        </tr>
                    </tbody>
                </table>

                <table className="table border shadow">
                    <thead className="thead-dark table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark gdnghdyngndyjdfndf</td>
                            <td>Ottojufhjkfbnfgnjfkfhjfv</td>

                        </tr>
                    </tbody>
                </table> */

        //fetch(`http://localhost:61713/api/timeshit/getPresentTime/${emp.id}`)
            // .then((response) => response.json())
            // .then((data) => {
            //     //return data.length > 0 ?  setPresentTimeURLaxiosData(data) : alert("alert")
            //      setPresentTimeURLaxiosData(data)
            //      console.log(data.data);
            // })
            // axios.get(`http://localhost:61713/api/timeshit/getPresentTime/${emp.id}`)
            // .then((res)=>{console.log(res.data);
            //     setPresent(res.data)})

            //     console.log(present)
