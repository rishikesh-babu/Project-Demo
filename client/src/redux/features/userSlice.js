import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isUserAuth: false,
    userData: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUserData: (state, action) => {
            // debugger
            state.isUserAuth = true
            state.userData = action.payload
        },
        clearUserData: (state, action) => {
            state.isUserAuth = false
            state.userData = {}
        },
    }
})

export const { saveUserData, clearUserData } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer