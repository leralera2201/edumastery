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
        error: null,
      };
    case AUTH_ACTION_TYPES.LOGIN_USER.SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        status: ACTION_STATUS.SUCCESS,
        error: null,
      };
    case AUTH_ACTION_TYPES.LOGIN_USER.ERROR:
      return {
        ...state,
        status: ACTION_STATUS.ERROR,
        error: action.payload,
      };
    //////////////////////////////////////////
    case AUTH_ACTION_TYPES.REGISTER.IN_PROGRESS:
      return {
        ...state,
        status: ACTION_STATUS.IN_PROGRESS,
        error: null,
      };
    case AUTH_ACTION_TYPES.REGISTER.SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        status: ACTION_STATUS.SUCCESS,
        error: null,
      };
    case AUTH_ACTION_TYPES.REGISTER.ERROR:
      return {
        ...state,
        status: ACTION_STATUS.ERROR,
        error: action.payload,
      };
    case AUTH_ACTION_TYPES.RESET:
      return {
        ...state,
        status: ACTION_STATUS.NOT_STARTED,
        error: null,
      };
    //////////////////////////////////////////
    case AUTH_ACTION_TYPES.FORGOT_PASSWORD.IN_PROGRESS:
      return {
        ...state,
        status: ACTION_STATUS.IN_PROGRESS,
        error: null,
      };
    case AUTH_ACTION_TYPES.FORGOT_PASSWORD.SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        status: ACTION_STATUS.SUCCESS,
        error: null,
      };
    case AUTH_ACTION_TYPES.FORGOT_PASSWORD.ERROR:
      return {
        ...state,
        status: ACTION_STATUS.ERROR,
        error: action.payload,
      };
    //////////////////////////////////////////
    case AUTH_ACTION_TYPES.SET_PASSWORD.IN_PROGRESS:
      return {
        ...state,
        status: ACTION_STATUS.IN_PROGRESS,
        error: null,
      };
    case AUTH_ACTION_TYPES.SET_PASSWORD.SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        status: ACTION_STATUS.SUCCESS,
        error: null,
      };
    case AUTH_ACTION_TYPES.SET_PASSWORD.ERROR:
      return {
        ...state,
        status: ACTION_STATUS.ERROR,
        error: action.payload,
      };
    //////////////////////////////////////////
    case AUTH_ACTION_TYPES.UPDATE_ACCOUNT.IN_PROGRESS:
      return {
        ...state,
        status: ACTION_STATUS.IN_PROGRESS,
        error: null,
      };
    case AUTH_ACTION_TYPES.UPDATE_ACCOUNT.SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
        },
        error: null,
        status: ACTION_STATUS.SUCCESS,
      };
    case AUTH_ACTION_TYPES.UPDATE_ACCOUNT.ERROR:
      return {
        ...state,
        status: ACTION_STATUS.ERROR,
        error: action.payload,
      };
    //////////////////////////////////////////
    case AUTH_ACTION_TYPES.FETCH_ACCOUNT.IN_PROGRESS:
      return {
        ...state,
        status: ACTION_STATUS.IN_PROGRESS,
        error: null,
      };
    case AUTH_ACTION_TYPES.FETCH_ACCOUNT.SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
        },
        error: null,
        status: ACTION_STATUS.SUCCESS,
      };
    case AUTH_ACTION_TYPES.FETCH_ACCOUNT.ERROR:
      return {
        ...state,
        status: ACTION_STATUS.ERROR,
        error: action.payload,
      };
    //////////////////////////////////////////
    case AUTH_ACTION_TYPES.CHANGE_PASSWORD.IN_PROGRESS:
      return {
        ...state,
        status: ACTION_STATUS.IN_PROGRESS,
        error: null,
      };
    case AUTH_ACTION_TYPES.CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        error: null,
        status: ACTION_STATUS.SUCCESS,
      };
    case AUTH_ACTION_TYPES.CHANGE_PASSWORD.ERROR:
      return {
        ...state,
        status: ACTION_STATUS.ERROR,
        error: action.payload,
      };
    case AUTH_ACTION_TYPES.LOGOUT:
      return {
        ...state,
        data: null,
        status: ACTION_STATUS.NOT_STARTED,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
