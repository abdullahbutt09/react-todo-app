import { useState , useEffect } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

function App() {

  const [todos , setTodo] = useState([]);

  // const addTodo = (todo) => {
  //   setTodo((prev) => [...prev , {id: Date.now() , ...todo}])
  // }

  const addTodo = (todo) => {
  setTodo((prev) => [...prev, { id: Date.now(), ...todo }]);
}


  const updateTodo = (id , todo) => {
    setTodo((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((todo) => todo.id != id))
  }

  const toggleComplete = (id) => {
    setTodo((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo , completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if(todos && todos.length > 0){
      setTodo(todos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  } , [todos])

  return (
    <TodoProvider value={{todos , updateTodo , deleteTodo , toggleComplete , addTodo}}>
    {/* <div className="flex flex-col justify-center items-center h-screen text-white gap-5">
        <TodoForm/>
    <div className="flex flex-col gap-3">
      {todos.map((todo) => (
          <div key={todo.id} className="">
            <TodoItem todo={todo}/>
          </div>
        ))}
    </div>
  </div> */}

  <div className="flex flex-col items-center gap-6 text-white mt-10 flex-wrap">
  <TodoForm /> {/* stays at the top */}

  <div className="flex flex-col gap-4 w-auto items-center flex-wrap">
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </div>
</div>

    </TodoProvider>
  );
}

export default App;