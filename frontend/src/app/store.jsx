import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "../app/feature/employeeSlice";

const store = configureStore({
  reducer: {
    employeeKey: employeeSlice,
  },
});

export default store;