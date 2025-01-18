// TaskSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    status: 'idle',
    error: null,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setAllTasks: (state, action) => {
            state.tasks = action.payload;
        },
        addTask: (state, action) => {
            
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            console.log(action.payload);
            
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask: (state, action) => {
            
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
        }
    },
});

export const { setAllTasks, addTask, updateTask, deleteTask } = taskSlice.actions;
export const selectAllTasks = (state) => state.tasks.tasks;

export default taskSlice.reducer;