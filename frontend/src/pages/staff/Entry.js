import React from "react";
import '../Root.css';
import { useState, useEffect } from "react";
import axios from "axios";
import ChecklistIcon from '@mui/icons-material/Checklist';
import Link from "antd/es/typography/Link";
import { Outlet } from "react-router-dom";

function Entry() {
    const storedData = localStorage.getItem('token');
    const [item, setItem] = useState([])
    const [requestItem, setRequestItem] = useState([])

    axios.defaults.headers.common = { 'Authorization': `bearer ${storedData}` }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await axios.get("api/events/1/entries");
                const eventRequest = await axios.get("api/events/");
                setRequestItem(eventRequest.data.data.map(d => ({
                    event_title: d.attributes.title
                })));
                setItem(request.data.map(d => ({
                    id: d.id,
                    key: d.id,
                    event_title: d.event.title,
                    result: d.result,
                    key: d.id,
                    seen_datetime: d.seen_datetime,
                    accept_datetime: d.accept_datetime,
                    student_name: d.student.username,
                    student_email: d.student.email
                })));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const whichId = (id) => {
        localStorage.setItem('sendId', id);
    }

    const displayData = () => {
        return requestItem.map((i) => {
            {
                return (
                    <>
                        <div key={i.id}>
                            <Link onClick={() => { whichId(i.event_title) }} key={i.id} href="list" className="fs-6">
                                <button key={i.id} type="button" className="btn btn-outline-info btn-sm">
                                    <ChecklistIcon key={i.id} /> {i.event_title}
                                </button>
                            </Link>
                        </div>
                        <br></br>
                    </>
                )
            }
        });
    };


    return (
        <div className="fs-6">
            <Outlet/>
            {displayData(item)}
        </div>
    )
};

export default Entry;