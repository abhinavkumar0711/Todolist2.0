import React, { useState } from "react";
import "./App.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTask = (event) => {
    event.preventDefault();
    setTasks([
      ...tasks,
      { task: inputValue, date: new Date(), dueDate: new Date(dueDate) },
    ]);
    setInputValue("");
    setDueDate("");
  };

  const deleteTask = (index) => {
    setTasks([...tasks.slice(0, index), ...tasks.slice(index + 1)]);
  };

  const getTodaysTasks = () => {
    return tasks.filter((task) => {
      const today = new Date();
      return (
        task.dueDate.getFullYear() === today.getFullYear() &&
        task.dueDate.getMonth() === today.getMonth() &&
        task.dueDate.getDate() === today.getDate()
      );
    });
  };

  const getNext7DaysTasks = () => {
    return tasks.filter((task) => {
      const today = new Date();
      const next7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return task.dueDate >= today && task.dueDate <= next7Days;
    });
  };

  return (
    <div className="todo-list-container">
      <div className="inbox-section">
        <h3>Inbox</h3>
        <form onSubmit={addTask}>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.task}
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="today-section">
        <h3>Today</h3>
        <ul>
          {getTodaysTasks().map((task, index) => (
            <li key={index}>{task.task}</li>
          ))}
        </ul>
      </div>
      <div className="next7days-section">
        <h3>Next 7 Days</h3>
        <ul>
          {getNext7DaysTasks().map((task, index) => (
            <li key={index}>{task.task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
