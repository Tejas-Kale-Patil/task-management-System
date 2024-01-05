import { configureStore } from "@reduxjs/toolkit";
import tableReducer from './slice'

export const store = configureStore({
    reducer:{
        table:tableReducer
    },
})