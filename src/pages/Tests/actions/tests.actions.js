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
////////////////////////////////////////////
export const applyFilter = createAction(
  TESTS_ACTION_TYPES.FILTER_TESTS,
  (data) => ({ data }),
);
////////////////////////////////////////////
export const createTestResultStart = createAction(
  TESTS_ACTION_TYPES.CREATE_TEST_RESULT.START,
  (data) => ({ data }),
);

export const createTestResultInProgress = createAction(
  TESTS_ACTION_TYPES.CREATE_TEST_RESULT.IN_PROGRESS,
);

export const createTestResultSuccess = createAction(
  TESTS_ACTION_TYPES.CREATE_TEST_RESULT.SUCCESS,
);

export const createTestResultError = createAction(
  TESTS_ACTION_TYPES.CREATE_TEST_RESULT.ERROR,
  (error) => error,
);
