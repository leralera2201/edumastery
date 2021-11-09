import { createSelector } from 'reselect';

const getAuthState = (state) => state.auth;

export const getAuth = createSelector(getAuthState, ({ data }) => data);

export const getAuthError = createSelector(getAuthState, ({ error }) => error);

export const getAuthStatus = createSelector(
  getAuthState,
  ({ status }) => status,
);
