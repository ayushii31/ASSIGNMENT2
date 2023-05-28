import React, { useEffect, useState } from "react";
import { useLongPress } from "use-long-press";

const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}

const App = () => {
  const [inputList, setInputList] = useState("");
  const [Items, setItems] = useState(getLocalItems);
  const itemEvemt = (event) => {
  setInputList(event.target.value);
  };

  const listOfItems = () => {
    setItems((oldItems) => {
      return [...oldItems,
        { text: inputList,  id: Date.now(),  timeStamp: new Date().toISOString(),  done :false }
      ];
    });
    setInputList("");
  };

  const checked = (id) => {
    setItems(
      Items.map((itemval) => {
        if (itemval.id === id) {
          return { ...itemval, done: !itemval.done };
        }
        return itemval;
      })
    );
  };

  const handleDeleteTask = (id) => {
    setItems(Items.filter((itemval) => itemval.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(Items))
  }, [Items]);
  

  return (
    <>
      <div className="main_div">
       
        <div className="center_div" >
          <br />
          <h1> Tasks TODO </h1>
          <br />
          <input
            type="text"
            placeholder="What's your task today?"
            value={inputList}
            onChange={itemEvemt}
          />
          <button onClick={listOfItems}> + </button>  
            {Items.map((itemval) => {
              return (
              
                  <div className="todo_style">
                    <input type="checkbox" name="" id="checkbox"  onClick={() => checked(itemval.id)} />
                    <li key={itemval.id} className="list_items" >
                        <div className="timestamp">
                         Timestamp: {itemval.timeStamp}  
                        </div>
                      <div className="text">
                        Task: {itemval.text}
                      </div>
                      <div >
                       Status: { (itemval.done)  ? 'complete' : 'incomplete'}
                      </div>
                      <button className="deleteitem" onClick={() => handleDeleteTask(itemval.id)} >undo</button>
                      <hr />
                    </li>
                  </div>
                );
            })}
        </div>
      </div>
    </>
  );
};

export default App;
