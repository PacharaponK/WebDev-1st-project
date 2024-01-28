import { Button, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import PsuImageForNavbar from "../components/PsuLogoForNavbar";
import '../Root.css';
import axios from "axios";

function StaffPage() {
    const storedData = localStorage.getItem('token');
    const nevigate = useNavigate()
    const [outlet, setOutlet] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const [newItem, setNewItem] = useState()
    const [display, setDisplay] = useState()
    const [user, setUser] = useState()

    axios.defaults.headers.common = { 'Authorization': `bearer ${storedData}` }

    useEffect(() => {
        setIsLoading(true)
        news()
        setTimeout(() => {
            setIsLoading(false)
        }, 700)
        setOutlet(<Outlet />)
    }, [])

    useEffect(() => {
        if (newItem) {
            setDisplay(
                <div className="d-flex justify-content-center">
                    {newItem.map((d, index) => (
                        <div key={index} className="card text-bg-dark border-info" style={{ width: '14rem', height: 'auto', margin: '0 10px' }}>
                            <img src={d.url} className="card-img-top" alt={d.url} />
                            <div className="card-body">
                                <h5 className="card-title text-info fw-bold">{d.name}</h5>
                                <p className="card-text fs-6">{d.information}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    }, [newItem])

    const news = async () => {
        const requestNew = await axios.get("api/news");
        setNewItem(requestNew.data.data.map(d => ({
            name: d.attributes.new_name,
            information: d.attributes.information,
            date: d.attributes.last_available_date,
            url: d.attributes.imageURL
        })));

        const requestUser = await axios.get('api/users/me');
        setUser(requestUser.data.username);
    }

    return (
        <>
            {isLoading ? <Spin fullscreen={isLoading} spinning={isLoading} id="spinning"></Spin> :
                <>
                    <div id='bgNav'>
                        <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="shadow-lg bg-body-tertiary rounded-5 fixed-top mt-3" id='NavbarEdit'>
                            <Container>
                                <Navbar.Brand href="/staff/home/#" className="fw-semibold"><PsuImageForNavbar /></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link className="fw-semibold fs-6" href="/staff/home/#">Home</Nav.Link>
                                        <Nav.Link className="fw-semibold fs-6" href="/staff/event/#">Event</Nav.Link>
                                        <Nav.Link className="fw-semibold fs-6" href="/staff/entry/#">Entry</Nav.Link>
                                        <NavDropdown className="fw-semibold fs-6" title='Post' id='basic-nav-dropdown'>
                                            <NavDropdown.Item href="/staff/postevent/#">Event</NavDropdown.Item>
                                            <NavDropdown.Item href="/staff/postentry/#">Entry</NavDropdown.Item>
                                            <NavDropdown.Item href="/staff/postnews/#">News</NavDropdown.Item>
                                            <NavDropdown.Item href="/staff/upload/#">By Upload</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    <Button id="LogoutNav" variant="outline-danger d-block" onClick={() => nevigate("/")}>Logout</Button>
                                    <i className="bi bi bi-person-fill-gear fs-2 ms-3 me-1 d-inline" style={{ color: "white" }}></i>
                                    <span className="badge rounded-pill text-bg-light d-inline fs-6">{user}</span>
                                </Navbar.Collapse>

                            </Container>
                        </Navbar>
                    </div>
                    <div id='entirePage'>
                        <div id='tableBody'>
                            <div id='positionBody' className='w-auto align-middle d-block p-5 text-light text-center fw-semibold  fs-2'>
                                <p></p>
                                <p>Control Center</p>
                                {outlet}
                                <p className="mt-4"></p>
                                <hr></hr>
                                <p className="d-block fs-6 fw-bold">
                                    Announcement
                                </p>
                                {display}
                                <h5 className="d-inline text-info">Infomation: </h5>
                                <h5 className="d-inline">As a staff member, please be mindful and thoughtful in your actions.</h5>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>

    );
}
export default StaffPage;