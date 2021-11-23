import { createActionTypes } from 'utils/actionTypeCreator';

export const TESTS_ACTION_TYPES = {
  FETCH_TESTS: createActionTypes('FETCH_TESTS'),
  CREATE_TEST_RESULT: createActionTypes('CREATE_TEST_RESULT'),
  FILTER_TESTS: 'FILTER_TESTS',
};
