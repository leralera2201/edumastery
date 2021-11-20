import { all, fork } from 'redux-saga/effects';

import * as loginSagas from 'pages/Auth/sagas';
import * as testsSagas from 'pages/Tests/sagas';

const combinedSagas = {
  ...loginSagas,
  ...testsSagas,
};

export default function* rootSaga() {
  yield all(Object.values(combinedSagas).map((saga) => fork(saga)));
}
