import { all, fork } from 'redux-saga/effects';

import * as loginSagas from 'pages/Auth/sagas';

const combinedSagas = {
  ...loginSagas,
};

export default function* rootSaga() {
  yield all(Object.values(combinedSagas).map((saga) => fork(saga)));
}
