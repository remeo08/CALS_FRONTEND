import React, { useEffect, useState } from 'react';
import './UserDiet.css';
import ModifyModal from './ModifyModal';
import { Button } from '@chakra-ui/react';
import { deleteRecordApi } from '../API';
import { useSearchParams } from 'react-router-dom';

const UserDiet = ({ diet, setUserDietData, setDotDate }) => {
    const [dietData, setDietData] = useState({ breakfast: {}, lunch: {}, dinner: {}, snack: {} });

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setDietData({ breakfast: {}, lunch: {}, dinner: {}, snack: {} });

        for (let i in diet) {
            setDietData((prev) => ({ ...prev, [diet[i]['meal_category']]: diet[i] }));
        }
    }, [diet]);

    const remove = (category) => {
        deleteRecordApi(searchParams.get('created_date'), category).then(() => {
            setDietData((prev) => ({ ...prev, [category]: {} }));
            setDotDate((prev) => {
                return [...prev.filter((x) => x !== searchParams.get('created_date'))];
            });
        });
        // setDietData((prev) => ({ ...prev, [category]: {} }))
    };

    return (
        <div className="userDiet">
            <div className="meal">
                <div className="meal_title">
                    <div className="mealType">아침</div>
                    <div>
                        열량 : {dietData['breakfast']?.meal_calorie ? dietData['breakfast'].meal_calorie : 0} kcal
                    </div>
                </div>
                <ul className="searchTitle">
                    <li>식품이름</li>
                    <li>내용량(g)</li>
                    <li>열량(kcal)</li>
                    <li>수량</li>
                </ul>
                <ul className="mealScroll">
                    {dietData['breakfast']?.selected_diet_quantity?.map((item, index) => (
                        <div className="mealList" key={index}>
                            <li className="item2">{item.selected_diet.food_name}</li>
                            <li className="item2">{item.selected_diet.food_gram}</li>
                            <li className="item2">{item.selected_diet.food_calorie}</li>
                            <li className="item2">{item.food_quantity}</li>
                        </div>
                    ))}
                </ul>
                <div className="btnCss">
                    {dietData['breakfast']?.meal_calorie ? (
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
                    {dietData['breakfast']?.meal_calorie ? (
                        <ModifyModal
                            setUserDietData={setUserDietData}
                            setDietData={setDietData}
                            dietData={dietData['breakfast']}
                        />
                    ) : null}
                </div>
            </div>
            <div className="meal">
                <div className="meal_title">
                    <div className="mealType">점심</div>
                    <div>열량 : {dietData['lunch']?.meal_calorie ? dietData['lunch'].meal_calorie : 0} kcal</div>
                </div>
                <ul className="searchTitle">
                    <li>식품이름</li>
                    <li>내용량(g)</li>
                    <li>열량(kcal)</li>
                    <li>수량</li>
                </ul>
                <ul className="mealScroll">
                    {dietData['lunch']?.selected_diet_quantity?.map((item, index) => (
                        <div className="mealList" key={index}>
                            <li className="item2">{item.selected_diet.food_name}</li>
                            <li className="item2">{item.selected_diet.food_gram}</li>
                            <li className="item2">{item.selected_diet.food_calorie}</li>
                            <li className="item2">{item.food_quantity}</li>
                        </div>
                    ))}
                </ul>
                <div className="btnCss">
                    {dietData['lunch']?.meal_calorie ? (
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
                    {dietData['lunch']?.meal_calorie ? (
                        <ModifyModal
                            setUserDietData={setUserDietData}
                            setDietData={setDietData}
                            dietData={dietData['lunch']}
                        />
                    ) : null}
                </div>
            </div>
            <div className="meal">
                <div className="meal_title">
                    <div className="mealType">저녁</div>
                    <div>열량 : {dietData['dinner']?.meal_calorie ? dietData['dinner'].meal_calorie : 0} kcal</div>
                </div>
                <ul className="searchTitle">
                    <li>식품이름</li>
                    <li>내용량(g)</li>
                    <li>열량(kcal)</li>
                    <li>수량</li>
                </ul>
                <ul className="mealScroll">
                    {dietData['dinner']?.selected_diet_quantity?.map((item, index) => (
                        <div className="mealList" key={index}>
                            <li className="item2">{item.selected_diet.food_name}</li>
                            <li className="item2">{item.selected_diet.food_gram}</li>
                            <li className="item2">{item.selected_diet.food_calorie}</li>
                            <li className="item2">{item.food_quantity}</li>
                        </div>
                    ))}
                </ul>
                <div className="btnCss">
                    {dietData['dinner']?.meal_calorie ? (
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
                    {dietData['dinner']?.meal_calorie ? (
                        <ModifyModal
                            setUserDietData={setUserDietData}
                            setDietData={setDietData}
                            dietData={dietData['dinner']}
                        />
                    ) : null}
                </div>
            </div>
            <div className="meal">
                <div className="meal_title">
                    <div className="mealType">간식</div>
                    <div>열량 : {dietData['snack']?.meal_calorie ? dietData['snack'].meal_calorie : 0} kcal</div>
                </div>
                <ul className="searchTitle">
                    <li>식품이름</li>
                    <li>내용량(g)</li>
                    <li>열량(kcal)</li>
                    <li>수량</li>
                </ul>
                <ul className="mealScroll">
                    {dietData['snack']?.selected_diet_quantity?.map((item, index) => (
                        <div className="mealList" key={index}>
                            <li className="item2">{item.selected_diet.food_name}</li>
                            <li className="item2">{item.selected_diet.food_gram}</li>
                            <li className="item2">{item.selected_diet.food_calorie}</li>
                            <li className="item2">{item.food_quantity}</li>
                        </div>
                    ))}
                </ul>
                <div className="btnCss">
                    {dietData['snack']?.meal_calorie ? (
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
                    {dietData['snack']?.meal_calorie ? (
                        <ModifyModal
                            setUserDietData={setUserDietData}
                            setDietData={setDietData}
                            dietData={dietData['snack']}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default UserDiet;
