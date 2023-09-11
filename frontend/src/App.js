import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Main from './routes/Main';
import SignUp from './routes/SignUp';
import GlobalStyles from './GlobalStyles';
import './App.css';

const App = () => {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <div>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/main" element={<Main />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
