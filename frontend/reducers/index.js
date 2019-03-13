import { combineReducers } from 'redux';
import picReducer from "./picReducer.js";
import navigationReducer from "./navigationReducer.js";
import backtohomeReducer from "./backtohomeReducer.js";


export default combineReducers({
  pics: picReducer, 
  tags: navigationReducer,
  tohome: backtohomeReducer,
});
