import { combineReducers } from 'redux';
import auth from 'pages/Auth/reducers';
import testsRoot from 'pages/Tests/reducers';

const createRootReducer = () =>
  combineReducers({
    auth,
    testsRoot,
  });

export default createRootReducer;
