import React, { useState } from 'react';
import './styles.scss';

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
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
    <div className='todo'>
      <span id='todo-title'>To-Do List</span>
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
