import { useEffect, useState } from 'react';
import { LogoutApi, UserApi } from '../API';
import './Header.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Header = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [cookies, getCookie] = useCookies();
    const [, , removeCookie] = useCookies([]); // 쓰지 않는 변수는 (공백),처리해주고 removeCookie 옵션만 사용한다

    const myPageNav = () => {
        navigate('/mypage');
    };
    const logOutNav = () => {
        LogoutApi();
        removeCookie('refresh_token', { path: '/' });
        removeCookie('access_token', { path: '/' });
        navigate('/');
    };
    useEffect(() => {
        UserApi().then((res) => setNickname(res.data?.username));
    }, []);

    return (
        <div className="Header">
            <div className="WrapperTop">
                <div className="TopLogo">
                    <img className="calsLogo" src={`${process.env.PUBLIC_URL}/img/calsLogo.png`} />
                    <div className="arrow_box">
                        <span className="HeaderUser">{nickname}님 안녕하세요!</span>
                    </div>
                </div>
                <div className="btnBox">
                    <button className="myPageBtn" onClick={myPageNav}>
                        마이페이지
                    </button>
                    <button className="logOutBtn" onClick={logOutNav}>
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
