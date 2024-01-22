import React, { useState } from 'react';
import SideNav from '../../components/Common/Side';
import Calendar from '../../components/Diary/Calendar';
import Todo from '../../components/Diary/Todo';
import './Diary.modules.scss';
import dayjs from 'dayjs';

function Diary() {
  const [showTodo, setShowTodo] = useState<boolean>(false);
  const [closeTodo, setCloseTodo] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowTodo(true);
    setCloseTodo(false);
    console.log('todo 열기');
  };

  const handleCloseTodo = () => {
    setCloseTodo(true);
    setShowTodo(false);
    console.log('todo 닫기');
  };

  return (
    <article>
      <div className='diary-wrap'>
        <SideNav />
        <Calendar onDateClick={handleDateClick} />
        {showTodo && (
          <Todo
            formattedDate={dayjs(selectedDate).format('YYYY-MM-DD')}
            closeTodo={closeTodo}
            handleCloseTodo={handleCloseTodo}
          />
        )}
      </div>
    </article>
  );
}

export default Diary;
