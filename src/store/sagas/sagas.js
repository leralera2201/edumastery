import { all, fork } from 'redux-saga/effects';

// import sagas
import * as loginSagas from 'pages/Login/sagas';

const combinedSagas = {
  ...loginSagas,
};

export default function* rootSaga() {
  yield all(Object.values(combinedSagas).map((saga) => fork(saga)));
}
