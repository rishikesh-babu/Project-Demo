import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggleSideBar: true
}

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        changeSideBar: (state, action) => {
            state.toggleSideBar = !state.toggleSideBar
        }
    }
})

export const { changeSideBar } = sideBarSlice.actions;
const sideBarReducer = sideBarSlice.reducer
export default sideBarReducer