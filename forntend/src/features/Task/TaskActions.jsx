import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosPrivate} from '../../axios/axiosPrivate'
 
export const getAllTasks = createAsyncThunk('cart/getAllTasks', async (thunkAPI) => {
    try {
        const response = await axiosPrivate.get('/task');
        console.log(response);

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})



// export const getTasks = createAsyncThunk('user/getTasks', async (_, thunkAPI) => {
//     try {
//         const response = await axios.get('/task');
//         return response?.data?.data
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
// })

// export const updateTask = createAsyncThunk('user/updateTask', async (taskData, thunkAPI) => {
//     try {
//         const response = await axios.post('/task', taskData);
//         return response?.data?.data
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
// })

// export const deleteTask = createAsyncThunk('user/deleteTask', async (id, thunkAPI) => {
//     try {
//         const response = await axios.delete('/task/'+id);
//         return response?.data?.data
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
// })
