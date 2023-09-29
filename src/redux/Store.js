import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { userReducer } from "./Credential/UserReducer";
import { courseReducer } from "./Student/StudentReducer";

const rootReducer = combineReducers({
  user: userReducer,
  studentCourse: courseReducer,
});
const Store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
});
export default Store;
