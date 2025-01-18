import { createSlice } from "@reduxjs/toolkit"
import { getRefresh, loginUser, registerUser, logoutUser } from "./UserActions"



const initialState = {
    user: {},
    accessToken: null,
    status: 'idle',
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading"
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = "success"
                state.error = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action?.payload.error ? action?.payload.message : null
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "pending"
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.status = "success"

            })
            .addCase(loginUser.rejected, (state) => {
                state.status = "rejected"
            })
            .addCase(getRefresh.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken
                state.user = action.payload.user
                state.status = "success"
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.accessToken = null
                state.user = null
                state.cart = null
                state.status = "success"

            })
           
    }
})


export const selectUser = state => state.user.user
export const selectToken = state => state.user.accessToken

export default userSlice.reducer