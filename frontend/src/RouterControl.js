import './index.css'
import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Root from './pages/Root';
import StudentPage from './pages/student/StudentPage';
import StaffPage from './pages/staff/StaffPage';
import Error from './pages/ErrorPage';
import Event from './pages/staff/event';
import Entry from './pages/staff/Entry';
import ListEntry from './pages/staff/ListEntry';
import PostEntry from './pages/staff/PostEntry';
import PostEvent from './pages/staff/PostEvent';
import StudentEvent from './pages/student/StudentEvent';
import StudentServices from './pages/student/StudentServices';
import StudentEntry from './pages/student/StudentEntry';
import StaffServices from './pages/staff/StaffServices';
import Upload from './pages/staff/Upload';
import PostNews from './pages/staff/PostNews';

export const ThemeContext = createContext();

function Router() {
    const [theme, setTheme] = useState('dark');

    return (
        <ThemeContext.Provider value={[theme,setTheme]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/student" element={<StudentPage />}><Route />
                        <Route path='home' element={<StudentServices />} />
                        <Route path='event' element={<StudentEvent />} />
                        <Route path='entry' element={<StudentEntry />} />
                    </Route>
                    <Route path="/staff" element={<StaffPage />}><Route />
                        <Route path='home' element={<StaffServices />} />
                        <Route path="postentry" element={<PostEntry />} />
                        <Route path="upload" element={<Upload />} />
                        <Route path="postnews" element={<PostNews />} />
                        <Route path="postevent" element={<PostEvent />} />
                        <Route path="event" element={<Event />} />
                        <Route path="entry" element={<Entry />} >
                            <Route path="list" element={<ListEntry />} />
                        </Route >
                    </Route>
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    )
}

export default Router;