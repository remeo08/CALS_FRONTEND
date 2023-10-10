import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import './MyCalendar.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const MyCalendar = ({ dotDate }) => {
    const [value, onChange] = useState(new Date());
    const navigate = useNavigate();

    function selectDate(d) {
        onChange(d);
        let year = d.getFullYear(); // 년도
        let month = d.getMonth() + 1; // 월
        let date = d.getDate(); // 날짜

        const todayDate = year + '-' + month + '-' + date;
        navigate(`?created_date=${todayDate}`);
    }

    return (
        <div className="MyCalendarContainer">
            <Calendar
                onChange={selectDate}
                value={value}
                tileContent={({ date, view }) => {
                    if (dotDate.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
                        return (
                            <>
                                <div className="dotFlex flex justify-center items-center absoluteDiv">
                                    <div className="dot"></div>
                                </div>
                            </>
                        );
                    }
                }}
            />
        </div>
    );
};

export default MyCalendar;
