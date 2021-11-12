import { createAction } from 'redux-actions';

import { AUTH_ACTION_TYPES } from '../actionTypes/auth.actionTypes';

export const loginUserStart = createAction(
  AUTH_ACTION_TYPES.LOGIN_USER.START,
  (data) => ({ data }),
);

export const loginUserInProgress = createAction(
  AUTH_ACTION_TYPES.LOGIN_USER.IN_PROGRESS,
);

export const loginUserSuccess = createAction(
  AUTH_ACTION_TYPES.LOGIN_USER.SUCCESS,
  (data) => ({ data }),
);

export const loginUserError = createAction(
  AUTH_ACTION_TYPES.LOGIN_USER.ERROR,
  (error) => error,
);

//////////////////////////////////////////
export const registerStart = createAction(
  AUTH_ACTION_TYPES.REGISTER.START,
  (data) => ({ data }),
);

export const registerInProgress = createAction(
  AUTH_ACTION_TYPES.REGISTER.IN_PROGRESS,
);

export const registerSuccess = createAction(
  AUTH_ACTION_TYPES.REGISTER.SUCCESS,
  (data) => ({ data }),
);

export const registerError = createAction(
  AUTH_ACTION_TYPES.REGISTER.ERROR,
  (error) => error,
);

export const registerReset = createAction(
  AUTH_ACTION_TYPES.REGISTER.RESET,
  (error) => error,
);

//////////////////////////////////////////
export const forgotPasswordStart = createAction(
  AUTH_ACTION_TYPES.FORGOT_PASSWORD.START,
  (email) => ({ email }),
);

export const forgotPasswordInProgress = createAction(
  AUTH_ACTION_TYPES.FORGOT_PASSWORD.IN_PROGRESS,
);

export const forgotPasswordSuccess = createAction(
  AUTH_ACTION_TYPES.FORGOT_PASSWORD.SUCCESS,
  (data) => ({ data }),
);

export const forgotPasswordError = createAction(
  AUTH_ACTION_TYPES.FORGOT_PASSWORD.ERROR,
  (error) => error,
);

//////////////////////////////////////////
export const setPasswordStart = createAction(
  AUTH_ACTION_TYPES.SET_PASSWORD.START,
  (password) => ({ password }),
);

export const setPasswordInProgress = createAction(
  AUTH_ACTION_TYPES.SET_PASSWORD.IN_PROGRESS,
);

export const setPasswordSuccess = createAction(
  AUTH_ACTION_TYPES.SET_PASSWORD.SUCCESS,
  (data) => ({ data }),
);

export const setPasswordError = createAction(
  AUTH_ACTION_TYPES.SET_PASSWORD.ERROR,
  (error) => error,
);
