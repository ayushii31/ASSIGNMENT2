import React, { useState, useEffect } from "react";
import "./index.css";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function AppTodo() {
  const [inputList, setInputList] = useState("");
  const [Items, setItems] = useState(getLocalItems);

  const listOfItems = () => {
    setItems((oldItems) => {
      return [
        ...oldItems,
        {
          text: inputList,
          id: new Date().toISOString(),

          done: false,
        },
      ];
    });
    setInputList("");
  };

  const checked = (id, newvalue) => {
    setItems(
      Items.map((item) => {
        if (item.id === id) {
          return { ...item, done: newvalue };
        }
        return item;
      })
    );
  };

  const handleDeleteTask = (id) => {
    setItems(Items.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(Items));
  }, [Items]);

  const listItems = Items.map((item) => (
    <div
      className="flex flex-row justify-left bg-gray-200 border border-gray-300 mx-8 mb-6 h-16 capitalize"
      key={item.id}
    >
      <div className="">
        <input
          className="mt-5 ml-5"
          type="checkbox"
          defaultChecked={item.done}
          onChange={(e) => checked(item.id, e.target.value)}
        />
      </div>
      <div className="flex items-start ml-10 mt-4">
        <div className=""> {item.text}</div>
        <div className="grid justify-items-end">
          <button
            className="bg-cyan-300 border-none text-inherit text-[16px] hover:bg-emerald-800 w-5 ml-10 "
            onClick={() => handleDeleteTask(item.id)}
          >
            x
          </button>
        </div>

        <hr />
      </div>
    </div>
  ));

  return (
    <div className="w-full h-screen bg-blue-200 flex flex-row justify-center pt-30 text-gray-700">
      <div className="w-2/5 h-5/6 bg-white items-left mt-8">
        <br />
        <div className="text-gray-700 bg-transparent py-2 mb-10 font-bold text-lg pl-8 tracking-wide">
          <h1> Tasks TODO </h1>
        </div>
        <br />

        <input
          className="text-center h-10 border-2 border-blue-400 bg-transparent text-base font-medium w-4/5 ml-8 mb-4"
          type="text"
          placeholder="What's your task today?"
          value={inputList}
          onChange={(e) => setInputList(e.target.value)}
        />

        <button
          className="h-10 w-[50px] border-2 border-blue-400 outline-none font-sans text-blue-400 font-light bg-slate-700 "
          onClick={listOfItems}
        >
          Add
        </button>
        {listItems}
      </div>
    </div>
  );
}

export default function App() {
  return <AppTodo />;
}
