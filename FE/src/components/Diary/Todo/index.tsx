import React, { useEffect, useState } from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import todoApi from '../../../api/todoApi';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  email: string;
}

interface TodoItem {
  id: number;
  isCompleted: boolean;
  value: string;
}

interface TodoProps {
  formattedDate: string;
  closeTodo: boolean;
  handleCloseTodo: () => void;
}

function Todo({ formattedDate, closeTodo, handleCloseTodo }: TodoProps) {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleCloseBtn = () => {
    handleCloseTodo();
    setTodoList([]);
  };

  const fetchTodoList = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      if (token !== null) {
        const decodedToken = jwtDecode<JwtPayload>(token);

        const fetchedData = await todoApi.getTodo(
          decodedToken.email,
          formattedDate
        );

        if (Array.isArray(fetchedData?.todoList)) {
          setTodoList(
            fetchedData.todoList.map((item: string, index: number) => ({
              isCompleted: fetchedData.completed[index],
              value: item,
              id: index,
            }))
          );
        } else {
          console.log(fetchedData);
          setTodoList([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!closeTodo) {
      fetchTodoList();
    }
  }, [formattedDate, closeTodo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('로그인 후 이용가능한 서비스입니다.');
    } else {
      if (inputValue.length === 0) {
        alert('Todo를 작성해주세요.');
      } else if (inputValue.length < 11) {
        try {
          const decodedToken = jwtDecode<JwtPayload>(token);

          const response = await todoApi.createTodo(
            decodedToken.email,
            formattedDate,
            [inputValue],
            [false]
          );

          console.log(response);

          setTodoList((current) => [
            ...current,
            {
              id: new Date().getTime(),
              isCompleted: false,
              value: inputValue,
            },
          ]);
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('10글자 이내로 작성해주세요.');
      }

      setInputValue('');
    }
  };

  const handleCompleteClick = async (index: number) => {
    try {
      const token = localStorage.getItem('accessToken');

      if (token !== null) {
        const decodedToken = jwtDecode<JwtPayload>(token);

        await todoApi.completeStatusUpdateTodo(
          decodedToken.email,
          formattedDate,
          index
        );
      }

      setTodoList((current) => {
        const newTodoList = [...current];
        newTodoList[index].isCompleted = true;
        return newTodoList;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveClick = async (index: number) => {
    try {
      const token = localStorage.getItem('accessToken');

      if (token !== null) {
        const decodedToken = jwtDecode<JwtPayload>(token);

        await todoApi.deleteTodo(decodedToken.email, formattedDate, index);
      }

      setTodoList((current) => {
        const newTodoList = [...current];
        newTodoList.splice(index, 1);
        return newTodoList;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className={`todo ${closeTodo ? 'disabled' : ''}`}>
      <span id='todo-title'>To-Do List</span>
      <FontAwesomeIcon
        icon={faTimes}
        className='closeButton'
        onClick={handleCloseBtn}
      />
      <div className='todo-list-wrap'>
        <ol id='todo-list'>
          {Array.isArray(todoList) ? (
            todoList.map((item, index) => (
              <li key={item.id} className={item.isCompleted ? 'completed' : ''}>
                <span>{item.value}</span>
                <div className='todo-buttons'>
                  <button
                    id='todo-complete-button'
                    className='todo-button'
                    onClick={() => handleCompleteClick(index)}
                  >
                    완료
                  </button>
                  <button
                    id='todo-delete-button'
                    className='todo-button'
                    onClick={() => handleRemoveClick(index)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No todo items available.</p>
          )}
        </ol>
      </div>
      <form id='create-todo' onSubmit={handleSubmit}>
        <input
          className='create-todo-input'
          type='text'
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button id='todo-button' type='submit'>
          등록
        </button>
      </form>
    </aside>
  );
}

export default Todo;
