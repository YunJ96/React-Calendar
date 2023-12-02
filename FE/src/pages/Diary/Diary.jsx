import React, { useState } from 'react';
import SideNav from '../../components/Common/Side';
import Calendar from '../../components/Diary/Calendar';
import Todo from '../../components/Diary/Todo';
import './Diary.modules.scss';

function Diary() {
  const [showTodo, setShowTodo] = useState(false);
  const [closeTodo, setCloseTodo] = useState(false);

  const handleDateClick = () => {
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
    <div>
      <div className='diary-wrap'>
        <SideNav />
        <Calendar onDateClick={handleDateClick} />
        {showTodo && (
          <Todo closeTodo={closeTodo} handleCloseTodo={handleCloseTodo} />
        )}
      </div>
    </div>
  );
}

export default Diary;
