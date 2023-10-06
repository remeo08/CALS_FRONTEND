import React, { useEffect, useState } from 'react';
import './UserDiet.css';
import ModifyModal from './ModifyModal';
import { Button } from '@chakra-ui/react';
import { deleteRecordApi } from '../API';

const UserDiet = ({ diet }) => {
    const [dietData, setDietData] = useState({ breakfast: {}, lunch: {}, dinner: {}, snack: {} });

    useEffect(() => {
        for (let i in diet) {
            setDietData((prev) => ({ ...prev, [diet[i]['meal_category']]: diet[i] }));
        }
    }, []);

    const remove = (category) => {
        let today = new Date();

        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1; // 월
        let date = today.getDate(); // 날짜

        const todayDate = year + '-' + month + '-' + date;

        deleteRecordApi(todayDate, category).then(() => setDietData((prev) => ({ ...prev, [category]: {} })));
        // setDietData((prev) => ({ ...prev, [category]: {} }))
    };

    return (
        <div className="userDiet">
            <div className="meal">
                <div className="meal_title">
                    <div className="mealType">아침</div>
                    <div>열량 : {dietData['breakfast'].meal_calorie ? dietData['breakfast'].meal_calorie : 0} kcal</div>
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
                    {dietData['breakfast'].meal_calorie ? (
                        <Button
                            width="4vw"
                            height="3vh"
                            marginRight="5px"
                            onClick={() => {
                                remove('breakfast');
                            }}
                        >
                            삭제
                        </Button>
                    ) : null}
                    {dietData['breakfast'].meal_calorie ? <ModifyModal dietData={dietData['breakfast']} /> : null}
                </div>
            </div>
            <div className="meal">
                <div className="meal_title">
                    <div className="mealType">점심</div>
                    <div>열량 : {dietData['lunch'].meal_calorie ? dietData['lunch'].meal_calorie : 0} kcal</div>
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
                    {dietData['lunch'].meal_calorie ? (
                        <Button
                            width="4vw"
                            height="3vh"
                            marginRight="5px"
                            onClick={() => {
                                remove('lunch');
                            }}
                        >
                            삭제
                        </Button>
                    ) : null}
                    {dietData['lunch'].meal_calorie ? <ModifyModal dietData={dietData['lunch']} /> : null}
                </div>
            </div>
            <div className="meal">
                <div className="meal_title">
                    <div className="mealType">저녁</div>
                    <div>열량 : {dietData['dinner'].meal_calorie ? dietData['dinner'].meal_calorie : 0} kcal</div>
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
                    {dietData['dinner'].meal_calorie ? (
                        <Button
                            width="4vw"
                            height="3vh"
                            marginRight="5px"
                            onClick={() => {
                                remove('dinner');
                            }}
                        >
                            삭제
                        </Button>
                    ) : null}
                    {dietData['dinner'].meal_calorie ? <ModifyModal dietData={dietData['dinner']} /> : null}
                </div>
            </div>
            <div className="meal">
                <div className="meal_title">
                    <div className="mealType">간식</div>
                    <div>열량 : {dietData['snack'].meal_calorie ? dietData['snack'].meal_calorie : 0} kcal</div>
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
                    {dietData['snack'].meal_calorie ? (
                        <Button
                            width="4vw"
                            height="3vh"
                            marginRight="5px"
                            onClick={() => {
                                remove('snack');
                            }}
                        >
                            삭제
                        </Button>
                    ) : null}
                    {dietData['snack'].meal_calorie ? <ModifyModal dietData={dietData['snack']} /> : null}
                </div>
            </div>
        </div>
    );
};

export default UserDiet;
