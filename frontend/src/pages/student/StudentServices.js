import React from "react";
import { useNavigate } from "react-router-dom";


export default function StudentServices() {
    const navigate = useNavigate()

    return (
        <>
            <hr></hr>
                <div className="d-inline p-4">
                    <button onClick={() => navigate('/student/event/#')} type="button" className="btn text-white">
                        <div className="icon-link icon-link-hover">
                            <i className="bi bi-list-ol fs-3"></i>
                        </div>
                        <div>Event</div>
                    </button>
                </div>
                <div className="d-inline p-4">
                    <button onClick={() => navigate('/student/entry/#')} type="button" className="btn text-white">
                        <div className="icon-link icon-link-hover">
                            <i className="bi bi-check2-circle fs-3"></i>
                        </div>
                        <div>Entry</div>
                    </button>
                </div>
        </>
    )
}