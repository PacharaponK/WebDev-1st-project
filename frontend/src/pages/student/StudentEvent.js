import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DropdownEvent from "../components/DropdownEvent";
import StudentEventTable from "../components/StudentEventTable";
import StudentRelatedEventTable from "../components/StudentRelatedEvent";
import { Spin } from "antd";

function StudentEvent() {
    const storedData = localStorage.getItem('token');
    const [item, setItem] = useState([]);
    const [showing, setShowing] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true)

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

    const handleMenuClicked = (showing) => {
        if (showing === 'All Event') {
            { return <StudentEventTable items={item} /> }
        }
        else if (showing === 'Your Event') {
            { return <StudentRelatedEventTable items={item} /> }
        }
        else {
            return undefined
        }
    };

    return (
        <>
            <Spin fullscreen={isLoading} spinning={isLoading} id="spinning">
                <DropdownEvent menuClicked={(type) => setShowing(type)} /><br />
                <hr></hr>
                {handleMenuClicked(showing)}
            </Spin>
        </>
    )
}

export default StudentEvent;