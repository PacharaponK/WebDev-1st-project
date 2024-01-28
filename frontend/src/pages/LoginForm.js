import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import axiosConfig from '../axios-interceptor';
import { useNavigate } from 'react-router-dom';
import LoginLogo from './components/LoginLogo';
import { FloatButton, Spin } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import { ThemeContext } from '../RouterControl';

const LoginForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [verify, setVerify] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [active, setActive] = useState("btn btn-sm text-white opacity-50");
    const [showPassword, setShowPassword] = useState('password');
    const [theme, setTheme] = useContext(ThemeContext)
    const [label, setLabel] = useState('fw-bolder')

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axiosConfig.jwt = null
        axios.defaults.headers.common['Authorization'] = undefined;
        setSubmitEnabled(false);
        setIsLoading(true);

        try {
            let result = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: username,
                password: password
            })
            axiosConfig.jwt = result.data.jwt
            localStorage.setItem('token', result.data.jwt);

            result = await axios.get('http://localhost:1337/api/users/me?populate=role')
            if (result.data.role) {
                if (result.data.role.name == 'staff') {
                    setVerify('staff')
                    navigate('/staff/home/#');
                }
            }
            if (result.data.role) {
                if (result.data.role.name == 'student') {
                    setVerify('student')
                    navigate('/student/home/#');;
                }
            }

        } catch (e) {
            console.log(e)
            console.log('wrong username & password')
            setVerify('Invalid Username or Password')
            setSubmitEnabled(true);
        } finally {
            setIsLoading(false);
        }
    };

    const toggle = () => {
        if (active === 'btn btn-sm text-white opacity-50') {
            setActive('btn active btn-sm text-white opacity-100');
            setShowPassword('text');
        }

        else if (active === 'btn btn-sm text-dark opacity-50') {
            setActive('btn active btn-sm text-dark opacity-100');
            setShowPassword('text');
        }

        else {
            if (theme == 'dark') {
                setActive('btn btn-sm text-white opacity-50');
                setShowPassword('password');
            }
            else {
                setActive('btn btn-sm text-dark opacity-50');
                setShowPassword('password');
            }
        }
    }

    const changeTheme = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false)
        }, 300)
        if (theme == 'dark') {
            setTheme('light')
            setLabel('fw-bolder text-dark')
            setActive("btn btn-sm text-dark opacity-50")
        }
        else {
            setTheme('dark')
            setLabel('fw-bolder')
            setActive("btn btn-sm text-white opacity-50")
        }
    }

    useEffect(() => {
        document.getElementById('loginLight');
        document.getElementById('bodyLight');
        document.getElementsByClassName('fw-bolder text-dark');
    }, [theme]);

    return (
        (isLoading) ? <Spin fullscreen spinning={isLoading}></Spin> :
            <div id={theme === 'dark' ? undefined : 'loginLight'}>
                <Form onSubmit={handleSubmit}>
                    <LoginLogo />
                    <Form.Group controlId="formBasicUsername">
                        <p>
                            <Form.Label className={label}>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                            />
                        </p>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <p>
                            <Form.Label className={label}>Password</Form.Label>
                            <Form.Control
                                type={showPassword}
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </p>
                    </Form.Group>
                    <p>
                        <button type="button" className={active} onClick={toggle} data-bs-toggle="button">
                            Show Password
                        </button>
                    </p>
                    <Button variant="primary" type="submit" disabled={!submitEnabled}>
                        Submit
                    </Button>
                    <p className='wrongPassword'>{verify}</p>
                    <FloatButton icon={<BgColorsOutlined />} type="primary" onClick={changeTheme} />
                </Form>
            </div>
    );
};

export default LoginForm;