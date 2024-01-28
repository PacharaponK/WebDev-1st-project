import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import EventTable from "../components/EventTable";
import EventEdit from "../components/EventEdit";
import { message } from 'antd';


function Event() {
    const storedData = localStorage.getItem('token');
    const [item, setItem] = useState([]);
    const [onEditedItem, setOnEditedItem] = useState();
    const [editedItem, setEditedItem] = useState()
    const [messageApi, contextHolder] = message.useMessage();


    axios.defaults.headers.common = { 'Authorization': `bearer ${storedData}` }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        try {
            if (editedItem) {
                update(editedItem)
                messageApi.success('Event updated success!!');
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            fetchData();
        }
    }, [editedItem])

    const handleConfirm = (e) => {
        const data = [e]
        const originalDate = new Date(e.effective_datetime);
        if (originalDate.toISOString().slice(0, 4) > 2565) {
            originalDate.setFullYear(originalDate.getFullYear() - 543);
        }
        const isoDateString = originalDate.toISOString();
        setEditedItem(data.map(d => ({
            ...d,
            full_marks : d.full_marks.toString() ,
            effective_datetime: isoDateString
        })))
    }

    const update = async (e) => {
        const data = e[0]
        const request = await axios.put(`api/events/${data.id}`, {
            data: {
                title: data.title,
                full_marks: data.full_marks,
                effective_datetime: data.effective_datetime
            }
        });
    }

    const handleOnDeleted = async (id) => {
        const deleted = await axios.delete(`api/events/${id}`);
        fetchData();
    }

    const handleOnEdited = (id) => {
        setOnEditedItem(id)
    }

    const fetchData = async () => {
        const request = await axios.get("api/events")
        setItem(request.data.data.map(d => ({
            id: d.id,
            key: d.id,
            ...d.attributes
        })));
    }

    return (
        <>
            {contextHolder}
            <EventTable items={item} onDeleted={handleOnDeleted} onEdited={handleOnEdited} />
            <EventEdit item={onEditedItem} confirm={handleConfirm} />
        </>
    )
}

export default Event;