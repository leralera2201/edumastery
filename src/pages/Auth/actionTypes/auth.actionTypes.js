import { createActionTypes } from 'utils/actionTypeCreator';

export const AUTH_ACTION_TYPES = {
  LOGIN_USER: createActionTypes('LOGIN_USER'),
  REGISTER: createActionTypes('REGISTER'),
  SET_PASSWORD: createActionTypes('SET_PASSWORD'),
  FORGOT_PASSWORD: createActionTypes('FORGOT_PASSWORD'),
  UPDATE_ACCOUNT: createActionTypes('UPDATE_ACCOUNT'),
  FETCH_ACCOUNT: createActionTypes('FETCH_ACCOUNT'),
  LOGOUT: 'LOGOUT',
  RESET: 'RESET',
};
