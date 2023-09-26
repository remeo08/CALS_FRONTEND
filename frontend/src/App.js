import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './routes/Landing/Landing';
// import Login from './routes/Login';
import Main from './routes/Main/Main';
import GlobalStyles from './GlobalStyles';
import './App.css';
import MyPage from './routes/MyPage/MyPage';
import SignIn from './routes/Login/SignIn';
import Register from './routes/SignUp/Register';

const App = () => {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
