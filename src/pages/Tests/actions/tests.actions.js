import { createAction } from 'redux-actions';
import { TESTS_ACTION_TYPES } from '../actionTypes/tests.actionTypes';

export const fetchTestsStart = createAction(
  TESTS_ACTION_TYPES.FETCH_TESTS.START,
  (params) => ({ params }),
);

export const fetchTestsInProgress = createAction(
  TESTS_ACTION_TYPES.FETCH_TESTS.IN_PROGRESS,
);

export const fetchTestsSuccess = createAction(
  TESTS_ACTION_TYPES.FETCH_TESTS.SUCCESS,
  (data, params) => ({ data, params }),
);

export const fetchTestsError = createAction(
  TESTS_ACTION_TYPES.FETCH_TESTS.ERROR,
  (error) => error,
);

export const applyFilter = createAction(
  TESTS_ACTION_TYPES.FILTER_TESTS,
  (data) => ({ data }),
);
