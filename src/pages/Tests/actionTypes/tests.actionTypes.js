import { createActionTypes } from 'utils/actionTypeCreator';

export const TESTS_ACTION_TYPES = {
  FETCH_TESTS: createActionTypes('FETCH_TESTS'),
  FILTER_TESTS: 'FILTER_TESTS',
};
