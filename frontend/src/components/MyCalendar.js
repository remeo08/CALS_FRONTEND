import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import './MyCalendar.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment';

const MyCalendar = ({ dotDate }) => {
    const [searchParams] = useSearchParams();
    const [value, onChange] = useState(new Date(searchParams.get('created_date')));
    const navigate = useNavigate();

    function selectDate(d) {
        onChange(d);
        let year = d.getFullYear(); // 년도
        let month = d.getMonth() + 1; // 월
        let date = d.getDate(); // 날짜

        const selectedDate = year + '-' + month + '-' + date;
        navigate(`?created_date=${selectedDate}`);
    }

    useEffect(() => {
        onChange(searchParams.get('created_date'));
    }, [value]);

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
