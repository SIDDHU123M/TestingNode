import { useState } from "react";
import List from "./List.jsx"

function Button() {

  let [count, setCount] = useState(0)
  function increment() {
    setCount(count+1)
  }

  return (
  <button onClick={increment}>Clicked {count} times</button>
)
}

export default function App() {
  let items = [{name: "Python", Ext: ".py"}, {name: "JavaScript", Ext: ".js"}, {name: "TypeScript", Ext: ".ts"}];
  return (
    <>
      <List items={items} heading="Programing Languages"/>
      <Button/>
      <Button/>
    </>
  );
}

