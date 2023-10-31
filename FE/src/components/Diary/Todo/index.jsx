import React, { useState } from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Todo({ closeTodo, handleCloseTodo }) {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleCloseBtn = () => {
    handleCloseTodo();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.length === 0) {
      alert('Todo를 작성해주세요.');
    } else if (inputValue.length < 11) {
      setTodoList((current) => {
        return [
          ...current,
          {
            id: new Date().getTime(),
            isCompleted: false,
            value: inputValue,
          },
        ];
      });
    } else {
      alert('10글자 이내로 작성해주세요.');
    }

    setInputValue('');
  };

  const handleCompleteClick = (index) => {
    setTodoList((current) => {
      const newTodoList = [...current];
      newTodoList[index].isCompleted = true;
      return newTodoList;
    });
  };

  const handleRemoveClick = (index) => {
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
        icon={faXmark}
        className='closeButton'
        onClick={handleCloseBtn}
      />
      <div className='todo-list-wrap'>
        <ol id='todo-list'>
          {todoList.map((item, index) => (
            <li className={item.isCompleted === true ? 'completed' : ''}>
              <span>{item.value}</span>
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
