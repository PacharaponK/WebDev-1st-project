import moment from 'moment';
import axios from "axios";
import { useState } from "react";
import PostNewsForm from '../components/PostNewsForm';

export default function PostNews() {
    const storedData = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(false)

    axios.defaults.headers.common = { 'Authorization': `bearer ${storedData}` }

    const handleSummited = async (data) => {
        const datetime = moment(data.datetime.$d).format();
        try {
            setIsLoading(true)
            await axios.post('api/news', {
                data: {
                    "new_name": data.name,
                    "information": data.information,
                    "last_available_date": datetime,
                    "imageURL": data.imgURL
                }
            })
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="d-flex justify-content-center me-5 pt-4">
            <PostNewsForm onSummit={handleSummited}></PostNewsForm>
        </div>
    )
}