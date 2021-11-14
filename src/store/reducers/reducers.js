import { combineReducers } from 'redux';
import auth from 'pages/Auth/reducers';

const createRootReducer = () =>
  combineReducers({
    auth,
  });

export default createRootReducer;
