import React, { useState, useEffect } from "react";
import PostEntryForm from "../components/PostEntryForm";
import axios from "axios";
import { Spin } from "antd";

function PostEntry() {
    const storedData = localStorage.getItem('token');
    const [item, setItem] = useState([])
    const [student, setStudent] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    axios.defaults.headers.common = { 'Authorization': `bearer ${storedData}` }

    useEffect(() => {
        fetchData();
        fetchStudent();
    }, []);


    const handleOnSummit = async (data) => {
        try {
            setIsLoading(true)
            const post = await axios.post('api/events/0/entries', {...data})
            console.log(post);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }
    
    const fetchStudent = async () => {
        const request = await axios.get("api/events/allStudent");
        setStudent(request.data.map(d => ({
            id : d.id,
            username : d.username,
            email : d.email
        })))
    }

    const fetchData = async () => {
        const request = await axios.get("api/events")
        setItem(request.data.data.map(d => ({
            id : d.id ,
            title: d.attributes.title
        })))
    };

    return (
        <Spin fullscreen={isLoading} spinning={isLoading} id="spinning">
            <div className="d-flex justify-content-center me-5 pt-4">
                <PostEntryForm item={item} student={student} onSummit={handleOnSummit} />
            </div>
        </Spin>
    )
};

export default PostEntry;