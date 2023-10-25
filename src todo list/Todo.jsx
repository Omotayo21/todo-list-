import { useState, useMemo, useEffect } from "react";

import { getTodosAsync, todoActions } from "./store/todo-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Todoitem from "./todoitem.jsx";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
//import { addTodoAsync } from "./store/todo-slice";

function Todo(){
    const dispatch = useDispatch();
    const todoList = useSelector((state) => state.todos);
const [Input, setInput] = useState("");
  console.log(todoList)
    //const completedTaskCount = useSelector((state) => state.todos.filter((todo) => todo.completed === true));
  const completedTaskCount = useMemo(() => {
  if (todoList) {
    return todoList.filter((todo) => todo.completed === true);
  }
  return [];
}, [todoList]);

       const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(todoActions.addTodo ({
            title:Input,
        }));
        setInput("");
        toast.success ('item added sucesfully')
       };
  
    const handleClear = () => {
    dispatch(todoActions.clearTodo())
   };

useEffect(()=> {
    dispatch(getTodosAsync())
}, [dispatch]);



return(
    <>
     <ToastContainer 
        theme="dark" 
        position="top-right"
        autoClose={1000}
        closeOnClick
        pauseOnHover={false}/>
    <div className = "text-center w-full" >
       
     <div>
        <h2 className="text-blue-700 font-bold text-8xl">Todo list</h2>
       <form onSubmit={onFormSubmit}> 
       <input className=" bg-gray-200 border-2 place-items-center border-black rounded text-black w-64 mt-12 h-12 focus:outline-none"
        placeholder="Enter a task..."value={Input} required onInput ={(e) => setInput(e.target.value)}/>
        <button className="bg-blue-700 border-2 border-black text-red-500 h-12  w-12 rounded " type="submit">Add</button> <br/></form>
        <div>
            <div>
                
                <b className="ml-2.5">Pending tasks </b>: {todoList.length - (completedTaskCount ? completedTaskCount.length : 0)}

            </div>
            <div>
                <b className="ml-2.5">Completed tasks : </b>{completedTaskCount.length}
            </div>
</div>
<div>
    <ul className="text-black font-mono mt-12 font-bold text-1xl cursor-pointer flex flex-col  list-inside" >
           {todoList.map((todo) => (
           <Todoitem id={todo.id} title={todo.title} completed={todo.completed} />
           ))}
    </ul>
</div>
       <button className="bg-purple-700 border-2 border-white-500 text-white h-16 w-2/12 rounded-2xl mt-12 " onClick={handleClear}>Clear all</button>
     </div>


    </div>
    </>
);



   
    
  
   

};



export default Todo;


