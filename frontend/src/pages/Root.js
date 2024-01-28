import './Root.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import axios from 'axios';
import { useState } from 'react';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"

function Root() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginForm />
      </header>
    </div>
  );
}

export default Root;