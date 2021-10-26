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
);

export const loginUserError = createAction(
  AUTH_ACTION_TYPES.LOGIN_USER.ERROR,
  (error) => error,
);
