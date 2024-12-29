import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList.jsx";
import "./App.css";

// function Counter() {
//   let [Count, setCount] = useState(0);
//   return (
//     <>
//       <div className="flex">
//         <h3>Counter : {Count}</h3>
//         <div className="Button">
//           <button onClick={() => setCount(Count + 1)}>+</button>
//           <button onClick={() => setCount(0)}>Reset</button>
//           <button onClick={() => setCount(Count - 1)}>-</button>
//         </div>
//       </div>
//     </>
//   );
// }

// function ColorPicker() {
//   const [color, setColor] = useState('#FFFFFF')

//   return (<div className="colorPicker">
//     <h3>Color Picker</h3>
//     <div className="colorDIV" style={{backgroundColor: color}}> Selected Color: {color}</div>

//     <label>Select Color </label>
//     <input type="color" onChange={(e) => setColor(e.target.value)}/>
//   </div>)
// }

// function Foods() {
//   const [Food, setFood] = useState(['Apple', 'Banana', 'Mango'])

//   return(<>
//   <h3>Food Listing</h3>
//     <ul>
//       {Food.map((element, index) => <li key={index} onClick={() => {
//         setFood(Food.filter((_,i) => i !== index) )
//       }}>{element}</li>)}
//     </ul>
//     <input type="text" id='addFood'/>
//     <button onClick={() => {
//       let value = document.getElementById('addFood').value
//       document.getElementById("addFood").value = '';
//       setFood(() => [...Food, value])
//       }}>Add</button>
//   </>)
// }

export default function App() {
  return (
    <>
      <ToDoList />
    </>
  );
}
