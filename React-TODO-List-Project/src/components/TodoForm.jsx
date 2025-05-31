import React from "react";
import { motion } from "framer-motion";
import { useState , useEffect } from "react";
import { UseTodo } from "../contexts";
import Confetti from 'js-confetti'

function TodoForm(){
    const {addTodo , todos} = UseTodo();
    const [todo , setTodo] = useState("");
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;
    const jsConfetti = new Confetti();

    const add = (e) => {
        e.preventDefault();
        if(!todo) return 
        addTodo({todo , completed: false})
        setTodo("");
    }

    useEffect(() => {
    if (todos.length > 0 && todos.every(todo => todo.completed)) {
       jsConfetti.addConfetti();
    }
    }, [todos]);

    return (
        <div className="flex flex-col items-center gap-6">
      {/* Animated Gradient Border Layer */}
      <div className="relative rounded-2xl p-[3px] w-80 mr-8">
        <motion.div
          className="absolute inset-0 rounded-2xl z-0"
          animate={{ backgroundPosition: "200% center" }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          style={{
            background: "linear-gradient(270deg, #FF4C29, #FF8800, #00FFFF, #FF4C29)",
            backgroundSize: "200% 200%",
            // filter: "blur(4px)",
            zIndex: 0,
          }}
        ></motion.div>

        {/* Actual Card Content */}
        <div className="relative bg-black rounded-2xl p-6 flex justify-between items-center z-10">
          <div>
            <p className="text-xl font-bold text-white">Todo Done</p>
            <p className="text-sm text-gray-400">keep it up</p>
          </div>

          {/* Right Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            className="w-20 h-20 bg-[#FF4C29] rounded-full flex items-center justify-center text-black font-extrabold text-2xl"
          >
            {completedCount}/{totalCount}
          </motion.div>
        </div>
      </div>

      {/* Input Section */}
      <form onSubmit={add}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex gap-4 mr-2"
      >
        <input
          className="p-3 w-78 outline-none bg-gray-800 rounded-xl ml-4"
          type="text"
          placeholder="write your todo here"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.2, rotate: 20 }}
          whileTap={{ scale: 0.9 }}
          className="flex justify-center items-center w-10 h-10 bg-orange-600 text-black font-extrabold text-xl rounded-full cursor-pointer leading-none mt-1"
        >
          <i className='bx bxs-plus-circle'></i>
        </motion.button>
      </motion.div>
    </form>
    </div>
    );
}

export default TodoForm;