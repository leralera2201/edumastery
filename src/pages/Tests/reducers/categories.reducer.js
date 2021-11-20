import { ACTION_STATUS } from 'constants';
import { CATEGORIES_ACTION_TYPES } from '../actionTypes/categories.actionTypes';

const initialState = {
  data: [],
  status: ACTION_STATUS.NOT_STARTED,
  error: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEFORIES.IN_PROGRESS:
      return {
        ...state,
        status: ACTION_STATUS.IN_PROGRESS,
        error: null,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEFORIES.SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        status: ACTION_STATUS.SUCCESS,
        error: null,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEFORIES.ERROR:
      return {
        ...state,
        status: ACTION_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
