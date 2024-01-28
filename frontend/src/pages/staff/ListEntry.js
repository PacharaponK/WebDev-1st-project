import React, { useState, useEffect } from "react";
import axios from "axios";
import EventEntryTable from "../components/EventEntryTable";

function ListEntry() {
    const id = localStorage.getItem('sendId');
    const [item, setItem] = useState([])
    const storedData = localStorage.getItem('token');

    axios.defaults.headers.common = { 'Authorization': `bearer ${storedData}` }

    const fetchData = async () => {
        try {
            const request = await axios.get("api/events/1/entries");
            setItem(request.data
                .filter(d => d.event.title === id)
                .map(d => ({
                    id: d.id,
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

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleted = async (id) => {
        try {
            const deleted = await axios.delete(`/api/entries/${id}`);
            console.log(deleted);
        } catch (error) {
            console.log(error);
        }
        finally {
            fetchData()
        }
    }

    return (
        <div>
            <p>{id}</p>
            <EventEntryTable item={item} id={id} onDeleted={handleDeleted} />
            <br></br>
        </div>
    )
}

export default ListEntry;