import React, { useState, useEffect } from 'react';
import SideNav from '../../components/Common/Side';
import Calendar from '../../components/Diary/Calendar';
import Todo from '../../components/Diary/Todo';
import todoApi, { TodoItem } from '../../api/todoApi';
import './Diary.modules.scss';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

interface JwtPayload {
  email: string;
}

function Diary() {
  const [showTodo, setShowTodo] = useState<boolean>(false);
  const [closeTodo, setCloseTodo] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    getTodoList();
  }, [selectedDate]);

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

  const getTodoList = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      if (token !== null) {
        const decodedToken = jwtDecode<JwtPayload>(token);

        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');

        const fetchedTodoList = await todoApi.getTodo(
          decodedToken.email,
          formattedDate
        );

        setTodoList(fetchedTodoList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default Diary;
