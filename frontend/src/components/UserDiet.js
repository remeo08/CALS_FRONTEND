import React, { useEffect, useState } from 'react';
import './UserDiet.css';
import ModifyModal from './ModifyModal';

const UserDiet = ({ diet }) => {
    const [dietData, setDietData] = useState({ breakfast: {}, lunch: {}, dinner: {}, snack: {} });

    useEffect(() => {
        for (let i in diet) {
            setDietData((prev) => ({ ...prev, [diet[i]['meal_category']]: diet[i] }));
        }
    }, []);
    return (
        <div className="userDiet">
            <div className="meal">
                <div className="meal_title">
                    <div>아침</div>
                    <div>총 열량 : {dietData['breakfast'].meal_calorie} kcal</div>
                </div>
                <ul className="searchTitle">
                    <li>식품이름</li>
                    <li>내용량(g)</li>
                    <li>수량</li>
                    <li>열량(kcal)</li>
                </ul>
                <ul className="mealScroll">
                    {dietData['breakfast']['selected_diet']?.map((item, index) => (
                        <div className="mealList" key={index}>
                            <li className="item2">{item.food_name}</li>
                            <li className="item2">{item.food_gram}</li>
                            <li className="item2">{item.food_quantity}</li>
                            <li className="item2">{item.food_calorie}</li>
                        </div>
                    ))}
                </ul>
                <div className="btnCss">
                    <ModifyModal dietData={dietData['breakfast']} />
                </div>
            </div>
            <div className="meal">
                <div className="meal_title">
                    <div>점심</div>
                    <div>총 열량 : {dietData['lunch'].meal_calorie} kcal</div>
                </div>
                <ul className="searchTitle">
                    <li>식품이름</li>
                    <li>내용량(g)</li>
                    <li>수량</li>
                    <li>열량(kcal)</li>
                </ul>
                <ul className="mealScroll">
                    {dietData['lunch']['selected_diet']?.map((item, index) => (
                        <div className="mealList" key={index}>
                            <li className="item2">{item.food_name}</li>
                            <li className="item2">{item.food_gram}</li>
                            <li className="item2">{item.food_quantity}</li>
                            <li className="item2">{item.food_calorie}</li>
                        </div>
                    ))}
                </ul>
                <div className="btnCss">
                    <ModifyModal dietData={dietData['lunch']} />
                </div>
            </div>
            <div className="meal">
                <div className="meal_title">
                    <div>저녁</div>
                    <div>총 열량 : {dietData['dinner'].meal_calorie} kcal</div>
                </div>
                <ul className="searchTitle">
                    <li>식품이름</li>
                    <li>내용량(g)</li>
                    <li>수량</li>
                    <li>열량(kcal)</li>
                </ul>
                <ul className="mealScroll">
                    {dietData['dinner']['selected_diet']?.map((item, index) => (
                        <div className="mealList" key={index}>
                            <li className="item2">{item.food_name}</li>
                            <li className="item2">{item.food_gram}</li>
                            <li className="item2">{item.food_quantity}</li>
                            <li className="item2">{item.food_calorie}</li>
                        </div>
                    ))}
                </ul>
                <div className="btnCss">
                    <ModifyModal dietData={dietData['dinner']} />
                </div>
            </div>
            <div className="meal">
                <div className="meal_title">
                    <div>간식</div>
                    <div>총 열량 : {dietData['snack'].meal_calorie} kcal</div>
                </div>
                <ul className="searchTitle">
                    <li>식품이름</li>
                    <li>내용량(g)</li>
                    <li>수량</li>
                    <li>열량(kcal)</li>
                </ul>
                <ul className="mealScroll">
                    {dietData['snack']['selected_diet']?.map((item, index) => (
                        <div className="mealList" key={index}>
                            <li className="item2">{item.food_name}</li>
                            <li className="item2">{item.food_gram}</li>
                            <li className="item2">{item.food_quantity}</li>
                            <li className="item2">{item.food_calorie}</li>
                        </div>
                    ))}
                </ul>
                <div className="btnCss">
                    <ModifyModal dietData={dietData['snack']} />
                </div>
            </div>
        </div>
    );
};

export default UserDiet;
