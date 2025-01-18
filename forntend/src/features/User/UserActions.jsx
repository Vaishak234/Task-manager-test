import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";


export const registerUser = createAsyncThunk('user/registerUser', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('/auth/register', userData);
        return response?.data?.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})



export const loginUser = createAsyncThunk('user/loginUser', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('/auth/login', userData);
        return response?.data?.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})

export const logoutUser = createAsyncThunk('user/logoutUser', async (token, thunkAPI) => {
    try {
        const response = await axios.get('/auth/logout', { withCredentials: true });

        return response?.data?.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})

export const getRefresh = createAsyncThunk('user/getRefresh', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/auth/refresh', { withCredentials: true });
        return response?.data?.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})

