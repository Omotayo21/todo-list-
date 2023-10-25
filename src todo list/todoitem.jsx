import React, { useState, useRef } from 'react';
import {Trash} from 'phosphor-react';
import { useDispatch } from 'react-redux';

import { todoActions } from './store/todo-slice';


const Todoitem = ({id, title, completed}) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(title);
     const inputRef = useRef();

      const handleComplete = () => {
      dispatch(todoActions.toggleCompleteAsync({
        id: id, completed: !completed,
      }));
    
    } 

 const handleDelete = () => {
   dispatch(todoActions.deleteTodoAsync({id : id}))
 }
 const handleEdit = () =>{
    setIsEditing(true);
 };
 const handleSave = () =>{
    setIsEditing(false)
    dispatch(todoActions.editTodoAsync({id, title:editedTask}));
    title = {editedTask}
    
 }
  return(
    <>
    <div className='flex flex-col items-center'>
        <li className='  bg-transparent border-2  border-blue-500 rounded text-black   sm:w-72 lg:w-3/12 mt-12 h-16'> 
        {isEditing ? (
            <div>
                <input 
                type='text'
                ref = {inputRef}
                value ={ editedTask}
                onChange={(e)  => setEditedTask(e.target.value)} />
                <button className=' text-white bg-blue-700 h-8 w-12'onClick={handleSave} > save </button>
            </div>
        ): ( <div>
           
             <div   
         style = {{ textDecoration: completed && "line-through",color: completed && "gray"}}
         className="  focus:outline-none flex flex-row items-start" onChange={(event) => event.preventDefault}>{title}</div>
       
    <div className=" lg:ml-48 sm:ml-36 space-x-4 -mt-4 inline-block ">
        < input type="checkbox" checked={completed} onChange={handleComplete} /> 
        <button className=' text-white bg-blue-700 h-6 w-12 'onClick={handleEdit} > Edit</button>
        <button onClick={handleDelete} className='bg-red-500 text-white  h-12 '> < Trash size={28} /></button>
    </div>
    </div>)}
       
        </li>
        </div></>
            );
}

export default Todoitem;
