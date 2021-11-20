import { call, put, takeLatest, select } from 'redux-saga/effects';

// import * as api from 'api/tests';
import { notify } from 'utils/notifier';
import { TESTS_ACTION_TYPES } from '../actionTypes/tests.actionTypes';
import * as actions from '../actions/tests.actions';
import { getTestsFilter } from '../selectors/tests.selectors';

import { tests } from '../dummyData';

export function* fetchTests({ payload: { params } }) {
  try {
    yield put(actions.fetchTestsInProgress());
    const filter = yield select(getTestsFilter);
    const newFilter = {
      ...filter,
      ...params,
    };
    console.log(newFilter);
    // const response = yield call(api.login, data);
    const response = tests;
    yield put(
      actions.fetchTestsSuccess(
        { items: response, total: response.length },
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
