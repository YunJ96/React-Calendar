import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import './styles.scss';

function Diary({ onDateClick }) {
  return (
    <div className='calendar-wrap'>
      <Calendar
        className='calendar'
        calendarType='US'
        locale='en-HU'
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => dayjs(date).format('D')}
        onClickDay={onDateClick}
      />
    </div>
  );
}

export default Diary;
