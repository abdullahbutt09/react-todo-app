import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { UseTodo } from "../contexts";

function TodoItem({ todo }) {
    
    const {updateTodo , deleteTodo , toggleComplete} = UseTodo();
    const [todoMsg , setTodoMsg] = useState(todo.todo);
    const [todoEditable , setTodoEditable] = useState(false);

    const editTodo = () => {
        updateTodo(todo.id , {...todo , todo: todoMsg})
        setTodoEditable(false);
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    }

    return (
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="flex flex-col flex-wrap ">
          <div className="w-auto rounded-xl p-4 bg-gray-800 flex items-center gap-3">
            <input
              className="w-6 h-6 appearance-none rounded-full border-2 border-red-600 checked:bg-green-500 checked:border-none checked:line-through" type="checkbox" name="" id=""
              checked={todo.completed}
              onChange={toggleCompleted} 
            />
            <input
                type="text"
                className={`border outline-none bg-transparent rounded-lg ${
                    todoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through text-gray-500" : ""}`}
                value={todoMsg}
                 onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!todoEditable}
            />
            <div className="flex gap-3">
              < i 
              onClick={() => {
                if(todo.completed) return;
                
                if(todoEditable){
                    editTodo();
                } else {
                    setTodoEditable((prev) => !prev);
                }
              }}
              className='bx bxs-pencil cursor-pointer text-2xl hover:text-green-600'  ></i>
              < i 
              onClick={() => deleteTodo(todo.id)}
              className='bx bxs-trash cursor-pointer text-2xl hover:text-red-600'  ></i>
            </div>
          </div>
        </div>
      </motion.div>
    );
}

export default TodoItem;