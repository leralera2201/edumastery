import { combineReducers } from 'redux';
import loginReducer from 'pages/Login/reducers';

const createRootReducer = () =>
  combineReducers({
    login: loginReducer,
  });

export default createRootReducer;
