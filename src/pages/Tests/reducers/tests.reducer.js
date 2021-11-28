import { ACTION_STATUS } from 'constants';
import { TESTS_ACTION_TYPES } from '../actionTypes/tests.actionTypes';

const initialState = {
  list: {
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
  },
  mark: {
    data: null,
    status: ACTION_STATUS.NOT_STARTED,
    error: null,
  },
  completedList: {
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
  },
  testResult: {
    status: ACTION_STATUS.NOT_STARTED,
    error: null,
  },
};

const testsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TESTS_ACTION_TYPES.FETCH_TESTS.IN_PROGRESS:
      return {
        ...state,
        list: {
          ...state.list,
          status: ACTION_STATUS.IN_PROGRESS,
          error: null,
        },
      };
    case TESTS_ACTION_TYPES.FETCH_TESTS.SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: action.payload.data,
          filter: {
            ...state.list.filter,
            ...action.payload.params,
          },
          status: ACTION_STATUS.SUCCESS,
          error: null,
        },
      };
    case TESTS_ACTION_TYPES.FETCH_TESTS.ERROR:
      return {
        ...state,
        list: {
          ...state.list,
          status: ACTION_STATUS.ERROR,
          error: action.payload,
        },
      };
    //////////////////////////////////////////
    case TESTS_ACTION_TYPES.FETCH_MARK.IN_PROGRESS:
      return {
        ...state,
        mark: {
          ...state.mark,
          status: ACTION_STATUS.IN_PROGRESS,
          error: null,
        },
      };
    case TESTS_ACTION_TYPES.FETCH_MARK.SUCCESS:
      return {
        ...state,
        mark: {
          ...state.mark,
          data: action.payload.data,
          status: ACTION_STATUS.SUCCESS,
          error: null,
        },
      };
    case TESTS_ACTION_TYPES.FETCH_MARK.ERROR:
      return {
        ...state,
        mark: {
          ...state.mark,
          status: ACTION_STATUS.ERROR,
          error: action.payload,
        },
      };
    //////////////////////////////////////////
    case TESTS_ACTION_TYPES.FETCH_COMPLETED_TESTS.IN_PROGRESS:
      return {
        ...state,
        completedList: {
          ...state.completedList,
          status: ACTION_STATUS.IN_PROGRESS,
          error: null,
        },
      };
    case TESTS_ACTION_TYPES.FETCH_COMPLETED_TESTS.SUCCESS:
      return {
        ...state,
        completedList: {
          ...state.completedList,
          data: action.payload.data,
          filter: {
            ...state.completedList.filter,
            ...action.payload.params,
          },
          status: ACTION_STATUS.SUCCESS,
          error: null,
        },
      };
    case TESTS_ACTION_TYPES.FETCH_COMPLETED_TESTS.ERROR:
      return {
        ...state,
        completedList: {
          ...state.completedList,
          status: ACTION_STATUS.ERROR,
          error: action.payload,
        },
      };
    //////////////////////////////////////////
    case TESTS_ACTION_TYPES.FILTER_TESTS:
      return {
        ...state,
        list: {
          ...state.list,
          filter: {
            ...state.list.filter,
            ...action.payload.data,
          },
        },
      };
    //////////////////////////////////////////
    case TESTS_ACTION_TYPES.FILTER_COMPLETED_TESTS:
      return {
        ...state,
        completedList: {
          ...state.completedList,
          filter: {
            ...state.completedList.filter,
            ...action.payload.data,
          },
        },
      };
    //////////////////////////////////////////
    case TESTS_ACTION_TYPES.CREATE_TEST_RESULT.IN_PROGRESS:
      return {
        ...state,
        testResult: {
          ...state.testResult,
          status: ACTION_STATUS.IN_PROGRESS,
          error: null,
        },
      };
    case TESTS_ACTION_TYPES.CREATE_TEST_RESULT.SUCCESS:
      return {
        ...state,
        testResult: {
          ...state.testResult,
          status: ACTION_STATUS.SUCCESS,
          error: null,
        },
      };
    case TESTS_ACTION_TYPES.CREATE_TEST_RESULT.ERROR:
      return {
        ...state,
        testResult: {
          ...state.testResult,
          status: ACTION_STATUS.ERROR,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default testsReducer;
