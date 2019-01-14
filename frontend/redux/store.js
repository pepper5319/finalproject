import {createStore, combineReducers,applyMiddleware} from "redux";
import mathReducer from "./reducers/mathReducer";
import ReduxThunk from 'redux-thunk';

const store = createStore(combineReducers({mathReducer }));
export default store;
