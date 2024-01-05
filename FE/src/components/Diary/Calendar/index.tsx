import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import './styles.scss';

interface DiaryProps {
  onDateClick: (date: Date, formattedDate: string) => void;
}

function Diary({ onDateClick }: DiaryProps) {
  const handleDateClick = (date: Date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    console.log(formattedDate);
    onDateClick(date, formattedDate);
  };

  return (
    <div className='calendar-wrap'>
      <Calendar
        className='calendar'
        calendarType='gregory'
        locale='en-HU'
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => dayjs(date).format('D')}
        onClickDay={handleDateClick}
      />
    </div>
  );
}

export default Diary;
