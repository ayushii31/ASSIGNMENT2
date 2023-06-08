import React, { useState, useEffect } from 'react';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
import './index.css'
import './Todo.css'

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    console.log(list);
  
    if (list) {
      return JSON.parse(localStorage.getItem('lists'));
    } else {
      return [];
    }
  }

function AppTodo () {
    const [inputList, setInputList] = useState("");
    const [Items, setItems] = useState(getLocalItems);

    const listOfItems = () => {
        setItems((oldItems) => {
          return [...oldItems,
            { text: inputList, id: new Date().toISOString(), timeStamp: new Date().toISOString(), done: false }
          ];
        });
        setInputList("");
      };
    
      const checked = (id) => {
        setItems(
          Items.map((item) => {
            if (item.id === id) {
              return { ...item, done: !item.done };
            }
            return item;
          })
        );
      };
    
      const handleDeleteTask = (id) => {
        setItems(Items.filter((item) => item.id !== id));
      };

      useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(Items))
      }, [Items]);
    

      const listItems = Items.map(item =>
        <div className="todo_style">
                <input type="checkbox" name="" id="checkbox" onClick={() => checked(item.id)} />
                <li key={item.id} className="list_items" >
                  <div className="timestamp">
                    Timestamp: {item.timeStamp}
                  </div>
                  <div className="text">
                    Task: {item.text}
                  </div>
                  <div>
                    Status: {(item.done) ? 'complete' : 'incomplete'}
                  </div>
                  <button className="btn"  onClick={() => handleDeleteTask(item.id)}><i class="fa fa-close"></i> x</button>
                  <hr />
                </li>
              </div>
           );
    

  return(
    <div className="main_div">
        <div className="center_div">
            <br />
            <h1> Tasks TODO </h1>
            <br />
        <input
            type="text"
            placeholder="What's your task today?"
            value={inputList}
            onChange={(e) => 
            setInputList(e.target.value)}/> 
            <button onClick={listOfItems}> Add </button>
            {listItems}
        </div>
        
      </div>
    );
 }

 export default function App() {
    return <AppTodo />;
  }
  