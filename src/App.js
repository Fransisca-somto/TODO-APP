/** @format */

import React, { useState, useEffect } from "react";
import { IoSunny } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { LuSunMoon } from "react-icons/lu";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todo-list")) || []);
  const [newItem, setNewItem] = useState("");
  const [dark, setDark] = useState(true);
  const [all, setAll] = useState([]);
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [items, setItems] = useState([]);
  let id;

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(todos));
    setItems(todos)
  }, [todos]);

  const handleAll = ()=> {
    let listItems = todos;
    setItems(listItems);
  }

  const handleActive = ()=> {
    let listItems = todos.filter(items => items.checked === false);
    setItems(listItems);
  }

  const handleCompleted = ()=> {
    let listItems = todos.filter(items => items.checked === true);
    setItems(listItems);
  }

  const handleClear = () => {
    const listItems = todos.filter((item) => item.checked === false);
    setTodos(listItems);
  }

  // axios.get('/active', ()=> {

  // })

  // axios.get('/completed', ()=> {

  // })

  const handleSubmit = (e, newItem) => {
    e.preventDefault();
    id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    setTodos([...todos, { id, checked: false, todo: newItem }]);
    setNewItem("");
  };

  const handleCheck = (id) => {
    const listItems = todos.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setTodos(listItems);
  };

  const handleDelete = (id) => {
    const listItems = todos.filter((item) => item.id !== id);
    setTodos(listItems);
  };

  const [color, setColor] = useState("")
  const [bgcolor, setBgcolor] = useState("")
  const [mainbgcolor, setMainbgcolor] = useState("")
  const [shadowcolor, setShadowcolor] = useState("")

  const handleMode = ()=> {
    setDark(!dark);
    console.log("Dark mode changed");
    if (dark) {
      setColor("whitesmoke")
      setBgcolor("rgb(10, 10, 10)")
      setShadowcolor("rgb(10, 10, 10)")
      setMainbgcolor("rgb(8, 8, 8)")
    } else {
      setColor("black")
      setBgcolor("#ababab")
      setShadowcolor("rgb(240, 240, 240)")
      setMainbgcolor("#fefefe")
    }
  }

  return (
    <div className="App" style={{backgroundColor: bgcolor, color: color}}>
      <div class="bgs">
        <div></div>
      </div>
      <div class="cgs">
        <div class="headers">
          <p>TO-DO</p>
          <div className="mode">{dark ? <IoSunny onClick={()=>{handleMode()}} /> : <LuSunMoon onClick={()=>{handleMode()}} />}</div>
        </div>
        <div style={{backgroundColor: mainbgcolor, color: color, }}>
          <form onSubmit={(e) => handleSubmit(e, newItem)}>
            <input
              type="text"
              placeholder="Create a new todo..."
              name="item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              style={{borderBottomColor: bgcolor}}
              required
            />
          </form>
        </div>
        <div class="lists" style={{backgroundColor: mainbgcolor, color: color, boxShadow: "0px 0px 3px" + shadowcolor}}>
          <ul>
            {items.map((item) => (
  <li className="item" key={item.id} style={{borderBottom: "1px solid" + color}}>
                
                <label htmlFor={item.id}>
                  <input
                  type="checkbox"
                  onChange={() => handleCheck(item.id)}
                  checked={item.checked}
                  id={item.id}
                />
                  {item.todo}
                </label>
                <MdDeleteForever 
                  onClick={()=> handleDelete(item.id)}
                  className="del"
                />
              </li>
            ))}
          </ul>
          <div className="foot">
            <span style={{color: color}}>{items.length} items left</span>
            <span className="refs">
              <a onClick={() => handleAll()} style={{color: color}}>All</a>
              <a onClick={() => handleActive()} style={{color: color}}>Active</a>
              <a onClick={() => handleCompleted()} style={{color: color}}>Completed</a>
            </span>
            <span><a onClick={() => {handleClear()}} style={{color: color}}>Clear Completed</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
