import { combineReducers } from 'redux';
import picReducer from "./picReducer.js";

export default combineReducers({
  pics: picReducer
});
