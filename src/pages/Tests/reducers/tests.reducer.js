import { ACTION_STATUS } from 'constants';
import { TESTS_ACTION_TYPES } from '../actionTypes/tests.actionTypes';

const initialState = {
  data: {
    total: 0,
    items: [],
  },
  status: ACTION_STATUS.NOT_STARTED,
  filter: {
    pageSize: 20,
    page: 1,
  },
  error: null,
};

const testsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TESTS_ACTION_TYPES.FETCH_TESTS.IN_PROGRESS:
      return {
        ...state,
        status: ACTION_STATUS.IN_PROGRESS,
        error: null,
      };
    case TESTS_ACTION_TYPES.FETCH_TESTS.SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        filter: {
          ...state.filter,
          ...action.payload.params,
        },
        status: ACTION_STATUS.SUCCESS,
        error: null,
      };
    case TESTS_ACTION_TYPES.FETCH_TESTS.ERROR:
      return {
        ...state,
        status: ACTION_STATUS.ERROR,
        error: action.payload,
      };
    //////////////////////////////////////////
    case TESTS_ACTION_TYPES.FILTER_TESTS:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload.data,
        },
      };
    default:
      return state;
  }
};

export default testsReducer;
