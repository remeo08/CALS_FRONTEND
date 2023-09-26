import React, { useEffect } from 'react';
import Header from '../../components/Header';
import './Main.css';
import MyCalendar from '../../components/MyCalendar';
import CalorieIntake from '../../components/CalorieIntake';
import RecordList from '../../components/RecordList';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const accessToken = cookies.access_token;
    const navigate = useNavigate();

    var x = document.cookie;
    console.log(x, '바보');

    useEffect(() => {
        // 여기서 accessToken을 사용하여 로그인 상태를 확인하고 원하는 작업을 수행합니다.
        // 예를 들어, 유효한 토큰이 없다면 로그아웃 처리를 수행할 수 있습니다.
        if (!accessToken) {
            navigate('/login');
        }
    }, [accessToken]);
    return (
        <div className="MainContainer">
            <Header />
            <div className="container">
                <div className="menu-1">
                    <div className="card card_1">
                        <div className="image">
                            <MyCalendar />
                        </div>
                    </div>
                </div>
                <div className="menu-2">
                    <div className="card card_2">
                        <div className="cardTitle2">오늘의 하루</div>
                        <CalorieIntake />
                    </div>
                </div>
                <div className="menu-3">
                    <div className="card card_3">
                        <div className="image">우와</div>
                        <RecordList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
