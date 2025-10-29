import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import companyInfoReducer from "./slices/companyInfoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    companyInfo: companyInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
