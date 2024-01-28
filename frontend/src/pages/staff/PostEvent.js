import PostEventForm from "../components/PostEventForm";
import moment from 'moment';
import axios from "axios";
import { useState } from "react";

export default function PostEvent() {
    const storedData = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(false)


    axios.defaults.headers.common = { 'Authorization': `bearer ${storedData}` }

    const handleSummited = async (data) => {
        const effective_datetime = moment(data.effective_datetime.$d).format();
        try {
            setIsLoading(true)
            await axios.post('api/events', {
                    "title": data.title,
                    "time": effective_datetime,
                    "full_marks": data.full_marks.toString()
            })
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="d-flex justify-content-center me-5 pt-4">
            <PostEventForm onSummit={handleSummited} />
        </div>
    )
}