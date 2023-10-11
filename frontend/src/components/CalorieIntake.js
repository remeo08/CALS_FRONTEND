import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import './CalorieIntake.css';
import { reviewApi, updateApi } from '../API';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CalorieIntake = ({ userDietInfo, userData, setUser }) => {
    const Star = ({ selected }) => <FaStar color={selected ? 'rgb(231, 69, 228)' : 'gray'} />;
    const [review, setReview] = useState('');
    const [weightValue, setWeightValue] = useState();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setReview(userDietInfo[0]?.daily_review);
    }, [userDietInfo]);

    const reviewChange = () => {
        reviewApi(searchParams.get('created_date'), { daily_review: review });
    };

    const weightChange = () => {
        updateApi({ weight: weightValue }).then((response) =>
            setUser((prev) => ({ ...prev, recommended_calorie: response.data.recommended_calorie }))
        );
    };

    useEffect(() => {
        setWeightValue();
    }, [userData]);
    return (
        <div className="CalorieIntakeContainer">
            <div className="leftBox">
                <div className="CalorieIntakeText line_1">
                    섭취 칼로리
                    <div className="intakeText">
                        {userDietInfo[userDietInfo?.length - 1]?.daily_calorie_sum
                            ? userDietInfo[userDietInfo?.length - 1]?.daily_calorie_sum
                            : 0}{' '}
                        / {userData?.recommended_calorie}
                    </div>
                </div>
                <div className="CalorieIntakeText line_2">
                    오늘의 몸무게
                    <div className="intakeText">
                        <input
                            className="modifyWeight"
                            type="number"
                            defaultValue={userData?.weight}
                            onChange={(e) => {
                                setWeightValue(e.target.value);
                            }}
                        />
                        <button type="submit" onClick={weightChange}>
                            변경
                        </button>
                    </div>
                </div>
            </div>
            <div className="rightBox">
                <div className="CalorieIntakeText line_3">
                    오늘의 점수
                    <div className="star intakeText">
                        {[...Array(5)].map((n, i) => (
                            <Star key={i} selected={userDietInfo[0] ? userDietInfo[0]?.daily_star_rating > i : 5} />
                        ))}
                    </div>
                </div>
                <div className="CalorieIntakeText line_4">
                    오늘의 한줄평
                    <div className="intakeText">
                        <input
                            className="intakeInput"
                            type="text"
                            defaultValue={review}
                            onChange={(e) => {
                                setReview(e.target.value);
                            }}
                        />
                        <button className="reviewBtn" type="submit" onClick={reviewChange}>
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalorieIntake;
