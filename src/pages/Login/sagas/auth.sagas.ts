import { call, put, takeLatest } from 'redux-saga/effects';

// import api
// import { setItem } from 'storage';
import { AUTH_ACTION_TYPES } from '../actionTypes/auth.actionTypes';
import * as actions from '../actions/auth.actions';

export function* loginUser({ payload: { data } }: any) {
  try {
    yield put(actions.loginUserInProgress());

    // const response = yield call(api.loginUser, data);
    const response = '';
    // setItem('X-AuthToken', token);
    yield put(actions.loginUserSuccess(response));
  } catch (error) {
    yield put(actions.loginUserError(error.text));
    // TODO: create notifier
    // yield call(notifier.notify, 'error', error.text);
  }
}

export function* watchLoginUser() {
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_USER.START, loginUser);
}
