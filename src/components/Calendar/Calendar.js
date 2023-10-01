import React, { useState } from 'react';

function Calendar() {
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

  return (
    <div>
      <ol id='todo-list'>
        {todoList.map((item, index) => (
          <li className={item.isCompleted === true ? 'completed' : ''}>
            <span>{item.value}</span>
            <button onClick={() => handleCompleteClick(index)}>완료</button>
            <button>삭제</button>
          </li>
        ))}
      </ol>
      <form id='todo-list-form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button type='submit'>등록</button>
      </form>
    </div>
  );
}

export default Calendar;
