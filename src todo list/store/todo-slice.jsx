import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

const BASE_URL = 'https://my-shopping-app-dfa7b-default-rtdb.firebaseio.com';
export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todos.json`); 
      return { todos: response.data };
    } catch (error) {
      throw error;
    }
  }
);


export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/todos.json`, {
        title: payload.title,
        completed: false, // Set your initial value
      });
      return { todo: { id: response.data.name, ...payload } };
    } catch (error) {
      throw error;
    }
  }
);
export const toggleCompleteAsync = createAsyncThunk(
  'todos/completeTodoAsync',
  async (payload) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/todos/${payload.id}.json`,
        {
          completed: payload.completed,
        }
      );
      return { todo: { id: payload.id, ...response.data } };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload) => {
    try {
      await axios.delete(`${BASE_URL}/todos/${payload.id}.json`);
      return { id: payload.id };
    } catch (error) {
      throw error;
    }
  }
);
export const editTodoAsync = createAsyncThunk(
    'todos/editTodoAsync',
    async (payload) => {
        try {
       
        const response = await axios.patch(
        `${BASE_URL}/todos/${payload.id}.json`,
        {
          title: payload.title,
        }
          
      );
      return { todo: { id: payload.id, ...response.data } };
        }catch(error) {
            throw error
        }

    }
)






const todoSlice = createSlice ({
    name :"Todo",
    initialState : [
        {id:1, title: 'todo1', completed : true,},
    {id:2, title: 'todo2', completed : true},
     {id:3, title: 'todo3', completed : false},
         ],
    reducers: {
        addTodo : (state, action) =>{
           const newTask = {
            id: uuidv4(),
           title: action.payload.title,
            completed : false,
           }
           state.push(newTask)
        },
         toggleComplete : (state, action ) =>{
     const index = state.findIndex((todo) => todo.id === action.payload.id);
     state[index].completed = action.payload.completed
  },
  deleteTodo : (state, action) => {
   return state.filter((todo) => todo.id !== action.payload.id)
  },
  clearTodo : (state,action) => {
    return state = []
  },
  editTodo : (state, action) => {
    const taskToEdit = state.find((todo) => todo.id === action.payload.id)
    if(taskToEdit){
        taskToEdit.title = action.payload.title
    }
  }
    },
  extraReducers :{
    [getTodosAsync.fulfilled] : (state, action) =>{
        return action.payload.todos;
    },
     [addTodoAsync.fulfilled] : (state, action) =>{
        state.push(action.payload.todo)
    },
     [toggleCompleteAsync.fulfilled]: (state, action) => {
    const index = state.findIndex((todo) => todo.id === action.payload.todo.id);
    state[index].completed = action.payload.todo.completed;
  },
  [deleteTodoAsync.fulfilled]: (state, action) => {
    return state.filter((todo) => todo.id !== action.payload.id);
  },
   [editTodoAsync.fulfilled]: (state, action) => {
   const taskToEdit = state.find((todo) => todo.id === action.payload.id)
    if(taskToEdit){
        taskToEdit.title = action.payload.title
         taskToEdit.completed = action.payload.completed;
    }
  },
  }
  
});
export const todoActions = todoSlice.actions;
export default todoSlice;