import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './Main.css';
import MyCalendar from '../../components/MyCalendar';
import CalorieIntake from '../../components/CalorieIntake';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Backdrop from '../../components/Backdrop';
import { UserApi, userDataApi } from '../../API';
import UserDiet from '../../components/UserDiet';

const Main = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const accessToken = cookies.access_token;
    const navigate = useNavigate();
    const [userDietInfo, setUserDietInfo] = useState([]);
    const [userData, setUserData] = useState();
    console.log('너는 뭐냐', userDietInfo);

    const [searchParams, setSearchParams] = useSearchParams();

    const [dotDate, setDotDate] = useState([]);
    const [dummy, setDummy] = useState(false);

    useEffect(() => {
        let today = new Date();

        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1; // 월
        let date = today.getDate(); // 날짜

        const todayDate = year + '-' + month + '-' + date;

        if (!searchParams.get('created_date')) {
            navigate(`?created_date=${todayDate}`);
        }

        // document.write(year + '-' + month + '-' + date);
        // 여기서 accessToken을 사용하여 로그인 상태를 확인하고 원하는 작업을 수행합니다.
        // 예를 들어, 유효한 토큰이 없다면 로그아웃 처리를 수행할 수 있습니다.
        if (!accessToken) {
            navigate('/login');
        }
        UserApi().then((res) => {
            if (res.status === 200) {
                setUserData(res.data);
            }
        });
        userDataApi(searchParams.get('created_date')).then((response) => {
            console.log('rere', response);
            if (response.status === 200) {
                console.log('djasfhabfa');
                setUserDietInfo(response.data.data);
                setDotDate(response.data.diet_saved_date);
            }
        });
    }, [accessToken, searchParams]);
    return (
        <div className="MainContainer">
            <Header userData={userData} key={userData} />
            <div className="container">
                <div className="menu-1">
                    <div className="card card_1">
                        <div className="image">
                            <MyCalendar dotDate={dotDate} />
                        </div>
                    </div>
                </div>
                <div className="menu-2">
                    <div className="card card_2">
                        <div className="cardTitle2">
                            <div className="fontBold">오늘의 하루</div>
                        </div>
                        <CalorieIntake userDietInfo={userDietInfo} key={userDietInfo} userData={userData} />
                    </div>
                </div>
                <div className="menu-3">
                    <div className="card card_3">
                        <div className="image">
                            <div className="fontBold">꿀꿀 식단</div>
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
                                    <UserDiet diet={userDietInfo} key={userDietInfo} render={setDummy} />
                                </div>
                            )}
                        </div>
                        <div className="allTotal">
                            {userDietInfo[userDietInfo?.length - 1]?.daily_calorie_sum ? (
                                <div>총 열량 :{userDietInfo[userDietInfo?.length - 1]?.daily_calorie_sum} kcal</div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
