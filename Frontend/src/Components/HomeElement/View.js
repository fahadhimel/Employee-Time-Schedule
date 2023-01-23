import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const View = () => {
    const { type, id } = useParams();
    const [getViewdataStor, setGetViewdataStor] = useState([]);
    //const { empid, name, comment, date, time } = value;

    useEffect(() => {
        getViewData();
    }, []);


    const getViewData = async () => {
        if (type == 'present') {
            const response = await axios.get(`http://localhost:61713/api/timeshit/GetByID/${id}`);
            setGetViewdataStor(response.data);

        } else if (type == 'out') {
            const response = await axios.get(`http://localhost:61713/api/outtime/GetByID/${id}`);
            setGetViewdataStor(response.data);

        } else if (type == 'leave') {
            const response = await axios.get(`http://localhost:61713/api/leaveday/GetByID/${id}`);
            setGetViewdataStor(response.data);
        }
    }


    return (
        <div className='container'>
            <div className='w-75 mx-auto shadow p-4'>
                <Link className='btn btn-primary mt-2 ' to='/'>Back To Home</Link>
                <h2 className='text-center mb-3 text-info'>{type} View a User</h2>

                {
                    getViewdataStor.map((value, index) => {
                        return <fieldset disabled key={index}>
                            <div className="form-group row shadow">
                                <label htmlFor="staticEmployeeId" className="col-sm-3 col-form-label myclass">Id :</label>
                                <div className="col-sm-8 ">
                                    <input type="text"
                                        readOnly
                                        className="form-control-plaintext myb"
                                        id="staticEmployeeId"
                                        defaultValue={value.empid}
                                    />
                                </div>
                            </div>
                            <div className="form-group row shadow">
                                <label htmlFor="staticName" className="col-sm-3 col-form-label myclass">Name :</label>
                                <div className="col-sm-8">
                                    <input type="text"
                                        readOnly
                                        className="form-control-plaintext"
                                        id="staticName"
                                        defaultValue={value.name} />
                                </div>
                            </div>
                            <div className="form-group row shadow">
                                <label htmlFor="staticEmail" className="col-sm-3 col-form-label myclass">Comment :</label>
                                <div className="col">
                                    <textarea type="text"
                                        readOnly
                                        className="form-control-plaintext mb-3"
                                        style={{ minHeight: '150px' }}
                                        id="staticEmail"
                                        defaultValue={value.comment} />
                                </div>
                            </div>
                            <div className="form-group row shadow">
                                <label htmlFor="staticPassword" className="col-sm-3 col-form-label myclass">Date :</label>
                                <div className="col-sm-8">
                                    <input type="text"
                                        readOnly
                                        className="form-control-plaintext"
                                        id="staticPassword"
                                        defaultValue={value.date} />
                                </div>
                            </div>
                            <div className="form-group row shadow">
                                <label htmlFor="staticPassword" className="col-sm-3 col-form-label myclass">Time :</label>
                                <div className="col-sm-8">
                                    <input type="text"
                                        readOnly
                                        className="form-control-plaintext"
                                        id="staticPassword"
                                        defaultValue={value.time} />
                                </div>
                            </div>
                        </fieldset>
                    })
                }

            </div>

        </div>
    );
}

export default View;
