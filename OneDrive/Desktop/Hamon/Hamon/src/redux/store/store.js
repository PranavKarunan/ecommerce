import { configureStore } from "@reduxjs/toolkit";
import menuReducer from '../reducer/reducer'

export const store = configureStore({
    reducer: {
        menu: menuReducer
    }
})