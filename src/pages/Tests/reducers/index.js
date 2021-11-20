import { combineReducers } from 'redux';
import testsReducer from './tests.reducer';
import categoriesReducer from './categories.reducer';

export default combineReducers({
  tests: testsReducer,
  categories: categoriesReducer,
});
