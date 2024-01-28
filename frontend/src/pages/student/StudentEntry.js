import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import StudentSelectEntry from "../components/StudentSelectEntry";
import StudentEntryShowing from "../components/StudentEntryShowing";
import { Alert, message } from "antd";

export default function StudentEntry() {
    const storedData = localStorage.getItem('token');
    const [item, setItem] = useState([]);
    const [propsItem, setPropsItem] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    axios.defaults.headers.common = { 'Authorization': `bearer ${storedData}` }

    useEffect(() => {
        try {
            setIsLoading(true)
            fetchData();
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setIsLoading(false)
        }
    }, []);

    const fetchData = async () => {
        const request = await axios.get("api/events/studentRelated")
        setItem(request.data.data.map(d => ({
            id: d.id,
            key: d.id,
            ...d.attributes
        })));
    }

    const propsData = async (e) => {
        const request = await axios.get("api/events/studentRelated")
        setPropsItem(request.data.data
            .filter(d => d.attributes.title == e)
            .map(d => ({
                id: d.id,
                title: d.attributes.title,
                result: d.attributes.entry.result,
                seen_datetime: d.attributes.entry.seen_datetime || "You're not seen yet",
                accept_datetime: d.attributes.entry.accept_datetime || "You're not accept yet",
                full_marks : d.attributes.full_marks
            })));
    }


    const handleSelected = (e) => {
        propsData(e)
    };

    function handleUnseen(unseen, id) {
        if (unseen === "You're not seen yet") {
            setTimeout(() => {
                if (unseen === "You're not seen yet") {
                    updateUnseen(id);
                }
            }, 3000);
        }
    }

    const updateUnseen = async (id) => {
        try {
            const request = await axios.put(`api/entries/${id}`);
        } catch (e) {
            console.log(e);
        }
    }

    const handleClicked = async (id) => {
        try {
            const request = await axios.put(`api/accept/${id}`);
            message.success(`Accepted, refresh your page`);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <StudentSelectEntry item={item} selected={handleSelected} />
            <hr></hr>
            <StudentEntryShowing item={propsItem} unseen={handleUnseen} clicked={handleClicked} />
        </>
    )
}