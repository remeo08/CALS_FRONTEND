import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './routes/Landing';
// import Login from './routes/Login';
import Main from './routes/Main';
import GlobalStyles from './GlobalStyles';
import './App.css';
import Register from './routes/Register';
import SignIn from './routes/SignIn';
import MyPage from './routes/MyPage';

const App = () => {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <div>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/main" element={<Main />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
