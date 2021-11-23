import { call, put, takeLatest, select } from 'redux-saga/effects';

import * as api from 'api/tests';
import { notify } from 'utils/notifier';
import { TESTS_ACTION_TYPES } from '../actionTypes/tests.actionTypes';
import * as actions from '../actions/tests.actions';
import { getTestsFilter } from '../selectors/tests.selectors';

export function* fetchTests({ payload: { params } }) {
  try {
    yield put(actions.fetchTestsInProgress());
    const filter = yield select(getTestsFilter);
    const newFilter = {
      pageSize: params.pageSize || filter.pageSize,
      page: params.page || filter.page,
    };

    if (filter.difficulties?.length) {
      newFilter.difficulties = JSON.stringify(filter.difficulties);
    }

    if (filter.categoryId) {
      newFilter.categoryId = filter.categoryId;
    }

    if (filter.searchWord) {
      newFilter.searchWord = filter.searchWord;
    }

    const response = yield call(api.getTests, newFilter);
    yield put(
      actions.fetchTestsSuccess(
        {
          items: response.items,
          total: response.items.length,
        },
        params,
      ),
    );
  } catch (error) {
    yield call(notify, error?.text || '', 'danger');
    yield put(actions.fetchTestsError(error.text));
  }
}

export function* watchFetchTests() {
  yield takeLatest(TESTS_ACTION_TYPES.FETCH_TESTS.START, fetchTests);
}

export function* createTestResult({ payload: { data } }) {
  try {
    yield put(actions.createTestResultInProgress());
    yield call(api.createTestResult, data);
    yield put(actions.createTestResultSuccess());
  } catch (error) {
    yield call(notify, error?.text || '', 'danger');
    yield put(actions.createTestResultError(error.text));
  }
}

export function* watchCreateTestResult() {
  yield takeLatest(
    TESTS_ACTION_TYPES.CREATE_TEST_RESULT.START,
    createTestResult,
  );
}
