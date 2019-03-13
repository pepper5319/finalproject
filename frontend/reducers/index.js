import { combineReducers } from 'redux';
import picReducer from "./picReducer.js";
import navigationReducer from "./navigationReducer.js";
import userReducer from './userReducer.js';
import recipeReducer from './recipeReducer.js';


export default combineReducers({
  pics: picReducer,
  tags: navigationReducer,
  users: userReducer,
  recipes: recipeReducer
});
