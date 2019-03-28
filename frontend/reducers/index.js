import { combineReducers } from 'redux';
import picReducer from "./picReducer.js";
import navigationReducer from "./navigationReducer.js";
import backtohomeReducer from "./backtohomeReducer.js";
import userReducer from './userReducer.js';
import recipeReducer from './recipeReducer.js';
import tokenReducer from './tokenReducer.js';


export default combineReducers({
  pics: picReducer,
  tags: navigationReducer,
  recipes: recipeReducer,
  tohome: backtohomeReducer,
  users: userReducer,
  token: tokenReducer
});
