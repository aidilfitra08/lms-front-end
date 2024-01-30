import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { userReducer } from "./Credential/UserReducer";
import { studentReducer } from "./Student/StudentReducer";
import { createCourseReducer } from "./Lecture/LectureReducer";

const rootReducer = combineReducers({
  user: userReducer,
  student: studentReducer,
  lecture: createCourseReducer,
});
const Store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
});
export default Store;
