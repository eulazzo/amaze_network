import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";
import errorReducer from "./errors.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  errorReducer,
});
