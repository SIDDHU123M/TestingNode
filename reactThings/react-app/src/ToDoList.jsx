import React, { useState } from "react";
import "./ToDoList.css";

export default function ToDoList() {
  const [Tasks, setTasks] = useState(["Game", "Movie", "Some"]);
  // const [newTask, setNewTask] = useState("")

  function Delete(index) {
    let NewTasks = Tasks.filter((_, i) => i !== index);
    setTasks(NewTasks);
  }

  function Add() {
    let Value = document.getElementById("task");
    Value.value ? setTasks([...Tasks, Value.value]) : ''
    Value.value = "";
  }

 function updateOrder(from, to) {
   if (to >= 0 && to < Tasks.length) {
     const newArr = [...Tasks];
     newArr.splice(to, 0, newArr.splice(from, 1)[0]);
     setTasks(newArr);
   }
 }

  return (
    <div className="container">
      <div className="Inputs">
        <label>Enter Task: </label>
        <div className="type">
          <input type="text" placeholder="Enter Task" id="task" />
          <button onClick={Add}>ADD</button>
        </div>
      </div>

      <ul>
        {Tasks.map((e, i) => (
          <li key={i}>
            {e}
            <section className="Options">
              <button id={i} onClick={() => Delete(i)} className="Delete">
                Delete
              </button>
              <button id={i} onClick={() => updateOrder(i, i-1)}>👆</button>
              <button id={i} onClick={() => updateOrder(i, i+1)}>👇</button>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}
