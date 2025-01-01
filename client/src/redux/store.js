import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import counterReducer from "./features/counterSlice";
import sideBarReducer from "./features/sideBarSlice";
import mentorReducer from "./features/mentorSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        counter: counterReducer,
        sideBar: sideBarReducer,
        mentor: mentorReducer,
    }
})

export default store;