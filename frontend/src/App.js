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
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
    return (
        <BrowserRouter>
            <ChakraProvider>
                <GlobalStyles />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/main" element={<Main />} />
                </Routes>
            </ChakraProvider>
        </BrowserRouter>
    );
};

export default App;
