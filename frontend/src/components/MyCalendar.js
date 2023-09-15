import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import './MyCalendar.css';

const MyCalendar = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className="MyCalendarContainer">
            <Calendar onChange={onChange} value={value} />
        </div>
    );
};

export default MyCalendar;
