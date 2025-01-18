import { configureStore } from "@reduxjs/toolkit"
import userReducer from './User/UserSlice'
import taskReducer from './Task/TaskSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        tasks:taskReducer
    }
});


export default store;


