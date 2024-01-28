import React, { useState, useEffect } from "react";
import UploadFile from "../components/UploadFlie";
import axios from "axios";
import moment from 'moment';

export default function Upload() {
    const storedData = localStorage.getItem('token');
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [onSendData, setOnSendData] = useState()

    axios.defaults.headers.common = { 'Authorization': `bearer ${storedData}` }

    const handleSendData = async (flie) => {
        setData(flie.map(d => ({
            title: d.Event,
            student: d.Student,
            result: d.Result.toString(),
            time: moment(d.Effective_datetime, 'DD/MM/YYYY HH:mm').format()
        })))
    }

    useEffect(() => {
        findID()
    }, [data])

    const findID = async () => {
        if (data) {
            try {
                const response = await axios.get('api/events/allStudent');
                const usernameToIdMap = {};
                response.data.forEach(student => {
                    usernameToIdMap[student.username] = student.id;
                });

                const updatedData = data.map(d => ({
                    ...d,
                    student: usernameToIdMap[d.student]
                }));

                setOnSendData(updatedData);

            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        const submitData = async () => {
            if (onSendData && onSendData.length > 0) {
                for (const d of onSendData) {
                    try {
                        setIsLoading(true);
                        const PostEvent = await axios.post('api/events/upload', {
                            "title": d.title,
                            ...d
                        });
                    } catch (err) {
                        console.log(err);
                    } finally {
                        setIsLoading(false);
                    }
                }
            }
        };
        submitData();
    }, [onSendData])

    return (
        <>
            <UploadFile data={handleSendData} />
            <h5 className="d-inline">Use this format to upload </h5>
            <a className='fs-4 d-inlines' href='https://docs.google.com/spreadsheets/d/1Vru_Ys8dwwRkpYMkFEyJeSeBM0L2S5IL/edit?usp=sharing&ouid=103849087133387638415&rtpof=true&sd=true' >Click Here!!</a>
        </>
    )
}