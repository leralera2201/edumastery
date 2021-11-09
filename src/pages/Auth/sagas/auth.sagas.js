import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from 'api/auth';
// import { setItem } from 'storage';
import { AUTH_ACTION_TYPES } from '../actionTypes/auth.actionTypes';
import * as actions from '../actions/auth.actions';

export function* loginUser({ payload: { data } }) {
  try {
    yield put(actions.loginUserInProgress());

    const response = yield call(api.login, data);
    console.log(response);
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

export function* register({ payload: { data } }) {
  try {
    yield put(actions.registerInProgress());
    const response = yield call(api.register, data);
    console.log(response);
    // setItem('X-AuthToken', token);
    yield put(actions.registerSuccess(response));
  } catch (error) {
    console.log(error)
    yield put(actions.registerError(error.text));
    // TODO: create notifier
    // yield call(notifier.notify, 'error', error.text);
  }
}

export function* watchRegister() {
  yield takeLatest(AUTH_ACTION_TYPES.REGISTER.START, register);
}

export function* forgotPassword({ payload: { data } }) {
  try {
    yield put(actions.forgotPasswordInProgress());
    const response = {};
    // const response = yield call(api.login, data);
    // setItem('X-AuthToken', token);
    yield put(actions.forgotPasswordSuccess(response));
  } catch (error) {
    yield put(actions.forgotPasswordError(error.text));
    // TODO: create notifier
    // yield call(notifier.notify, 'error', error.text);
  }
}

export function* watchForgotPassword() {
  yield takeLatest(AUTH_ACTION_TYPES.FORGOT_PASSWORD.START, forgotPassword);
}

export function* setPassword({ payload: { data } }) {
  try {
    yield put(actions.setPasswordInProgress());
    const response = {};
    // const response = yield call(api.login, data);
    // setItem('X-AuthToken', token);
    yield put(actions.setPasswordSuccess(response));
  } catch (error) {
    yield put(actions.setPasswordError(error.text));
    // TODO: create notifier
    // yield call(notifier.notify, 'error', error.text);
  }
}

export function* watchSetPassword() {
  yield takeLatest(AUTH_ACTION_TYPES.SET_PASSWORD.START, setPassword);
}
