import React from 'react';
import Header from '../../components/Header';
import './Main.css';
import MyCalendar from '../../components/MyCalendar';
import CalorieIntake from '../../components/CalorieIntake';
import RecordList from '../../components/RecordList';

const Main = () => {
    return (
        <div className="MainContainer">
            <Header />
            <div class="container">
                <div class="menu-1">
                    <div class="card card_1">
                        <div class="image">
                            <MyCalendar />
                        </div>
                    </div>
                </div>
                <div class="menu-2">
                    <div class="card card_2">
                        <div class="cardTitle2">오늘의 하루</div>
                        <CalorieIntake />
                    </div>
                </div>
                <div class="menu-3">
                    <div class="card card_3">
                        <div class="image">우와</div>
                        <RecordList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
