import React from "react";
import { useNavigate } from "react-router-dom";


export default function StaffServices() {
    const navigate = useNavigate()

    return (
        <>
            <hr></hr>
            <div className="d-inline p-4">
                <button onClick={() => navigate('/staff/event/#')} type="button" className="btn text-white">
                    <div className="icon-link icon-link-hover">
                        <i className="bi bi-list-ol fs-3"></i>
                    </div>
                    <div>Event</div>
                </button>
            </div>
            <div className="d-inline p-4">
                <button onClick={() => navigate('/staff/entry/#')} type="button" className="btn text-white">
                    <div className="icon-link icon-link-hover">
                        <i className="bi bi-check2-circle fs-3"></i>
                    </div>
                    <div>Entry</div>
                </button>
            </div>
            <hr></hr>
            <div className="d-inline p-4">
                <button onClick={() => navigate('/staff/postevent/#')} type="button" className="btn text-white">
                    <div className="icon-link icon-link-hover">
                        <i className="bi bi-calendar-event fs-3"></i>
                    </div>
                    <div>Post Event</div>
                </button>
            </div>
            <div className="d-inline p-4">
                <button onClick={() => navigate('/staff/postentry/#')} type="button" className="btn text-white">
                    <div className="icon-link icon-link-hover">
                        <i className="bi bi-pencil-square fs-3"></i>
                    </div>
                    <div>Post Entry</div>
                </button>
            </div>
            <div className="d-inline p-4">
                <button onClick={() => navigate('/staff/postnews/#')} type="button" className="btn text-white">
                    <div className="icon-link icon-link-hover">
                        <i className="bi bi-megaphone fs-3"></i>
                    </div>
                    <div>Post News</div>
                </button>
            </div>
            <div className="d-inline p-4">
                <button onClick={() => navigate('/staff/upload/#')} type="button" className="btn text-white">
                    <div className="icon-link icon-link-hover">
                        <i className="bi bi-upload fs-3"></i>
                    </div>
                    <div>Post by upload</div>
                </button>
            </div>
        </>
    )
}