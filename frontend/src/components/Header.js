import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const myPageNav = () => {
        navigate('/mypage');
    };
    const logOutNav = () => {
        navigate('/');
    };

    return (
        <div className="Header">
            <div className="WrapperTop">
                <div className="TopLogo">
                    <img className="calsLogo" src={`${process.env.PUBLIC_URL}/img/calsLogo.png`} />
                    <div className="arrow_box">
                        <span className="HeaderUser">OOO님 안녕하세요!</span>
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
