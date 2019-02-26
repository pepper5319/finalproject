import { combineReducers } from 'redux';
import picReducer from "./picReducer.js";
import navigationReducer from "./navigationReducer.js";


export default combineReducers({
  pics: picReducer, 
  tags: navigationReducer
});
