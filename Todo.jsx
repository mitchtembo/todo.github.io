import React, { useState, useReducer, useEffect } from "react";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //load todos from local storage when component mounts
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodo(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Error parsing saved todos:", error);
        // You might want to reset the localStorage if there's a parsing error
        localStorage.removeItem("todos");
      }
    }
  }, []);
  // Save todos to localStorage whenever the todo state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      const newTodo = { text: inputValue, completed: false };
      setTodo([...todo, newTodo]);
      setInputValue("");
      //   console.log(todo);
    }
  };

  const handleComplete = (index) => {
    setTodo((prevTodo) => {
      return prevTodo.map((item, i) => {
        return i === index ? { ...item, completed: !item.completed } : item;
      });
    });
    // console.log(todo);
  };

  const handleDelete = (index) => {
    setTodo((prevTodo) => {
      return prevTodo.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-purple-500 to-pink-500]">
      <h1 className="font-bold text-4xl text-white mb-8">TodoList</h1>
      <form className="mb-4" action="#" onSubmit={handleSubmit}>
        <input
          className="transparent text-white border-b-2 border-cyan-500 focus:outline-none focus:ring-0 focus:border-b-2 focus:border-cyan-700 bg-transparent mb-6 py-2 px-2 w-96"
          type="text"
          value={inputValue}
          placeholder="Add a new task"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          ADD
        </button>
      </form>

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-white">Todo Items</h2>
        {todo &&
          todo.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex justify-between items-center p-4 mb-4 bg-white rounded-lg shadow-md ${
                  item.completed ? "bg-green-100" : ""
                }`}
              >
                <p
                  className={`text-3xl ${
                    item.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {item.text}
                </p>
                <button
                  className="mr-2 text-white bg-blue-400 py-2 px-4 rounded-md hover:bg-blue-800 transition duration-300"
                  onClick={() => handleComplete(index)}
                >
                  Done
                </button>
                <button
                  className="bg-red-700 py-2 px-4 border-none rounded-md text-white hover:bg-red-800 transition duration-300"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
      <hr />
    </div>
  );
};

export default Todo;
