import React, { useState } from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface TodoItem {
  id: number;
  isCompleted: boolean;
  value: string;
}

interface TodoProps {
  closeTodo: boolean;
  handleCloseTodo: () => void;
}

function Todo({ closeTodo, handleCloseTodo }: TodoProps) {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleCloseBtn = () => {
    handleCloseTodo();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.length === 0) {
      alert('Todo를 작성해주세요.');
    } else if (inputValue.length < 11) {
      setTodoList((current) => [
        ...current,
        {
          id: new Date().getTime(),
          isCompleted: false,
          value: inputValue,
        },
      ]);
    } else {
      alert('10글자 이내로 작성해주세요.');
    }

    setInputValue('');
  };

  const handleCompleteClick = (index: number) => {
    setTodoList((current) => {
      const newTodoList = [...current];
      newTodoList[index].isCompleted = true;
      return newTodoList;
    });
  };

  const handleRemoveClick = (index: number) => {
    setTodoList((current) => {
      const newTodoList = [...current];
      newTodoList.splice(index, 1);
      return newTodoList;
    });
  };

  return (
    <div className={`todo ${closeTodo ? 'disabled' : ''}`}>
      <span id='todo-title'>To-Do List</span>
      <FontAwesomeIcon
        icon={faTimes}
        className='closeButton'
        onClick={handleCloseBtn}
      />
      <div className='todo-list-wrap'>
        <ol id='todo-list'>
          {todoList.map((item, index) => (
            <li key={item.id} className={item.isCompleted ? 'completed' : ''}>
              <span>{item.value}</span>
              <div>
                <button
                  id='todo-complete-button'
                  className='buttons'
                  onClick={() => handleCompleteClick(index)}
                >
                  완료
                </button>
                <button
                  id='todo-delete-button'
                  className='buttons'
                  onClick={() => handleRemoveClick(index)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
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
    </div>
  );
}

export default Todo;
