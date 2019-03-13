import { combineReducers } from 'redux';
import picReducer from "./picReducer.js";
import navigationReducer from "./navigationReducer.js";
import backtohomeReducer from "./backtohomeReducer.js";
import userReducer from './userReducer.js';


export default combineReducers({
  pics: picReducer, 
  tags: navigationReducer,
  tohome: backtohomeReducer,
  users: userReducer
});
