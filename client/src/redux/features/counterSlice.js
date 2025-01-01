import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    countNumber: 0,
    setSample: '    ',
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.countNumber = state.countNumber + 1
        },
        decrement: (state, action) => {
            state.countNumber = state.countNumber - 1
        },
        saveName: (state, action) => {
            state.setSample = action.payload
        }
    }
})

export const { increment, decrement, saveName } = counterSlice.actions
const counterReducer = counterSlice.reducer
export default counterReducer