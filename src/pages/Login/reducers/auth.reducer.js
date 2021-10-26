import { ACTION_STATUS } from 'constants';
import { AUTH_ACTION_TYPES } from '../actionTypes/auth.actionTypes';

const initialState = {
  data: null,
  status: ACTION_STATUS.NOT_STARTED,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOGIN_USER.IN_PROGRESS:
      return {
        ...state,
        status: ACTION_STATUS.IN_PROGRESS,
      };
    case AUTH_ACTION_TYPES.LOGIN_USER.SUCCESS:
      return {
        ...state,
        data: action.payload,
        status: ACTION_STATUS.SUCCESS,
      };
    case AUTH_ACTION_TYPES.LOGIN_USER.ERROR:
      return {
        ...state,
        status: ACTION_STATUS.ERROR,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
