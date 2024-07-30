import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import modalsReducer from "./modalsSlice";

export const store = configureStore({
  reducer: {
    tasksReducer: tasksReducer,
    modalsReducer: modalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;