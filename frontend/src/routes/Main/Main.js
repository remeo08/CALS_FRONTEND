import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './Main.css';
import MyCalendar from '../../components/MyCalendar';
import CalorieIntake from '../../components/CalorieIntake';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Backdrop from '../../components/Backdrop';
import { userDataApi } from '../../API';
import UserDiet from '../../components/UserDiet';

const Main = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const accessToken = cookies.access_token;
    const navigate = useNavigate();
    const [userDietInfo, setUserDietInfo] = useState([]);
    console.log('너는 뭐냐', userDietInfo);

    useEffect(() => {
        let today = new Date();

        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1; // 월
        let date = today.getDate(); // 날짜

        const todayDate = year + '-' + month + '-' + date;
        // document.write(year + '-' + month + '-' + date);
        // 여기서 accessToken을 사용하여 로그인 상태를 확인하고 원하는 작업을 수행합니다.
        // 예를 들어, 유효한 토큰이 없다면 로그아웃 처리를 수행할 수 있습니다.
        if (!accessToken) {
            navigate('/login');
        }
        userDataApi(todayDate).then((response) => setUserDietInfo(response.data));
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
                        <div className="image">
                            꿀꿀 식단
                            <Backdrop userDietInfo={setUserDietInfo} />
                        </div>
                        <div className="dataBox">
                            {userDietInfo?.length === 0 ? (
                                <div>
                                    <div className="dataImg">
                                        <img src={`${process.env.PUBLIC_URL}/img/calsdata.png`} />
                                    </div>
                                    <div className="dataBoxText">
                                        <p>칼스는 배고파용</p>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <UserDiet diet={userDietInfo} key={userDietInfo} />
                                </div>
                            )}
                        </div>
                        <div className="allTotal">
                            총 열량 : {userDietInfo[userDietInfo.length - 1]?.daily_calorie_sum} kcal
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
