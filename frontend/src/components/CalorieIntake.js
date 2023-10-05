import './CalorieIntake.css';
const CalorieIntake = () => {
    return (
        <div className="CalorieIntakeContainer">
            <div className="leftBox">
                <div className="CalorieIntakeText line_1">섭취 칼로리</div>
                <div className="CalorieIntakeText line_2">몸무게</div>
            </div>
            <div className="rightBox">
                <div className="CalorieIntakeText line_3">오늘의 꿀꿀 점수</div>
                <div className="CalorieIntakeText line_4">오늘의 한줄평</div>
            </div>
        </div>
    );
};

export default CalorieIntake;
