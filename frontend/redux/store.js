import {createStore, combineReducers,applyMiddleware} from "redux";
import mathReducer from "./reducers/mathReducer";
import ReduxThunk from 'redux-thunk'

export default createStore(
    combineReducers({
        mathReducer  
    }),
    {},
    applyMiddleware(ReduxThunk)
    );