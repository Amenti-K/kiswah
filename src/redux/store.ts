import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bootstrapReducer from "./slices/bootstrapSlice";

const store = configureStore({
  reducer: {
    adminAuth: authReducer,
    bootstrap: bootstrapReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
