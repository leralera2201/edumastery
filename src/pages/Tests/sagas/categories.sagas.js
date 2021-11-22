import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from 'api/categories';
import { notify } from 'utils/notifier';
import { CATEGORIES_ACTION_TYPES } from '../actionTypes/categories.actionTypes';
import * as actions from '../actions/categories.actions';

export function* fetchCategories() {
  try {
    yield put(actions.fetchCategoriesInProgress());

    const response = yield call(api.getCategories);
    yield put(actions.fetchCategoriesSuccess(response));
  } catch (error) {
    yield call(notify, error?.text || '', 'danger');
    yield put(actions.fetchCategoriesError(error.text));
  }
}

export function* watchFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEFORIES.START,
    fetchCategories,
  );
}
