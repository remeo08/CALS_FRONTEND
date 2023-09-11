import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="wrapper">
                <div className="first">칼로리 슬라이스의 관리자 칼스 등장!</div>
                <div className="textBox">
                    <div className="second">여러분의 칼로리를 칼스가 관리해드립니다!</div>
                    <div className="start">
                        <button
                            class="fun-btn"
                            onClick={() => {
                                navigate(`/login`);
                            }}
                        >
                            시작하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
