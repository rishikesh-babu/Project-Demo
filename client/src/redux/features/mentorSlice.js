import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isMentorAuth: true,
    mentorData: {},
}

const mentorSlice = createSlice({
    name: 'mentor', 
    initialState,
    reducers: {
        saveMentorData: (state, action) => {
            state.isMentorAuth = true
            state.mentorData = action.payload
        },
        clearMentorData: (state, action) => {
            state.isMentorAuth = false
            state.mentorData = {}
        },
    }
})

export const { saveMentorData, clearMentorData } = mentorSlice.actions
const mentorReducer = mentorSlice.reducer
export default mentorReducer