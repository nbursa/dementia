import { combineReducers } from 'redux';
import todoReducer from './todoReducer'; // You need to create this

const rootReducer = combineReducers({
  todos: todoReducer,
});

export default rootReducer;