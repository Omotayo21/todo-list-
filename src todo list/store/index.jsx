import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo-slice";



const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
      
    },
});

export default store;